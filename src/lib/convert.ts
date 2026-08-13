import { bitmapToBlob, decodeHeicBitmap } from "./heic-decode";

export type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

export const FORMAT_META: Record<
  OutputFormat,
  { label: string; ext: string; quality: boolean }
> = {
  "image/jpeg": { label: "JPEG", ext: "jpg", quality: true },
  "image/png": { label: "PNG", ext: "png", quality: false },
  "image/webp": { label: "WebP", ext: "webp", quality: true },
};

export const ACCEPTED_LABEL = "HEIC and HEIF";
export const MAX_FILE_BYTES = 80 * 1024 * 1024;

const HEIC_EXT = /\.(heic|heif)$/i;
const HEIC_BRANDS = new Set([
  "heic",
  "heix",
  "hevc",
  "hevx",
  "mif1",
  "msf1",
]);

export type HeicKind = "still" | "sequence" | "hdr";

export type FileCheck =
  | { ok: true; kind: HeicKind; note?: string }
  | { ok: false; reason: string };

function inspectHeicHeader(bytes: Uint8Array): {
  kind: HeicKind;
  brands: string[];
} {
  const brands: string[] = [];
  if (bytes.length >= 12 && ascii(bytes, 4, 4) === "ftyp") {
    for (let offset = 8; offset + 4 <= Math.min(bytes.length, 64); offset += 4) {
      const brand = brandAt(bytes, offset);
      if (brand) brands.push(brand);
    }
  }
  const blob = ascii(bytes, 0, Math.min(bytes.length, 256)).toLowerCase();
  const sequence = brands.includes("msf1") || blob.includes("msf1");
  const hdr =
    brands.some((b) => ["heix", "hevx", "hdrv"].includes(b)) ||
    blob.includes("hdrv") ||
    blob.includes("tmap");
  const kind: HeicKind = sequence ? "sequence" : hdr ? "hdr" : "still";
  return { kind, brands };
}

export function isHeicName(name: string) {
  return HEIC_EXT.test(name);
}

export function outputName(originalName: string, format: OutputFormat): string {
  const base = originalName.replace(HEIC_EXT, "").trim() || "image";
  return `${base}.${FORMAT_META[format].ext}`;
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(n < 10 * 1024 ? 1 : 0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function ascii(bytes: Uint8Array, start: number, length: number) {
  let out = "";
  for (let i = 0; i < length && start + i < bytes.length; i += 1) {
    out += String.fromCharCode(bytes[start + i] ?? 0);
  }
  return out;
}

function brandAt(bytes: Uint8Array, offset: number) {
  return ascii(bytes, offset, 4).replace(/\0/g, " ").trim().toLowerCase();
}

function sniffContainer(bytes: Uint8Array): string | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "JPEG";
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    ascii(bytes, 1, 3) === "PNG"
  ) {
    return "PNG";
  }
  if (bytes.length >= 6 && ascii(bytes, 0, 3) === "GIF") return "GIF";
  if (bytes.length >= 2 && bytes[0] === 0x42 && bytes[1] === 0x4d) return "BMP";
  if (
    bytes.length >= 12 &&
    ascii(bytes, 0, 4) === "RIFF" &&
    ascii(bytes, 8, 4) === "WEBP"
  ) {
    return "WebP";
  }
  if (bytes.length >= 12 && ascii(bytes, 4, 4) === "ftyp") {
    const brands: string[] = [];
    for (let offset = 8; offset + 4 <= Math.min(bytes.length, 32); offset += 4) {
      const brand = brandAt(bytes, offset);
      if (brand) brands.push(brand);
    }
    if (brands.some((b) => HEIC_BRANDS.has(b))) return "heic";
    if (brands.includes("qt")) return "QuickTime / MOV";
    if (brands.some((b) => ["isom", "mp41", "mp42", "avc1", "iso2"].includes(b))) {
      return "MP4";
    }
    return "another media file";
  }
  return null;
}

export async function validateHeicFile(file: File): Promise<FileCheck> {
  if (!file || file.size === 0) {
    return { ok: false, reason: "File is empty" };
  }
  if (file.size > MAX_FILE_BYTES) {
    return {
      ok: false,
      reason: `Larger than ${formatBytes(MAX_FILE_BYTES)}`,
    };
  }

  const header = new Uint8Array(await file.slice(0, 256).arrayBuffer());
  if (header.length < 12) {
    return { ok: false, reason: "File is too small to be HEIC" };
  }

  const kind = sniffContainer(header);
  if (kind === "heic") {
    const { kind: profile } = inspectHeicHeader(header);
    if (profile === "sequence") {
      return {
        ok: true,
        kind: "sequence",
        note: "Live Photo or burst. The still image will be converted; the motion clip is omitted.",
      };
    }
    if (profile === "hdr") {
      return {
        ok: true,
        kind: "hdr",
        note: "This file appears to be HDR. The export is a standard photo; extended brightness may be reduced.",
      };
    }
    return { ok: true, kind: "still" };
  }
  if (kind) {
    if (isHeicName(file.name) || /heic|heif/i.test(file.type)) {
      return {
        ok: false,
        reason: `Named HEIC, but the contents are ${kind}.`,
      };
    }
    return {
      ok: false,
      reason: `${kind} is not supported. Use ${ACCEPTED_LABEL}.`,
    };
  }

  if (isHeicName(file.name) || /heic|heif/i.test(file.type)) {
    return { ok: false, reason: "This file is named HEIC but the contents are not." };
  }

  return { ok: false, reason: `Not a HEIC or HEIF file` };
}

export function explainConvertError(err: unknown, kind?: HeicKind): string {
  const raw = err instanceof Error ? err.message : "Could not convert this file";
  const lower = raw.toLowerCase();
  if (kind === "sequence" || /sequence|live photo|multi.?image/i.test(lower)) {
    return "This file appears to be a Live Photo or burst. Only the still frame can be exported. Use a single still, or export JPEG from Photos first.";
  }
  if (kind === "hdr" || /hdr|gain.?map|bit.?depth/i.test(lower)) {
    return "This file may be an HDR HEIC. The extended brightness layer often cannot be decoded in the browser. Export JPEG from Photos, or try another file.";
  }
  if (/memory|allocation|out of memory/i.test(lower)) {
    return "This photo is too large for this browser tab. Convert one file at a time, or use a smaller original.";
  }
  return "Could not decode this HEIC. It may be a Live Photo, an HDR image, or an unsupported camera file.";
}

export async function convertHeic(
  file: File,
  format: OutputFormat,
  quality: number,
  options?: { keepMetadata?: boolean },
): Promise<{ blob: Blob; width: number; height: number; kept?: string[] }> {
  const q = Math.min(1, Math.max(0.1, quality));
  const bitmap = await decodeHeicBitmap(file);
  const width = bitmap.width;
  const height = bitmap.height;

  try {
    let blob = await bitmapToBlob(bitmap, format, q);
    let kept: string[] | undefined;
    if (options?.keepMetadata && format === "image/jpeg") {
      const { keepJpegMetadata } = await import("./exif-keep");
      const copied = await keepJpegMetadata(file, blob);
      blob = copied.blob;
      kept = copied.kept;
    }
    return { blob, width, height, kept };
  } finally {
    bitmap.close();
  }
}

export type SizeCompare = {
  width: number;
  height: number;
  heicBytes: number;
  jpeg: Blob;
  webp: Blob;
  png: Blob;
  jpegSteps: { quality: number; blob: Blob }[];
  webpAt85: number;
};

export const COMPARE_JPEG_STEPS = [0.6, 0.75, 0.85, 0.95] as const;

export async function measureAgainstHeic(
  file: File,
  quality: number,
): Promise<SizeCompare> {
  const q = Math.min(1, Math.max(0.1, quality));
  const bitmap = await decodeHeicBitmap(file);
  const width = bitmap.width;
  const height = bitmap.height;

  try {
    const jpeg = await bitmapToBlob(bitmap, "image/jpeg", q);
    const webp = await bitmapToBlob(bitmap, "image/webp", q);
    const png = await bitmapToBlob(bitmap, "image/png", 1);
    const webp85 = await bitmapToBlob(bitmap, "image/webp", 0.85);
    const jpegSteps: { quality: number; blob: Blob }[] = [];
    for (const step of COMPARE_JPEG_STEPS) {
      jpegSteps.push({
        quality: step,
        blob: await bitmapToBlob(bitmap, "image/jpeg", step),
      });
    }

    return {
      width,
      height,
      heicBytes: file.size,
      jpeg,
      webp,
      png,
      webpAt85: webp85.size,
      jpegSteps,
    };
  } finally {
    bitmap.close();
  }
}

export async function encodeJpegQualities(
  file: File,
  qualities: number[],
): Promise<{ width: number; height: number; frames: { quality: number; blob: Blob }[] }> {
  const bitmap = await decodeHeicBitmap(file);
  const width = bitmap.width;
  const height = bitmap.height;
  const frames: { quality: number; blob: Blob }[] = [];

  try {
    for (const quality of qualities) {
      const q = Math.min(1, Math.max(0.1, quality));
      frames.push({
        quality: q,
        blob: await bitmapToBlob(bitmap, "image/jpeg", q),
      });
    }
    return { width, height, frames };
  } finally {
    bitmap.close();
  }
}

export async function zipConverted(
  files: { name: string; blob: Blob }[],
): Promise<Blob> {
  const { default: JSZip } = await import("jszip");
  const zip = new JSZip();
  const used = new Map<string, number>();
  for (const file of files) {
    const count = used.get(file.name) ?? 0;
    used.set(file.name, count + 1);
    const name =
      count === 0
        ? file.name
        : file.name.replace(/(\.[^.]+)$/, `-${count}$1`);
    zip.file(name, file.blob);
  }
  return zip.generateAsync({ type: "blob" });
}
