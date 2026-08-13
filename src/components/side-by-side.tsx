import { useCallback, useId, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SideBySide({
  leftSrc,
  rightSrc,
  leftLabel,
  rightLabel,
  leftAlt,
  rightAlt,
  zoom = false,
  className,
}: {
  leftSrc: string;
  rightSrc: string;
  leftLabel: string;
  rightLabel: string;
  leftAlt: string;
  rightAlt: string;
  zoom?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-surface-2 shadow-[var(--shadow-border)]",
        className,
      )}
    >
      <div className="grid grid-cols-2">
        <figure className="relative min-w-0 border-r border-border">
          <img
            src={leftSrc}
            alt={leftAlt}
            className={cn(
              "aspect-[4/3] w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10",
              zoom && "origin-center scale-150",
            )}
          />
          <figcaption className="absolute bottom-2 left-2 rounded-sm bg-bg/80 px-2 py-1 text-xs text-fg">
            {leftLabel}
          </figcaption>
        </figure>
        <figure className="relative min-w-0">
          <img
            src={rightSrc}
            alt={rightAlt}
            className={cn(
              "aspect-[4/3] w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10",
              zoom && "origin-center scale-150",
            )}
          />
          <figcaption className="absolute right-2 bottom-2 rounded-sm bg-bg/80 px-2 py-1 text-xs text-fg">
            {rightLabel}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export function WipeCompare({
  leftSrc,
  rightSrc,
  leftLabel,
  rightLabel,
  leftAlt,
  rightAlt,
  zoom = false,
}: {
  leftSrc: string;
  rightSrc: string;
  leftLabel: string;
  rightLabel: string;
  leftAlt: string;
  rightAlt: string;
  zoom?: boolean;
}) {
  const [pct, setPct] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const labelId = useId();

  const setFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(96, Math.max(4, next)));
  }, []);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromClientX(event.clientX);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    setFromClientX(event.clientX);
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    dragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <div className="overflow-hidden rounded-xl bg-surface-2 shadow-[var(--shadow-border)]">
      <div
        ref={trackRef}
        className="relative aspect-[4/3] cursor-ew-resize touch-none select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img
          src={rightSrc}
          alt={rightAlt}
          className={cn(
            "absolute inset-0 size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10",
            zoom && "origin-center scale-150",
          )}
        />
        <img
          src={leftSrc}
          alt={leftAlt}
          className={cn(
            "absolute inset-0 size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10",
            zoom && "origin-center scale-150",
          )}
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        />
        <div
          className="absolute inset-y-0 z-10 w-px bg-accent"
          style={{ left: `${pct}%` }}
        >
          <div className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-fg">
            <ChevronsLeftRight className="size-4" strokeWidth={1.75} />
          </div>
        </div>
        <p className="pointer-events-none absolute bottom-2 left-2 rounded-sm bg-bg/80 px-2 py-1 text-xs text-fg">
          {leftLabel}
        </p>
        <p className="pointer-events-none absolute right-2 bottom-2 rounded-sm bg-bg/80 px-2 py-1 text-xs text-fg">
          {rightLabel}
        </p>
      </div>
      <label className="sr-only" htmlFor={labelId}>
        Drag to compare images
      </label>
      <input
        id={labelId}
        type="range"
        min={4}
        max={96}
        value={Math.round(pct)}
        onChange={(e) => setPct(Number(e.target.value))}
        className="sr-only"
      />
    </div>
  );
}
