import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  CircleAlert,
  Download,
  ImageIcon,
  LoaderCircle,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  type OutputFormat,
  FORMAT_META,
  ACCEPTED_LABEL,
  convertHeic,
  downloadBlob,
  explainConvertError,
  formatBytes,
  outputName,
  validateHeicFile,
  zipConverted,
} from "@/lib/convert";

type Status = "queued" | "converting" | "done" | "error" | "rejected";

type Item = {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  status: Status;
  error?: string;
  note?: string;
  kind?: "still" | "sequence" | "hdr";
  kept?: string[];
  output?: Blob;
  previewUrl?: string;
  outputSize?: number;
  width?: number;
  height?: number;
};

const FORMATS: OutputFormat[] = ["image/jpeg", "image/png", "image/webp"];
const ACCEPT = ".heic,.heif,image/heic,image/heif,image/heic-sequence";
const SAMPLE_PATH = "/samples/autumn.heic";
const SAMPLE_B_PATH = "/samples/still.heic";

function newId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function Converter() {
  const [items, setItems] = useState<Item[]>([]);
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [quality, setQuality] = useState(0.85);
  const [keepMeta, setKeepMeta] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [zipping, setZipping] = useState(false);
  const [loadingSample, setLoadingSample] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef(items);
  const processingRef = useRef(false);
  const settingsRef = useRef({ format, quality, keepMeta });
  const addFilesRef = useRef<(files: FileList | File[]) => Promise<void>>(
    async () => {},
  );

  itemsRef.current = items;
  settingsRef.current = { format, quality, keepMeta };

  const processQueue = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;
    try {
      while (true) {
        const next = itemsRef.current.find((i) => i.status === "queued");
        if (!next) break;
        const { format: fmt, quality: q, keepMeta: keep } = settingsRef.current;
        setItems((prev) =>
          prev.map((i) =>
            i.id === next.id
              ? { ...i, status: "converting", error: undefined }
              : i,
          ),
        );
        try {
          const result = await convertHeic(next.file, fmt, q, {
            keepMetadata: keep,
          });
          const previewUrl = URL.createObjectURL(result.blob);
          setItems((prev) =>
            prev.map((i) => {
              if (i.id !== next.id) return i;
              if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
              return {
                ...i,
                status: "done",
                output: result.blob,
                previewUrl,
                outputSize: result.blob.size,
                width: result.width,
                height: result.height,
                kept: keep ? (result.kept ?? []) : undefined,
              };
            }),
          );
        } catch (err) {
          const message = explainConvertError(err, next.kind);
          setItems((prev) =>
            prev.map((i) =>
              i.id === next.id ? { ...i, status: "error", error: message } : i,
            ),
          );
        }
      }
    } finally {
      processingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (items.some((i) => i.status === "queued")) {
      void processQueue();
    }
  }, [items, processQueue]);

  const addFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const incoming = Array.from(fileList);
      if (incoming.length === 0) return;

      const accepted: Item[] = [];
      const rejected: Item[] = [];
      for (const file of incoming) {
        const check = await validateHeicFile(file);
        const item: Item = {
          id: newId(),
          file,
          name: file.name || "untitled",
          originalSize: file.size,
          status: check.ok ? "queued" : "rejected",
          error: check.ok ? undefined : check.reason,
          note: check.ok ? check.note : undefined,
          kind: check.ok ? check.kind : undefined,
        };
        if (check.ok) accepted.push(item);
        else rejected.push(item);
      }

      if (rejected.length > 0) {
        toast(
          rejected.length === 1
            ? `${rejected[0].name} — ${rejected[0].error}`
            : `${rejected.length} files are not ${ACCEPTED_LABEL}`,
        );
      }
      if (accepted.length === 0 && rejected.length === 0) return;

      setItems((prev) => [...prev, ...accepted, ...rejected]);
    },
    [],
  );
  addFilesRef.current = addFiles;

  useEffect(() => {
    function isFileDrag(event: DragEvent) {
      const types = event.dataTransfer?.types;
      if (!types) return false;
      return Array.from(types).includes("Files");
    }

    function onDragEnter(event: DragEvent) {
      if (!isFileDrag(event)) return;
      event.preventDefault();
      setDragging(true);
    }

    function onDragOver(event: DragEvent) {
      if (!isFileDrag(event)) return;
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
      setDragging(true);
    }

    function onDragLeave(event: DragEvent) {
      if (!isFileDrag(event)) return;
      event.preventDefault();
      const x = event.clientX;
      const y = event.clientY;
      if (
        event.relatedTarget == null ||
        x <= 0 ||
        y <= 0 ||
        x >= window.innerWidth ||
        y >= window.innerHeight
      ) {
        setDragging(false);
      }
    }

    function onDrop(event: DragEvent) {
      event.preventDefault();
      setDragging(false);
      const files = event.dataTransfer?.files;
      if (files && files.length > 0) {
        void addFilesRef.current(files);
      }
    }

    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, []);

  const reconvertAll = useCallback(() => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.status === "rejected") return i;
        if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
        return {
          ...i,
          status: "queued" as const,
          error: undefined,
          output: undefined,
          previewUrl: undefined,
          outputSize: undefined,
        };
      }),
    );
  }, []);

  const settingsReady = items.some((i) => i.status !== "rejected");
  const skipFirstSettings = useRef(true);
  useEffect(() => {
    if (!settingsReady) {
      skipFirstSettings.current = true;
      return;
    }
    if (skipFirstSettings.current) {
      skipFirstSettings.current = false;
      return;
    }
    const handle = window.setTimeout(() => reconvertAll(), 280);
    return () => window.clearTimeout(handle);
  }, [format, quality, keepMeta, reconvertAll, settingsReady]);

  useEffect(() => {
    return () => {
      for (const item of itemsRef.current) {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      }
    };
  }, []);

  const usable = useMemo(
    () => items.filter((i) => i.status !== "rejected"),
    [items],
  );
  const rejectedCount = items.length - usable.length;
  const done = useMemo(
    () => usable.filter((i) => i.status === "done" && i.output),
    [usable],
  );
  const busy = usable.some(
    (i) => i.status === "queued" || i.status === "converting",
  );
  const saved = useMemo(() => {
    return done.reduce((acc, i) => {
      if (!i.outputSize) return acc;
      return acc + (i.originalSize - i.outputSize);
    }, 0);
  }, [done]);

  function removeItem(id: string) {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  }

  function clearAll() {
    setItems((prev) => {
      for (const i of prev) {
        if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
      }
      return [];
    });
  }

  async function downloadAll() {
    if (done.length === 0) return;
    if (done.length === 1 && done[0].output) {
      downloadBlob(done[0].output, outputName(done[0].name, format));
      return;
    }
    setZipping(true);
    try {
      const blob = await zipConverted(
        done
          .filter((i): i is Item & { output: Blob } => Boolean(i.output))
          .map((i) => ({
            name: outputName(i.name, format),
            blob: i.output,
          })),
      );
      downloadBlob(blob, `tovra-${FORMAT_META[format].ext}.zip`);
    } catch {
      toast("Could not build the zip. Try downloading files one at a time.");
    } finally {
      setZipping(false);
    }
  }

  async function loadSample(path: string, name: string) {
    setLoadingSample(name);
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error("sample missing");
      const blob = await res.blob();
      const file = new File([blob], name, { type: "image/heic" });
      await addFiles([file]);
    } catch {
      toast("Could not load the sample photo.");
    } finally {
      setLoadingSample(null);
    }
  }

  const inputId = useId();
  const empty = items.length === 0;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 pb-28 pt-6 sm:px-8 sm:pb-16 sm:pt-10">
      {dragging ? (
        <div
          className="pointer-events-none fixed inset-3 z-50 flex items-center justify-center rounded-2xl bg-bg/75 outline outline-1 outline-dashed outline-accent/50"
          aria-hidden
        >
          <p className="font-display text-2xl tracking-tight text-fg sm:text-3xl">
            Release to add HEIC files
          </p>
        </div>
      ) : null}

      <section className="stagger-in max-w-xl">
        <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          Local converter
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-balance text-fg sm:text-5xl">
          Your photos, unlocked.
        </h1>
        <p className="mt-4 max-w-md text-base text-pretty text-muted">
          Drag HEIC files onto this page to convert them to JPEG, PNG, or
          WebP. Decoding runs in the browser. Files are not uploaded.
        </p>
      </section>

      <div
        className="stagger-in"
        style={{ animationDelay: "80ms" }}
        data-drop-zone="true"
      >
        {empty ? (
          <div
            className={cn(
              "flex min-h-64 flex-col items-center justify-center rounded-2xl bg-surface px-6 py-10 text-center shadow-[var(--shadow-border)] transition-[box-shadow,background-color] duration-200 ease-out sm:min-h-80 sm:px-10 sm:py-12",
              dragging && "bg-surface-2 shadow-[var(--shadow-border-hover)]",
            )}
          >
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex flex-col items-center"
            >
              <span className="grid size-12 place-items-center rounded-lg bg-surface-2 text-muted">
                <ImageIcon className="size-5" strokeWidth={1.6} />
              </span>
              <span className="mt-5 font-display text-2xl tracking-tight text-fg">
                {dragging ? "Release to add photos" : "Drop HEIC files here"}
              </span>
              <span className="mt-2 max-w-sm text-sm text-pretty text-muted">
                {dragging
                  ? "Drop anywhere on the page to start converting."
                  : "You may add multiple files. JPEG and PNG are skipped. Choose an output format, then save."}
              </span>
            </button>

            <span className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Button
                type="button"
                size="sm"
                onClick={() => inputRef.current?.click()}
              >
                Choose files
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={loadingSample !== null}
                onClick={() => void loadSample(SAMPLE_PATH, "autumn.heic")}
              >
                {loadingSample === "autumn.heic" ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : null}
                Sample · autumn
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={loadingSample !== null}
                onClick={() => void loadSample(SAMPLE_B_PATH, "still.heic")}
              >
                {loadingSample === "still.heic" ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : null}
                Sample · still
              </Button>
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex min-h-14 w-full flex-col items-center justify-center gap-0.5 rounded-xl bg-surface px-4 py-3 text-sm shadow-[var(--shadow-border)] transition-[box-shadow,background-color,color] duration-200 ease-out hover:bg-surface-2 sm:flex-row sm:gap-2",
              dragging && "bg-surface-2 shadow-[var(--shadow-border-hover)]",
            )}
          >
            <span className="flex items-center gap-2 text-fg">
              <Plus className="size-4" strokeWidth={1.75} />
              {dragging ? "Release to add photos" : "Drop more HEIC files here"}
            </span>
            <span className="text-subtle">
              {dragging ? "" : "or choose files"}
            </span>
          </button>
        )}
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={ACCEPT}
          multiple
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            if (e.target.files) void addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <p className="mt-3 text-center text-xs text-pretty text-subtle">
          As-is. Keep your originals.{" "}
          <Link
            to="/terms"
            className="text-muted transition-[color] duration-150 hover:text-fg"
          >
            Terms
          </Link>
        </p>
      </div>

      <Controls
        format={format}
        quality={quality}
        keepMeta={keepMeta}
        onFormat={setFormat}
        onQuality={setQuality}
        onKeepMeta={setKeepMeta}
      />

      {items.length > 0 ? (
        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-xl tracking-tight text-fg">
                {usable.length} {usable.length === 1 ? "photo" : "photos"}
                {rejectedCount > 0
                  ? ` · ${rejectedCount} skipped`
                  : ""}
              </h2>
              <p className="mt-0.5 text-sm text-muted tabular-nums">
                {busy
                  ? `Converting ${usable.filter((i) => i.status === "done" || i.status === "error").length + 1} of ${usable.length}`
                  : `${done.length} ready`}
                {saved > 0 ? ` · ${formatBytes(saved)} smaller` : null}
                {saved < 0 ? ` · ${formatBytes(-saved)} larger` : null}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                disabled={busy}
              >
                <Trash2 className="size-3.5" />
                Clear
              </Button>
              <Button
                size="sm"
                className="hidden sm:inline-flex"
                onClick={() => void downloadAll()}
                disabled={done.length === 0 || zipping}
              >
                {zipping ? (
                  <LoaderCircle className="size-3.5 animate-spin" />
                ) : (
                  <Download className="size-3.5" />
                )}
                {done.length > 1 ? "Download all" : "Download"}
              </Button>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <FileCard
                key={item.id}
                item={item}
                format={format}
                keepMeta={keepMeta}
                index={index}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </ul>
        </section>
      ) : null}

      {items.length > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-bg/90 px-4 py-3 backdrop-blur-sm sm:hidden">
          <Button
            className="w-full"
            onClick={() => void downloadAll()}
            disabled={done.length === 0 || zipping}
          >
            {zipping ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Download className="size-4" />
            )}
            {done.length > 1
              ? `Download ${done.length} files`
              : done.length === 1
                ? "Download"
                : "Converting…"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function Controls({
  format,
  quality,
  keepMeta,
  onFormat,
  onQuality,
  onKeepMeta,
}: {
  format: OutputFormat;
  quality: number;
  keepMeta: boolean;
  onFormat: (f: OutputFormat) => void;
  onQuality: (q: number) => void;
  onKeepMeta: (v: boolean) => void;
}) {
  const showQuality = FORMAT_META[format].quality;
  const qualityLabel =
    format === "image/jpeg"
      ? "JPEG quality"
      : format === "image/webp"
        ? "WebP quality"
        : "Quality";
  return (
    <div
      className="stagger-in flex flex-col gap-5 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]"
      style={{ animationDelay: "140ms" }}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div
        className="flex rounded-md bg-surface-2 p-1"
        role="radiogroup"
        aria-label="Output format"
      >
        {FORMATS.map((f) => {
          const active = format === f;
          return (
            <button
              key={f}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onFormat(f)}
              className={cn(
                "h-10 min-w-16 flex-1 rounded-sm px-3 text-sm font-medium transition-[background-color,color] duration-150 ease-out",
                active
                  ? "bg-accent text-accent-fg"
                  : "text-muted hover:text-fg",
              )}
            >
              {FORMAT_META[f].label}
            </button>
          );
        })}
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-1 items-center gap-4 sm:max-w-sm sm:justify-end",
          !showQuality && "opacity-40",
        )}
      >
        <label
          className="shrink-0 text-xs font-medium tracking-wide text-subtle uppercase"
          htmlFor="quality"
        >
          {qualityLabel}
        </label>
        <Slider
          id="quality"
          min={40}
          max={100}
          step={1}
          disabled={!showQuality}
          value={[Math.round(quality * 100)]}
          onValueChange={(v) => onQuality((v[0] ?? 90) / 100)}
          aria-label="Output quality"
        />
        <span className="w-10 shrink-0 text-right font-mono text-sm tabular-nums text-fg">
          {Math.round(quality * 100)}
        </span>
      </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="flex rounded-md bg-surface-2 p-1"
          role="radiogroup"
          aria-label="Metadata"
        >
          <button
            type="button"
            role="radio"
            aria-checked={!keepMeta}
            onClick={() => onKeepMeta(false)}
            className={cn(
              "h-10 flex-1 rounded-sm px-3 text-sm font-medium transition-[background-color,color] duration-150 ease-out sm:flex-none",
              !keepMeta
                ? "bg-accent text-accent-fg"
                : "text-muted hover:text-fg",
            )}
          >
            Remove metadata
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={keepMeta}
            onClick={() => onKeepMeta(true)}
            className={cn(
              "h-10 flex-1 rounded-sm px-3 text-sm font-medium transition-[background-color,color] duration-150 ease-out sm:flex-none",
              keepMeta
                ? "bg-accent text-accent-fg"
                : "text-muted hover:text-fg",
            )}
          >
            Preserve metadata
          </button>
        </div>
        <p className="text-xs text-pretty text-subtle sm:max-w-sm sm:text-right">
          {keepMeta
            ? format === "image/jpeg"
              ? "Copies date, camera, and GPS into the JPEG when those tags can be read. Sample files often have none. Photos from Camera typically do. Orientation is always applied."
              : "Metadata preservation applies to JPEG only. PNG and WebP are re-encoded without camera tags."
            : "The export is a new file. Date, GPS, and camera tags are omitted. Orientation is applied."}
        </p>
      </div>
    </div>
  );
}

function FileCard({
  item,
  format,
  keepMeta,
  index,
  onRemove,
}: {
  item: Item;
  format: OutputFormat;
  keepMeta: boolean;
  index: number;
  onRemove: () => void;
}) {
  const name = outputName(item.name, format);
  return (
    <li
      className="stagger-in group relative flex flex-col overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]"
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div className="relative aspect-[4/3] bg-surface-2">
        {item.previewUrl ? (
          <img
            src={item.previewUrl}
            alt={item.name}
            className="size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
          />
        ) : (
          <div
            className={cn(
              "size-full grid place-items-center",
              item.status === "error" || item.status === "rejected"
                ? "bg-danger/10"
                : "skeleton-shimmer",
            )}
          >
            {item.status === "rejected" || item.status === "error" ? (
              <CircleAlert
                className="size-6 text-danger"
                strokeWidth={1.6}
              />
            ) : null}
          </div>
        )}
        {item.status === "converting" || item.status === "queued" ? (
          <div className="absolute inset-0 grid place-items-center bg-bg/20">
            <LoaderCircle
              className="size-5 animate-spin text-fg"
              strokeWidth={1.75}
            />
          </div>
        ) : null}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${item.name}`}
          className="absolute top-2 right-2 grid size-8 place-items-center rounded-sm bg-bg/70 text-fg opacity-100 transition-[opacity,background-color] duration-150 hover:bg-bg sm:opacity-0 sm:group-hover:opacity-100"
        >
          <X className="size-3.5" />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="truncate text-sm font-medium text-fg" title={item.name}>
          {item.status === "done" ? name : item.name}
        </p>
        <p
          className={cn(
            "text-xs",
            item.status === "rejected" || item.status === "error"
              ? "text-pretty text-danger"
              : "font-mono tabular-nums text-subtle",
          )}
        >
          {item.status === "done" && item.outputSize != null ? (
            <>
              {formatBytes(item.originalSize)}
              <span className="text-subtle"> → </span>
              {formatBytes(item.outputSize)}
            </>
          ) : item.status === "rejected" ? (
            <span>{item.error ?? "Not HEIC"}</span>
          ) : item.status === "error" ? (
            <span>{item.error ?? "Could not convert"}</span>
          ) : item.status === "converting" ? (
            "Converting…"
          ) : (
            "Waiting…"
          )}
        </p>
        {item.status === "done" &&
        item.outputSize != null &&
        item.outputSize > item.originalSize &&
        format === "image/jpeg" ? (
          <p className="text-xs text-subtle">
            This JPEG is larger than the HEIC.{" "}
            <Link
              to="/compression"
              className="text-muted underline decoration-border underline-offset-4 hover:text-fg"
            >
              Why file size increases
            </Link>
          </p>
        ) : null}
        {item.note && item.status !== "rejected" ? (
          <p className="text-xs text-pretty text-muted">{item.note}</p>
        ) : null}
        {item.status === "done" && keepMeta && format === "image/jpeg" ? (
          <p className="text-xs text-subtle">
            {item.kept && item.kept.length > 0
              ? `Kept ${item.kept.join(", ")}`
              : item.name === "autumn.heic" || item.name === "still.heic"
                ? "Sample file — no camera metadata. Photos from Camera typically include it."
                : "No date, camera, or GPS metadata on this file"}
          </p>
        ) : null}
        {item.status === "done" && item.output ? (
          <Button
            variant="outline"
            size="sm"
            className="mt-auto w-full"
            onClick={() => downloadBlob(item.output!, name)}
          >
            <Download className="size-3.5" />
            Save
          </Button>
        ) : (
          <div className="mt-auto h-9" />
        )}
      </div>
    </li>
  );
}
