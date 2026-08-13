import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { LearnStrip } from "@/components/learn-strip";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  formatBytes,
  measureAgainstHeic,
  validateHeicFile,
} from "@/lib/convert";

const SAMPLE_PATH = "/samples/autumn.heic";

type JpegStep = {
  quality: number;
  bytes: number;
  url: string;
};

type Compare = {
  name: string;
  heicBytes: number;
  jpegBytes: number;
  webpBytes: number;
  pngBytes: number;
  width: number;
  height: number;
  previewUrl: string;
  jpegSteps: JpegStep[];
  webpAt85: number;
};

const QUALITY_NOTES: Record<number, { title: string; body: string }> = {
  60: {
    title: "Small, lower quality",
    body: "Suitable for a small preview. Skies can posterize and edges can show a grid.",
  },
  75: {
    title: "Typical sharing quality",
    body: "Acceptable on a phone. Foliage and skin soften when viewed closely.",
  },
  85: {
    title: "Standard export",
    body: "A common “good JPEG.” Still larger than the original HEIC.",
  },
  95: {
    title: "Diminishing returns",
    body: "Little visible difference from 85. File size increases substantially.",
  },
};

export function CompressionExplore() {
  const [quality, setQuality] = useState(0.85);
  const [compare, setCompare] = useState<Compare | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<File | null>(null);
  const previewRef = useRef<string | null>(null);
  const stepUrlsRef = useRef<string[]>([]);
  const qualityRef = useRef(quality);
  const runId = useRef(0);
  const skipQualityEffect = useRef(true);
  qualityRef.current = quality;

  function revokePreviews() {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = null;
    for (const url of stepUrlsRef.current) URL.revokeObjectURL(url);
    stepUrlsRef.current = [];
  }

  const run = useCallback(async (file: File, q: number) => {
    const id = ++runId.current;
    setBusy(true);
    setError(null);
    try {
      const result = await measureAgainstHeic(file, q);
      if (id !== runId.current) return;
      revokePreviews();
      const previewUrl = URL.createObjectURL(result.jpeg);
      previewRef.current = previewUrl;
      const jpegSteps = result.jpegSteps.map((step) => {
        const url = URL.createObjectURL(step.blob);
        stepUrlsRef.current.push(url);
        return { quality: step.quality, bytes: step.blob.size, url };
      });
      setCompare({
        name: file.name,
        heicBytes: result.heicBytes,
        jpegBytes: result.jpeg.size,
        webpBytes: result.webp.size,
        pngBytes: result.png.size,
        width: result.width,
        height: result.height,
        previewUrl,
        jpegSteps,
        webpAt85: result.webpAt85,
      });
    } catch {
      if (id !== runId.current) return;
      setError("Could not read this HEIC file.");
    } finally {
      if (id === runId.current) setBusy(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(SAMPLE_PATH);
        if (!res.ok) throw new Error("missing sample");
        const blob = await res.blob();
        const file = new File([blob], "autumn.heic", { type: "image/heic" });
        if (cancelled) return;
        fileRef.current = file;
        await run(file, qualityRef.current);
      } catch {
        if (!cancelled) {
          setBusy(false);
          setError("Could not load the sample photo.");
        }
      }
    })();
    return () => {
      cancelled = true;
      revokePreviews();
    };
  }, [run]);

  useEffect(() => {
    if (skipQualityEffect.current) {
      skipQualityEffect.current = false;
      return;
    }
    if (!fileRef.current) return;
    const handle = window.setTimeout(() => {
      if (fileRef.current) void run(fileRef.current, quality);
    }, 280);
    return () => window.clearTimeout(handle);
  }, [quality, run]);

  async function onPick(list: FileList | null) {
    if (!list?.[0]) return;
    const file = list[0];
    const check = await validateHeicFile(file);
    if (!check.ok) {
      toast(check.reason);
      return;
    }
    fileRef.current = file;
    await run(file, quality);
  }

  const max = compare
    ? Math.max(
        compare.heicBytes,
        compare.jpegBytes,
        compare.webpBytes,
        compare.pngBytes,
      )
    : 1;
  const jpegRatio = compare ? compare.jpegBytes / compare.heicBytes : 1;
  const savedPct =
    compare && compare.jpegBytes > compare.heicBytes
      ? Math.round((1 - compare.heicBytes / compare.jpegBytes) * 100)
      : 0;

  return (
    <article className="mx-auto w-full max-w-3xl px-5 pb-24 pt-6 sm:px-8 sm:pt-10">
      <header className="stagger-in max-w-xl">
        <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          Compression
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-balance text-fg sm:text-5xl">
          HEIC file size
        </h1>
        <p className="mt-4 text-base text-pretty text-muted">
          HEIC typically stores an image in fewer bytes than JPEG at similar
          appearance. Use the sample, or drop your own HEIC, and compare it
          with JPEG, WebP, and PNG.
        </p>
      </header>

      <div className="stagger-in mt-8" style={{ animationDelay: "20ms" }}>
        <LearnStrip />
      </div>

      <section
        className="stagger-in mt-10 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-6"
        style={{ animationDelay: "70ms" }}
      >
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-2 sm:w-56 sm:shrink-0">
            {compare?.previewUrl ? (
              <img
                src={compare.previewUrl}
                alt={compare.name}
                className="size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
              />
            ) : (
              <div className="size-full skeleton-shimmer" />
            )}
            {busy ? (
              <div className="absolute inset-0 grid place-items-center bg-bg/30">
                <LoaderCircle className="size-5 animate-spin text-fg" />
              </div>
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm text-muted">
              {compare
                ? `${compare.name} · ${compare.width}×${compare.height}`
                : "Loading a sample photo…"}
            </p>
            {compare && savedPct > 0 ? (
              <p className="mt-2 font-display text-2xl tracking-tight text-fg">
                This HEIC is {savedPct}% smaller than a JPEG at quality{" "}
                {Math.round(quality * 100)}.
              </p>
            ) : compare ? (
              <p className="mt-2 font-display text-2xl tracking-tight text-fg">
                At this low quality, JPEG can be smaller — it will also look
                worse.
              </p>
            ) : (
              <p className="mt-2 font-display text-2xl tracking-tight text-fg">
                Measuring file sizes…
              </p>
            )}
            {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => inputRef.current?.click()}
              >
                Try your HEIC
              </Button>
              <input
                ref={inputRef}
                type="file"
                accept=".heic,.heif,image/heic,image/heif"
                className="sr-only"
                tabIndex={-1}
                onChange={(e) => {
                  void onPick(e.target.files);
                  e.target.value = "";
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <label
            className="shrink-0 text-xs font-medium tracking-wide text-subtle uppercase"
            htmlFor="compare-quality"
          >
            JPEG / WebP quality
          </label>
          <Slider
            id="compare-quality"
            min={40}
            max={100}
            step={1}
            value={[Math.round(quality * 100)]}
            onValueChange={(v) => setQuality((v[0] ?? 85) / 100)}
            aria-label="Comparison quality"
          />
          <span className="w-10 shrink-0 text-right font-mono text-sm tabular-nums text-fg">
            {Math.round(quality * 100)}
          </span>
        </div>

        {compare ? (
          <ul className="mt-8 space-y-4">
            <SizeRow
              label="HEIC"
              hint="Original"
              bytes={compare.heicBytes}
              max={max}
              accent
            />
            <SizeRow
              label="JPEG"
              hint={`${jpegRatio.toFixed(1)}× the HEIC`}
              bytes={compare.jpegBytes}
              max={max}
            />
            <SizeRow
              label="WebP"
              hint="Another modern option"
              bytes={compare.webpBytes}
              max={max}
            />
            <SizeRow
              label="PNG"
              hint="Keeps every pixel"
              bytes={compare.pngBytes}
              max={max}
            />
          </ul>
        ) : null}
      </section>

      {compare ? (
        <section
          className="stagger-in mt-10"
          style={{ animationDelay: "85ms" }}
        >
          <h2 className="font-display text-2xl tracking-tight text-fg">
            JPEG quality
          </h2>
          <p className="mt-2 max-w-xl text-sm text-pretty text-muted">
            Same HEIC, four JPEGs. Tap a tile to set that quality above.
          </p>
          <JpegQualityGrid
            steps={compare.jpegSteps}
            heicBytes={compare.heicBytes}
            active={Math.round(quality * 100)}
            onPick={(q) => setQuality(q)}
          />
        </section>
      ) : null}

      <p className="stagger-in mt-10 text-sm text-pretty text-muted">
        Converting a HEIC to JPEG often makes the file bigger. Keep the HEIC
        as the original.{" "}
        <Link
          to="/jpeg-artifacts"
          className="text-fg underline decoration-border underline-offset-4"
        >
        JPEG artifacts
        </Link>
      </p>
      <div className="mt-6">
        <Button asChild>
          <Link to="/">Convert a HEIC</Link>
        </Button>
      </div>
    </article>
  );
}

function SizeRow({
  label,
  hint,
  bytes,
  max,
  accent = false,
}: {
  label: string;
  hint: string;
  bytes: number;
  max: number;
  accent?: boolean;
}) {
  const pct = Math.max(6, Math.round((bytes / max) * 100));
  return (
    <li>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <p className="text-sm text-fg">
          {label}
          <span className="ml-2 text-subtle">{hint}</span>
        </p>
        <p className="font-mono text-sm tabular-nums text-fg">
          {formatBytes(bytes)}
        </p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-2">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-300 ease-out",
            accent ? "bg-accent" : "bg-muted/50",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </li>
  );
}

function JpegQualityGrid({
  steps,
  heicBytes,
  active,
  onPick,
}: {
  steps: JpegStep[];
  heicBytes: number;
  active: number;
  onPick: (quality: number) => void;
}) {
  const maxBytes = Math.max(heicBytes, ...steps.map((s) => s.bytes));

  return (
    <div className="mt-6">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {steps.map((step) => {
          const q = Math.round(step.quality * 100);
          const note = QUALITY_NOTES[q];
          const selected = active === q;
          return (
            <li key={step.quality}>
              <button
                type="button"
                onClick={() => onPick(step.quality)}
                className={cn(
                  "flex w-full flex-col overflow-hidden rounded-xl bg-surface text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 ease-out",
                  selected && "shadow-[var(--shadow-border-hover)]",
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                  <img
                    src={step.url}
                    alt={`JPEG quality ${q}`}
                    className="size-full origin-center scale-150 object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 p-3">
                  <p className="text-sm font-medium text-fg">JPEG {q}</p>
                  <p className="font-mono text-xs tabular-nums text-subtle">
                    {formatBytes(step.bytes)}
                    <span className="text-subtle">
                      {" "}
                      · {(step.bytes / heicBytes).toFixed(1)}×
                    </span>
                  </p>
                  {note ? (
                    <p className="mt-1 hidden text-xs text-pretty text-muted sm:block">
                      {note.title}
                    </p>
                  ) : null}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="mt-6 space-y-3">
        <li>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="text-fg">HEIC original</span>
            <span className="font-mono tabular-nums text-muted">
              {formatBytes(heicBytes)}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-accent"
              style={{
                width: `${Math.max(6, Math.round((heicBytes / maxBytes) * 100))}%`,
              }}
            />
          </div>
        </li>
        {steps.map((step) => {
          const q = Math.round(step.quality * 100);
          return (
            <li key={`bar-${step.quality}`}>
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="text-muted">JPEG {q}</span>
                <span className="font-mono tabular-nums text-muted">
                  {formatBytes(step.bytes)}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-muted/50"
                  style={{
                    width: `${Math.max(6, Math.round((step.bytes / maxBytes) * 100))}%`,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <dl className="mt-6 divide-y divide-border border-y border-border">
        {steps.map((step) => {
          const q = Math.round(step.quality * 100);
          const note = QUALITY_NOTES[q];
          if (!note) return null;
          return (
            <div
              key={`note-${step.quality}`}
              className="grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-6"
            >
              <dt className="font-mono text-sm text-fg">{q}</dt>
              <dd className="text-sm text-pretty text-muted">
                <span className="font-medium text-fg">{note.title}. </span>
                {note.body}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
