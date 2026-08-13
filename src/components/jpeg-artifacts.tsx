import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { SideBySide, WipeCompare } from "@/components/side-by-side";
import { LearnStrip } from "@/components/learn-strip";
import { Button } from "@/components/ui/button";
import {
  type ArtifactDemo,
  buildArtifactDemos,
} from "@/lib/artifact-demos";
import { encodeJpegQualities, formatBytes } from "@/lib/convert";

const SAMPLE_PATH = "/samples/autumn.heic";

type Frame = {
  quality: number;
  bytes: number;
  url: string;
};

type DemoView = ArtifactDemo & {
  cleanUrl: string;
  dirtyUrl: string;
};

export function JpegArtifacts() {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [demos, setDemos] = useState<DemoView[]>([]);
  const [error, setError] = useState<string | null>(null);
  const urlsRef = useRef<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [sampleRes, built] = await Promise.all([
          fetch(SAMPLE_PATH).then(async (res) => {
            if (!res.ok) throw new Error("missing sample");
            const blob = await res.blob();
            const file = new File([blob], "autumn.heic", { type: "image/heic" });
            return encodeJpegQualities(file, [0.3, 0.85]);
          }),
          buildArtifactDemos(),
        ]);
        if (cancelled) return;

        const nextFrames = sampleRes.frames.map((frame) => {
          const url = URL.createObjectURL(frame.blob);
          urlsRef.current.push(url);
          return { quality: frame.quality, bytes: frame.blob.size, url };
        });
        const nextDemos = built.map((demo) => {
          const cleanUrl = URL.createObjectURL(demo.clean);
          const dirtyUrl = URL.createObjectURL(demo.dirty);
          urlsRef.current.push(cleanUrl, dirtyUrl);
          return { ...demo, cleanUrl, dirtyUrl };
        });
        setFrames(nextFrames);
        setDemos(nextDemos);
      } catch {
        if (!cancelled) setError("Could not build the example photos.");
      }
    })();
    return () => {
      cancelled = true;
      for (const url of urlsRef.current) URL.revokeObjectURL(url);
      urlsRef.current = [];
    };
  }, []);

  const harsh = frames.find((f) => f.quality === 0.3);
  const gentle = frames.find((f) => f.quality === 0.85);
  const [showDrawings, setShowDrawings] = useState(false);

  return (
    <article className="mx-auto w-full max-w-3xl px-5 pb-24 pt-6 sm:px-8 sm:pt-10">
      <header className="stagger-in max-w-xl">
        <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          JPEG leftovers
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-balance text-fg sm:text-5xl">
          JPEG artifacts
        </h1>
        <p className="mt-4 text-base text-pretty text-muted">
          When a JPEG is compressed too far, it does not fail cleanly. It
          leaves blocking, ringing, and other marks that were not in the
          original scene. Each pair below is a clean source next to a
          heavily compressed JPEG, encoded in this browser.
        </p>
      </header>

      <div className="stagger-in mt-8" style={{ animationDelay: "20ms" }}>
        <LearnStrip />
      </div>

      <section
        className="stagger-in mt-10 rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-6"
        style={{ animationDelay: "50ms" }}
      >
        <h2 className="font-display text-xl tracking-tight text-fg">
          Drag to compare
        </h2>
        <p className="mt-2 text-sm text-pretty text-muted">
          Same HEIC, same crop. Typical JPEG on the left, crushed on the
          right. A smooth sky is below — that is where banding shows first.
        </p>
        <div className="mt-4">
          {harsh && gentle ? (
            <WipeCompare
              leftSrc={gentle.url}
              rightSrc={harsh.url}
              leftLabel={`Quality 85 · ${formatBytes(gentle.bytes)}`}
              rightLabel={`Quality 30 · ${formatBytes(harsh.bytes)}`}
              leftAlt="Typical JPEG at quality 85"
              rightAlt="Heavy JPEG artifacts at quality 30"
              zoom
            />
          ) : (
            <div className="grid aspect-[4/3] place-items-center rounded-xl bg-surface-2">
              <LoaderCircle className="size-5 animate-spin text-fg" />
            </div>
          )}
        </div>
        <SkyWipe />
      </section>

      <section className="stagger-in mt-12" style={{ animationDelay: "60ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          More examples
        </h2>
        <p className="mt-2 max-w-xl text-sm text-pretty text-muted">
          Drawn pairs for blocking, banding, mosquito noise, and the rest —
          if you want the names that show up in photo forums.
        </p>
        {!showDrawings ? (
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => setShowDrawings(true)}
          >
            Show drawings
          </Button>
        ) : demos.length === 0 && !error ? (
          <div className="mt-6 grid place-items-center rounded-xl bg-surface py-16 shadow-[var(--shadow-border)]">
            <LoaderCircle className="size-5 animate-spin text-fg" />
          </div>
        ) : (
          <ul className="mt-6 space-y-8">
            {demos.map((demo) => (
              <li key={demo.id}>
                <div className="mb-3">
                  <h3 className="font-medium text-fg">{demo.name}</h3>
                  <p className="text-xs text-subtle">{demo.look}</p>
                </div>
                <SideBySide
                  leftSrc={demo.cleanUrl}
                  rightSrc={demo.dirtyUrl}
                  leftLabel={demo.cleanLabel}
                  rightLabel={demo.dirtyLabel}
                  leftAlt={`${demo.name}, clean original`}
                  rightAlt={`${demo.name}, after harsh JPEG`}
                />
                <p className="mt-3 text-sm text-pretty text-muted">{demo.body}</p>
              </li>
            ))}
          </ul>
        )}
        {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}
      </section>

      <section className="stagger-in mt-12" style={{ animationDelay: "120ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          How to reduce artifacts
        </h2>
        <p className="mt-4 text-pretty text-muted">
          Artifacts — blocking, banding, ringing — are written into the
          file. Each JPEG save can add more. Export from HEIC once, at
          quality 80–85, and keep the HEIC as the original.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/">Convert a HEIC</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}

function SkyWipe() {
  const [pair, setPair] = useState<{ gentle: string; harsh: string } | null>(
    null,
  );

  useEffect(() => {
    const urls: string[] = [];
    let cancelled = false;
    (async () => {
      const canvas = document.createElement("canvas");
      canvas.width = 960;
      canvas.height = 720;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
      sky.addColorStop(0, "rgb(28, 62, 128)");
      sky.addColorStop(0.42, "rgb(92, 132, 176)");
      sky.addColorStop(0.7, "rgb(196, 162, 132)");
      sky.addColorStop(1, "rgb(228, 184, 140)");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgb(22, 36, 28)";
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.82);
      for (let x = 0; x <= canvas.width; x += 16) {
        const y =
          canvas.height * 0.8 +
          Math.sin(x * 0.02) * 18 +
          Math.sin(x * 0.07) * 10;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fill();

      const gentle = await new Promise<Blob | null>((res) =>
        canvas.toBlob(res, "image/jpeg", 0.85),
      );
      const harsh = await new Promise<Blob | null>((res) =>
        canvas.toBlob(res, "image/jpeg", 0.3),
      );
      if (cancelled || !gentle || !harsh) return;
      const a = URL.createObjectURL(gentle);
      const b = URL.createObjectURL(harsh);
      urls.push(a, b);
      setPair({ gentle: a, harsh: b });
    })();
    return () => {
      cancelled = true;
      for (const url of urls) URL.revokeObjectURL(url);
    };
  }, []);

  if (!pair) return null;
  return (
    <div className="mt-6">
      <p className="mb-2 text-sm text-muted">
        A sky. Banding shows up here first.
      </p>
      <WipeCompare
        leftSrc={pair.gentle}
        rightSrc={pair.harsh}
        leftLabel="Sky · quality 85"
        rightLabel="Sky · quality 30"
        leftAlt="Smooth sky at JPEG quality 85"
        rightAlt="Banded sky at JPEG quality 30"
      />
    </div>
  );
}
