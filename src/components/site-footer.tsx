import { Link } from "@tanstack/react-router";

export function SiteFooter({ note }: { note?: string }) {
  return (
    <footer className="px-5 pb-10 pt-6 sm:px-8">
      {note ? (
        <p className="mx-auto max-w-3xl text-center text-xs text-pretty text-subtle">
          {note}
        </p>
      ) : null}
      <p className="mx-auto mt-3 max-w-3xl text-center text-xs text-pretty text-subtle">
        By using Tovra you agree to the{" "}
        <Link
          to="/terms"
          className="text-muted transition-[color] duration-150 hover:text-fg"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          to="/privacy"
          className="text-muted transition-[color] duration-150 hover:text-fg"
        >
          Privacy
        </Link>
        . As-is — keep your originals.
      </p>
    </footer>
  );
}
