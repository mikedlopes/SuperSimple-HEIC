import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const TIMELINE = [
  {
    year: "1992",
    title: "JPEG becomes standard",
    body: "Cameras and websites adopted JPEG. It remains widely supported and was designed for much smaller images.",
  },
  {
    year: "2015",
    title: "HEIF and HEVC",
    body: "MPEG publishes HEIF. Nokia releases reference software. The image inside is typically HEVC, the codec also used for 4K video.",
  },
  {
    year: "2017",
    title: "iPhone Camera adopts HEIC",
    body: "iOS 11 saves Camera photos as .heic. Live Photos and Portrait data can be stored in the same file.",
  },
  {
    year: "Today",
    title: "Phones support it; many websites do not",
    body: "Windows and Android support has improved. Email, printers, and most websites still expect JPEG. That is why conversion is common.",
  },
];

const RELATED = [
  {
    name: "HEIF",
    detail: "The container format. One image, or several, plus auxiliary data.",
  },
  {
    name: "HEIC",
    detail: "Apple’s designation when the image inside is HEVC. The file produced by iPhone Camera.",
  },
  {
    name: "HEVC",
    detail: "The compression codec. Efficient, and not free for every vendor to ship.",
  },
  {
    name: "JPEG",
    detail: "The older format with nearly universal support: email, websites, and print.",
  },
  {
    name: "AVIF",
    detail: "A related container using AV1 instead of HEVC. Support is still uneven.",
  },
];

const PROS = [
  {
    title: "Smaller files",
    body: "Often about half the size of a comparable JPEG. More photos fit on the device and in iCloud.",
  },
  {
    title: "One file, extra data",
    body: "Live Photo motion or Portrait depth can be stored with the still image.",
  },
  {
    title: "Wider color range",
    body: "Higher dynamic range and a broader color gamut than typical JPEG.",
  },
];

const CONS = [
  {
    title: "Incomplete device support",
    body: "Works in iPhone Photos. A Windows PC or older Mac may not open the file.",
  },
  {
    title: "Websites often reject it",
    body: "Most upload forms cannot read HEIC. The image may appear as a broken icon.",
  },
  {
    title: "Sharing is inconsistent",
    body: "Slack, email, and many printers still require JPEG and may discard Live Photo motion.",
  },
];

export function AboutHeic() {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 pb-16 pt-6 sm:px-8 sm:pt-10">
      <header className="stagger-in max-w-xl">
        <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          About the format
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-balance text-fg sm:text-5xl">
          What is a HEIC file?
        </h1>
        <p className="mt-4 text-base text-pretty text-muted">
          Photos taken on an iPhone are often saved as HEIC: smaller on disk,
          and less widely supported than JPEG.
        </p>
      </header>

      <nav
        className="stagger-in mt-10 grid gap-3 sm:grid-cols-3"
        style={{ animationDelay: "40ms" }}
        aria-label="Learn more"
      >
        <Link
          to="/how"
          className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
        >
          <p className="text-xs font-medium tracking-wide text-subtle uppercase">
            How
          </p>
          <p className="mt-1 font-medium text-fg">How HEIC compresses an image</p>
          <p className="mt-1 text-sm text-pretty text-muted">
            Adaptive tiles and residual coding.
          </p>
        </Link>
        <Link
          to="/compression"
          className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
        >
          <p className="text-xs font-medium tracking-wide text-subtle uppercase">
            Size
          </p>
          <p className="mt-1 font-medium text-fg">HEIC compared with JPEG</p>
          <p className="mt-1 text-sm text-pretty text-muted">
            File-size comparison with JPEG, WebP, and PNG.
          </p>
        </Link>
        <Link
          to="/jpeg-artifacts"
          className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
        >
          <p className="text-xs font-medium tracking-wide text-subtle uppercase">
            Artifacts
          </p>
          <p className="mt-1 font-medium text-fg">JPEG artifacts</p>
          <p className="mt-1 text-sm text-pretty text-muted">
            Blocking, ringing, and other compression marks.
          </p>
        </Link>
      </nav>

      <section className="stagger-in mt-12" style={{ animationDelay: "60ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          Two names, one idea
        </h2>
        <p className="mt-4 text-pretty text-muted">
          <strong className="font-medium text-fg">HEIF</strong> is the
          container. <strong className="font-medium text-fg">HEIC</strong> is
          Apple’s name when the image inside is compressed with HEVC — files
          such as{" "}
          <span className="font-mono text-sm text-fg">IMG_1234.HEIC</span>.
          Many computers still cannot open the format.
        </p>
      </section>

      <section className="stagger-in mt-12" style={{ animationDelay: "80ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          History
        </h2>
        <ol className="mt-6 space-y-0">
          {TIMELINE.map((item) => (
            <li
              key={item.year}
              className="grid grid-cols-[4.75rem_1fr] gap-4 border-t border-border py-5 sm:grid-cols-[6rem_1fr]"
            >
              <p className="font-mono text-sm tabular-nums text-subtle">
                {item.year}
              </p>
              <div>
                <h3 className="font-medium text-fg">{item.title}</h3>
                <p className="mt-1 text-sm text-pretty text-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="stagger-in mt-12" style={{ animationDelay: "100ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          Advantages and limitations
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
              Advantages
            </p>
            <ul className="mt-4 space-y-4">
              {PROS.map((item) => (
                <li key={item.title}>
                  <h3 className="font-medium text-fg">{item.title}</h3>
                  <p className="mt-1 text-sm text-pretty text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
              Limitations
            </p>
            <ul className="mt-4 space-y-4">
              {CONS.map((item) => (
                <li key={item.title}>
                  <h3 className="font-medium text-fg">{item.title}</h3>
                  <p className="mt-1 text-sm text-pretty text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="stagger-in mt-12" style={{ animationDelay: "120ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          Related names
        </h2>
        <dl className="mt-6 divide-y divide-border border-y border-border">
          {RELATED.map((item) => (
            <div
              key={item.name}
              className="grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-6"
            >
              <dt className="font-mono text-sm text-fg">{item.name}</dt>
              <dd className="text-sm text-pretty text-muted">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="stagger-in mt-12" style={{ animationDelay: "140ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          Why convert?
        </h2>
        <p className="mt-4 text-pretty text-muted">
          HEIC is efficient for storage on a phone. JPEG remains the format
          most applications accept. This tool converts on your device.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/">Convert HEIC files</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
