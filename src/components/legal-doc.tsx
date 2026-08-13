import type { ReactNode } from "react";

export function LegalDoc({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 pb-16 pt-6 sm:px-8 sm:pt-10">
      <header className="stagger-in max-w-xl">
        <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          {kicker}
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-balance text-fg sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-muted">Effective {updated}.</p>
      </header>
      <div className="stagger-in mt-10 space-y-10" style={{ animationDelay: "60ms" }}>
        {children}
      </div>
    </article>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="font-display text-2xl tracking-tight text-fg">{title}</h2>
      <div className="mt-3 space-y-3 text-pretty text-muted [&_a]:text-fg [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_li]:mt-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-medium [&_strong]:text-fg [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
