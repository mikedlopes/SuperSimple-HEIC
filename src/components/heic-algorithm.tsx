import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { LearnStrip } from "@/components/learn-strip";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { adaptiveBlocks, gridBlocks } from "@/lib/block-partition";
import { cn } from "@/lib/utils";

const SAMPLE_PATH = "/samples/autumn.heic";

type Mode = "jpeg" | "heic";

const STEPS = [
  {
    n: "1",
    title: "Partition into tiles",
    body: "JPEG uses a fixed 8×8 grid. HEIC uses larger tiles in uniform areas and smaller tiles where the image changes.",
  },
  {
    n: "2",
    title: "Predict from neighboring pixels",
    body: "The encoder estimates each tile from adjacent pixels. HEVC does this more accurately than JPEG — the same approach used in video.",
  },
  {
    n: "3",
    title: "Encode the residual",
    body: "The prediction is subtracted from the actual tile. A uniform sky leaves little residual. Fine detail leaves more.",
  },
  {
    n: "4",
    title: "Discard imperceptible detail",
    body: "The residual is transformed and small coefficients are rounded away. That is the lossy step. HEIC allocates bits according to visual importance.",
  },
  {
    n: "5",
    title: "Entropy coding",
    body: "The remaining values are packed with a denser method than classic JPEG (CABAC): the same idea as general compression, tuned for images.",
  },
];

const NAMES = [
  { name: "HEVC", body: "The codec. A still HEIC is typically one intra-coded video frame." },
  { name: "HEIF", body: "The container. One image, or a burst, clip, and auxiliary data." },
  { name: "HEIC", body: "Apple’s name when the image inside is HEVC." },
  { name: "AVIF", body: "A related container using AV1 instead of HEVC." },
];

export function HeicAlgorithm() {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 pb-16 pt-6 sm:px-8 sm:pt-10">
      <header className="stagger-in max-w-xl">
        <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          Compression method
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-balance text-fg sm:text-5xl">
          How HEIC compresses a photo
        </h1>
        <p className="mt-4 text-base text-pretty text-muted">
          A more efficient way to discard image data that is unlikely to be
          noticed — video compression applied to a still image.
        </p>
      </header>

      <div className="stagger-in mt-8" style={{ animationDelay: "20ms" }}>
        <LearnStrip />
      </div>

      <BlockExplorer />

      <section className="stagger-in mt-12" style={{ animationDelay: "80ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          Five steps
        </h2>
        <ol className="mt-6 divide-y divide-border border-y border-border">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="grid gap-2 py-4 sm:grid-cols-[3rem_1fr] sm:gap-6"
            >
              <p className="font-display text-2xl text-subtle">{step.n}</p>
              <div>
                <h3 className="font-medium text-fg">{step.title}</h3>
                <p className="mt-1 text-sm text-pretty text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="stagger-in mt-12" style={{ animationDelay: "100ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">Names</h2>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {NAMES.map((item) => (
            <li
              key={item.name}
              className="grid gap-1 py-3 sm:grid-cols-[5rem_1fr] sm:gap-6"
            >
              <p className="font-medium text-fg">{item.name}</p>
              <p className="text-sm text-pretty text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <p className="stagger-in mt-10 text-sm text-pretty text-muted">
        The overlay is an illustration, not the production encoder. Tovra
        decodes, then writes JPEG — which is why an export is often{" "}
        <Link
          to="/compression"
          className="text-fg underline decoration-border underline-offset-4"
        >
          larger than the HEIC
        </Link>
        .
      </p>
      <div className="mt-6">
        <Button asChild>
          <Link to="/">Convert a HEIC</Link>
        </Button>
      </div>
    </article>
  );
}

function BlockExplorer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sourceRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<Mode>("heic");
  const [fuss, setFuss] = useState(40);
  const [ready, setReady] = useState(false);
  const [counts, setCounts] = useState({ jpeg: 0, heic: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(SAMPLE_PATH);
        if (!res.ok) throw new Error("sample missing");
        const blob = await res.blob();
        const { decodeHeicBitmap } = await import("@/lib/heic-decode");
        const bitmap = await decodeHeicBitmap(blob);
        if (cancelled) {
          bitmap.close();
          return;
        }
        const maxW = 720;
        const scale = Math.min(1, maxW / bitmap.width);
        const w = Math.round(bitmap.width * scale);
        const h = Math.round(bitmap.height * scale);
        const src = document.createElement("canvas");
        src.width = w;
        src.height = h;
        const ctx = src.getContext("2d");
        if (!ctx) throw new Error("no canvas");
        ctx.drawImage(bitmap, 0, 0, w, h);
        bitmap.close();
        sourceRef.current = src;
        setReady(true);
      } catch {
        if (!cancelled) setError("Could not load the sample photo.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const src = sourceRef.current;
    const canvas = canvasRef.current;
    if (!src || !canvas || !ready) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = src.width;
    canvas.height = src.height;
    ctx.drawImage(src, 0, 0);
    const pixels = ctx.getImageData(0, 0, src.width, src.height);
    const blocks =
      mode === "jpeg"
        ? gridBlocks(src.width, src.height, 32)
        : adaptiveBlocks(
            pixels.data,
            src.width,
            src.height,
            8,
            20 + (100 - fuss) * 4,
          );
    ctx.strokeStyle = "rgba(250, 248, 243, 0.45)";
    ctx.lineWidth = 1;
    for (const b of blocks) {
      ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);
    }
    setCounts((prev) =>
      mode === "jpeg"
        ? { ...prev, jpeg: blocks.length }
        : { ...prev, heic: blocks.length },
    );
  }, [mode, fuss, ready]);

  return (
    <section className="stagger-in mt-10" style={{ animationDelay: "50ms" }}>
      <h2 className="font-display text-2xl tracking-tight text-fg">
        Same photo, two partition styles
      </h2>
      <p className="mt-2 max-w-xl text-sm text-pretty text-muted">
        JPEG uses a uniform grid. HEIC uses smaller tiles where the image
        changes. This is an illustration, not the production encoder.
      </p>
      <div className="mt-5 overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
        <div className="relative aspect-[4/3] bg-surface-2">
          <canvas
            ref={canvasRef}
            className="size-full object-cover"
            aria-label="Photo with compression tiles drawn on top"
          />
          {!ready && !error ? (
            <div className="absolute inset-0 grid place-items-center">
              <LoaderCircle className="size-5 animate-spin text-fg" />
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-4 p-4 sm:p-5">
          <div
            className="flex rounded-md bg-surface-2 p-1"
            role="radiogroup"
            aria-label="Tile style"
          >
            {(
              [
                ["jpeg", "JPEG · even grid"],
                ["heic", "HEIC · adaptive"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={mode === id}
                onClick={() => setMode(id)}
                className={cn(
                  "h-10 flex-1 rounded-sm px-3 text-sm font-medium transition-[background-color,color] duration-150 ease-out",
                  mode === id
                    ? "bg-accent text-accent-fg"
                    : "text-muted hover:text-fg",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div
            className={cn(
              "flex items-center gap-4",
              mode === "jpeg" && "opacity-40",
            )}
          >
            <label
              htmlFor="fuss"
              className="shrink-0 text-xs font-medium tracking-wide text-subtle uppercase"
            >
              Detail
            </label>
            <Slider
              id="fuss"
              min={0}
              max={100}
              step={1}
              disabled={mode === "jpeg"}
              value={[fuss]}
              onValueChange={(v) => setFuss(v[0] ?? 40)}
              aria-label="How eagerly HEIC splits tiles"
            />
          </div>
          <p className="text-xs text-pretty text-subtle">
            {mode === "jpeg"
              ? counts.jpeg
                ? `${counts.jpeg.toLocaleString()} even squares (drawn large for visibility — JPEG uses 8×8).`
                : "Fixed grid."
              : counts.heic
                ? `${counts.heic.toLocaleString()} tiles. Increase Detail to add partitions in textured areas.`
                : "Adaptive tiles."}
          </p>
        </div>
      </div>
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
    </section>
  );
}
