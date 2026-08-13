import { heicTo } from "heic-to";

type Job = { id: number; buffer: ArrayBuffer };

self.onmessage = async (event: MessageEvent<Job>) => {
  const { id, buffer } = event.data;
  try {
    const blob = new Blob([buffer], { type: "image/heic" });
    const bitmap = await heicTo({ blob, type: "bitmap" });
    self.postMessage({ id, bitmap }, { transfer: [bitmap] });
  } catch (err) {
    const message = err instanceof Error ? err.message : "decode failed";
    self.postMessage({ id, error: message });
  }
};
