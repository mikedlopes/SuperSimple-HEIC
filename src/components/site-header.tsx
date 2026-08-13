import { Link, useRouterState } from "@tanstack/react-router";

const LEARN = new Set(["/about", "/compression", "/jpeg-artifacts", "/how"]);

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const learnActive = LEARN.has(pathname);

  return (
    <header className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
      <div className="min-w-0">
        <Link
          to="/"
          className="font-display text-xl tracking-tight text-fg transition-[opacity] duration-150 hover:opacity-80"
        >
          Tovra
        </Link>
        <p className="text-xs text-subtle">Files stay on this device</p>
      </div>
      <nav className="flex items-center gap-4 text-sm sm:gap-5">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className="text-muted transition-[color] duration-150 hover:text-fg"
          activeProps={{ className: "text-fg" }}
        >
          Convert
        </Link>
        <Link
          to="/about"
          className={
            learnActive
              ? "text-fg"
              : "text-muted transition-[color] duration-150 hover:text-fg"
          }
        >
          Learn
        </Link>
      </nav>
    </header>
  );
}
