import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const ITEMS = [
  { to: "/about" as const, label: "About" },
  { to: "/how" as const, label: "How" },
  { to: "/compression" as const, label: "Size" },
  { to: "/jpeg-artifacts" as const, label: "Artifacts" },
];

export function LearnStrip() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      className="flex flex-wrap gap-x-4 gap-y-1 text-sm"
      aria-label="Learn pages"
    >
      {ITEMS.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "transition-[color] duration-150",
              active ? "text-fg" : "text-muted hover:text-fg",
            )}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
