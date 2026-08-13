export type DemoId =
  | "blocking"
  | "banding"
  | "mosquito"
  | "smear"
  | "halo"
  | "generations";

export type ArtifactDemo = {
  id: DemoId;
  name: string;
  look: string;
  body: string;
  cleanLabel: string;
  dirtyLabel: string;
  clean: Blob;
  dirty: Blob;
};

function makeCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not draw example");
  return { canvas, ctx };
}

function toBlob(
  canvas: HTMLCanvasElement,
  type: "image/png" | "image/jpeg",
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("encode failed"))),
      type,
      quality,
    );
  });
}

function drawBlocking(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const fill = ctx.createLinearGradient(0, 0, w, h);
  fill.addColorStop(0, "rgb(118, 136, 128)");
  fill.addColorStop(1, "rgb(142, 154, 146)");
  ctx.fillStyle = fill;
  ctx.fillRect(0, 0, w, h);
}

function drawBanding(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const fill = ctx.createLinearGradient(0, 0, 0, h);
  fill.addColorStop(0, "rgb(28, 62, 128)");
  fill.addColorStop(0.45, "rgb(92, 126, 168)");
  fill.addColorStop(0.72, "rgb(196, 154, 118)");
  fill.addColorStop(1, "rgb(228, 176, 132)");
  ctx.fillStyle = fill;
  ctx.fillRect(0, 0, w, h);
}

function drawMosquito(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "rgb(214, 226, 236)";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgb(12, 16, 20)";
  ctx.lineWidth = 1;
  const cx = w * 0.5;
  const cy = h * 0.52;
  for (let i = 0; i < 28; i += 1) {
    const a = (i / 28) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * w * 0.48, cy + Math.sin(a) * h * 0.48);
    ctx.stroke();
  }
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, Math.min(w, h) * 0.18, 0, Math.PI * 2);
  ctx.stroke();
}

function drawSmear(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "rgb(18, 46, 168)";
  ctx.fillRect(0, 0, w, h);
  const colors = [
    "rgb(232, 28, 48)",
    "rgb(252, 214, 12)",
    "rgb(24, 214, 196)",
    "rgb(236, 48, 168)",
  ];
  const stripe = 7;
  let x = w * 0.18;
  for (const color of colors) {
    ctx.fillStyle = color;
    ctx.fillRect(x, h * 0.12, stripe, h * 0.76);
    x += stripe + 18;
  }
  ctx.fillStyle = "rgb(248, 36, 64)";
  ctx.beginPath();
  ctx.arc(w * 0.78, h * 0.5, h * 0.22, 0, Math.PI * 2);
  ctx.fill();
}

function drawHalo(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "rgb(244, 244, 240)";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgb(8, 8, 10)";
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.5, Math.min(w, h) * 0.28, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(w * 0.12, h * 0.42, w * 0.2, h * 0.16);
}

function drawBusy(ctx: CanvasRenderingContext2D, w: number, h: number) {
  drawBanding(ctx, w, h);
  drawMosquito(ctx, w, h);
  ctx.globalAlpha = 0.55;
  drawSmear(ctx, w, h);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "rgb(250, 250, 246)";
  ctx.font = `600 ${Math.round(h * 0.22)}px "IBM Plex Sans", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("JPEG", w * 0.5, h * 0.5);
}

async function pair(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  quality: number,
  size = 360,
): Promise<{ clean: Blob; dirty: Blob }> {
  const { canvas, ctx } = makeCanvas(size, Math.round(size * 0.68));
  draw(ctx, canvas.width, canvas.height);
  const clean = await toBlob(canvas, "image/png");
  const dirty = await toBlob(canvas, "image/jpeg", quality);
  return { clean, dirty };
}

async function generationPair(): Promise<{ clean: Blob; dirty: Blob }> {
  const { canvas, ctx } = makeCanvas(360, 240);
  drawBusy(ctx, canvas.width, canvas.height);
  const clean = await toBlob(canvas, "image/png");
  let blob = await toBlob(canvas, "image/jpeg", 0.35);
  for (let i = 0; i < 10; i += 1) {
    const url = URL.createObjectURL(blob);
    await new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve();
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("reload failed"));
      };
      img.src = url;
    });
    blob = await toBlob(canvas, "image/jpeg", 0.35);
  }
  return { clean, dirty: blob };
}

export async function buildArtifactDemos(): Promise<ArtifactDemo[]> {
  const blocking = await pair(drawBlocking, 0.08);
  const banding = await pair(drawBanding, 0.12);
  const mosquito = await pair(drawMosquito, 0.18);
  const smear = await pair(drawSmear, 0.12);
  const halo = await pair(drawHalo, 0.16);
  const generations = await generationPair();

  return [
    {
      id: "blocking",
      name: "Blocking",
      look: "A faint checkerboard",
      body: "JPEG cuts the photo into tiny squares — 8 pixels on a side — and squeezes each square on its own. When it squeezes too hard, the squares show up as a grid. Skies, walls, and skin show it first.",
      cleanLabel: "Smooth wash",
      dirtyLabel: "Quality 8 JPEG",
      ...blocking,
    },
    {
      id: "banding",
      name: "Banding",
      look: "Stripes in a smooth fade",
      body: "A sunset or a plain wall should change color gradually. JPEG has fewer shades left, so the fade turns into steps — like a cheap gradient.",
      cleanLabel: "True fade",
      dirtyLabel: "Quality 12 JPEG",
      ...banding,
    },
    {
      id: "mosquito",
      name: "Mosquito noise",
      look: "Sparkles around edges",
      body: "High-contrast lines — a branch against the sky, type on a sign — grow a haze of specks. People nicknamed it mosquitoes. It buzzes around the edge instead of staying sharp.",
      cleanLabel: "Clean lines",
      dirtyLabel: "Quality 18 JPEG",
      ...mosquito,
    },
    {
      id: "smear",
      name: "Color smear",
      look: "Reds and blues that leak",
      body: "JPEG keeps brightness in more detail than color. Fine color — a red jacket, a neon stripe — can bleed into the pixels next door.",
      cleanLabel: "Hard color edges",
      dirtyLabel: "Quality 12 JPEG",
      ...smear,
    },
    {
      id: "halo",
      name: "Halos",
      look: "A glow around dark / light edges",
      body: "Also called ringing. A dark shape on a bright field can pick up a pale outline that was never in the picture.",
      cleanLabel: "Sharp silhouette",
      dirtyLabel: "Quality 16 JPEG",
      ...halo,
    },
    {
      id: "generations",
      name: "Generation loss",
      look: "Worse each time you save",
      body: "Each JPEG save can add more artifacts. This pair is the same drawing: once as a clean PNG, then after eleven low-quality JPEG saves. The damage accumulates and cannot be reversed.",
      cleanLabel: "Original",
      dirtyLabel: "Saved 11 times",
      ...generations,
    },
  ];
}
