type Pending = {
  resolve: (bitmap: ImageBitmap) => void;
  reject: (err: Error) => void;
};

let worker: Worker | null | undefined;
let nextId = 1;
const pending = new Map<number, Pending>();

/** iOS (any browser — all WebKit) or desktop Safari. Not Chrome/Firefox/Edge on Mac. */
function safariFamily(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const ios =
    /iP(hone|ad|od)/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (ios) return true;
  return /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR|Firefox|Android/.test(ua);
}

/**
 * Safari 17+ can decode HEIC in the platform image pipeline.
 *
 * 1. createImageBitmap(blob) — no DOM, honors EXIF orientation.
 * 2. If that throws (older WebKit, odd MIME): load via <img>, then bitmap from the element.
 * 3. Caller falls through to libheif WASM if both return null.
 */
async function decodeSafariNative(blob: Blob): Promise<ImageBitmap | null> {
  const fromBitmap = await tryCreateImageBitmap(blob);
  if (fromBitmap) return fromBitmap;
  return tryHtmlImage(blob);
}

async function tryCreateImageBitmap(source: ImageBitmapSource): Promise<ImageBitmap | null> {
  if (typeof createImageBitmap !== "function") return null;
  try {
    const bitmap = await createImageBitmap(source, { imageOrientation: "from-image" });
    if (bitmap.width > 0 && bitmap.height > 0) return bitmap;
    bitmap.close();
  } catch {
    /* not a supported still for this API */
  }
  return null;
}

async function tryHtmlImage(blob: Blob): Promise<ImageBitmap | null> {
  if (typeof Image === "undefined" || typeof URL === "undefined") return null;
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.decoding = "async";
  try {
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("img"));
      img.src = url;
    });
    if (img.naturalWidth < 1) return null;
    return await tryCreateImageBitmap(img);
  } catch {
    return null;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function getWorker(): Worker | null {
  if (worker !== undefined) return worker;
  if (typeof window === "undefined" || typeof Worker === "undefined") {
    worker = null;
    return null;
  }
  try {
    worker = new Worker(new URL("./heic-worker.ts", import.meta.url), {
      type: "module",
    });
    worker.onmessage = (
      event: MessageEvent<{ id: number; bitmap?: ImageBitmap; error?: string }>,
    ) => {
      const job = pending.get(event.data.id);
      if (!job) return;
      pending.delete(event.data.id);
      if (event.data.bitmap) job.resolve(event.data.bitmap);
      else job.reject(new Error(event.data.error ?? "decode failed"));
    };
    worker.onerror = () => {
      worker = null;
    };
    return worker;
  } catch {
    worker = null;
    return null;
  }
}

function decodeInWorker(blob: Blob): Promise<ImageBitmap> {
  const w = getWorker();
  if (!w) return Promise.reject(new Error("no worker"));
  return blob.arrayBuffer().then((buffer) => {
    const id = nextId++;
    return new Promise<ImageBitmap>((resolve, reject) => {
      pending.set(id, { resolve, reject });
      w.postMessage({ id, buffer }, [buffer]);
    });
  });
}

async function decodeWasmMain(blob: Blob): Promise<ImageBitmap> {
  const { heicTo } = await import("heic-to");
  return heicTo({ blob, type: "bitmap" });
}

export async function decodeHeicBitmap(blob: Blob): Promise<ImageBitmap> {
  if (safariFamily()) {
    const native = await decodeSafariNative(blob);
    if (native) return native;
  }
  try {
    return await decodeInWorker(blob);
  } catch {
    return decodeWasmMain(blob);
  }
}

export async function bitmapToBlob(
  bitmap: ImageBitmap,
  type: string,
  quality: number,
): Promise<Blob> {
  if (typeof OffscreenCanvas !== "undefined") {
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not draw this photo");
    ctx.drawImage(bitmap, 0, 0);
    return canvas.convertToBlob({
      type,
      quality: type === "image/png" ? undefined : quality,
    });
  }
  if (typeof document === "undefined") {
    throw new Error("Could not encode this photo");
  }
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not draw this photo");
  ctx.drawImage(bitmap, 0, 0);
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (out) => (out ? resolve(out) : reject(new Error("encode failed"))),
      type,
      type === "image/png" ? undefined : quality,
    );
  });
}
