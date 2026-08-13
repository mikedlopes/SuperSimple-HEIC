import { Link } from "@tanstack/react-router";

export function OperatorNote() {
  return (
    <p className="rounded-lg bg-surface px-4 py-3 text-sm text-pretty text-muted shadow-[var(--shadow-border)]">
      Internal reading note — not part of the product, not in the nav.{" "}
      <Link
        to="/"
        className="text-fg underline decoration-border underline-offset-4"
      >
        Back to Convert
      </Link>
    </p>
  );
}
