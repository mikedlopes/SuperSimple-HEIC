import { Link } from "@tanstack/react-router";

const LADDER = [
  {
    name: "Generic",
    mark: "HEIC converter",
    body: "The name of the thing itself. You cannot own it. A registry will refuse it. Competitors must be free to say what the product is.",
  },
  {
    name: "Descriptive",
    mark: "Local Photo Convert",
    body: "Tells a quality or job. Protectable only after the public learns it means you — “secondary meaning.” Hard, slow, and expensive to prove.",
  },
  {
    name: "Suggestive",
    mark: "a made-up light metaphor",
    body: "Takes a small mental hop. Stronger than descriptive. “Coppertone” for sunscreen is the usual textbook. Still not a force field.",
  },
  {
    name: "Arbitrary",
    mark: "Apple for computers",
    body: "A real word used on unrelated goods. Strong. The word is common; the use is not.",
  },
  {
    name: "Fanciful",
    mark: "Kodak, Xerox, Exxon",
    body: "Invented for the brand. Strongest kind of word mark — if you get there first and keep using it as a brand, not as a noun for the whole category.",
  },
];

const MYTHS = [
  {
    title: "A 3 makes it a new word",
    body: "People read Tovra as Tovra. Examiners and judges often treat leetspeak, hyphens, and extra letters as the same mark if the sound and meaning survive. Grazing the spelling is a style choice, not a clearance.",
  },
  {
    title: "We checked Google and we are fine",
    body: "Search is not a trademark search. The register, pending filings, and common-law use in your class all count. A telecom giant and a camera app can both sit on “Lumen” in different boxes — and still send a letter if they think you are in their lane.",
  },
  {
    title: "First to a domain owns the name",
    body: "A URL is not a trademark. Use in commerce, for particular goods, in a territory, is what starts rights. lumen.com belonging to someone else is a hint, not the whole map.",
  },
  {
    title: "Small and free means nobody cares",
    body: "Size affects who bothers to sue, not whether the name is distinctive. Distinctiveness is about the word. Enforcement is about money and pride.",
  },
];

export function MarksGuide() {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 pb-16 pt-6 sm:px-8 sm:pt-10">
      <header className="stagger-in max-w-xl">
        <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          For operators
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-balance text-fg sm:text-5xl">
          How distinctive is a name?
        </h1>
        <p className="mt-4 text-base text-pretty text-muted">
          Trademark law ranks names from “anyone may say this” to “that word
          is yours.” This is a reading note — not a search, a filing, or
          advice for your company. It is not linked from the product.
        </p>
      </header>

      <section className="stagger-in mt-12" style={{ animationDelay: "60ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          The ladder (weak → strong)
        </h2>
        <p className="mt-2 max-w-xl text-sm text-pretty text-muted">
          US lawyers call this the Abercrombie spectrum. Other countries use
          different labels and the same idea: the less the name describes the
          goods, the more it can point to a single source.
        </p>
        <ol className="mt-6 divide-y divide-border border-y border-border">
          {LADDER.map((rung, i) => (
            <li
              key={rung.name}
              className="grid gap-2 py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
            >
              <div>
                <p className="font-mono text-xs tabular-nums text-subtle">
                  {i + 1}
                </p>
                <h3 className="font-medium text-fg">{rung.name}</h3>
              </div>
              <div>
                <p className="text-sm text-fg">{rung.mark}</p>
                <p className="mt-2 text-sm text-pretty text-muted">{rung.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="stagger-in mt-12" style={{ animationDelay: "80ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          Distinctive is not the same as free
        </h2>
        <div className="mt-4 space-y-4 text-pretty text-muted">
          <p>
            A fanciful name can still be taken. Kodak is strong — for the
            company that already uses it. Distinctiveness asks “could this
            word function as a brand?” Priority asks “who used it first, on
            what?” Confusion asks “will buyers think these two come from the
            same shop?”
          </p>
          <p>
            You can lose on any one of those even if you win the others. A
            coined word that looks and sounds like a famous mark is still a
            problem. A weak word that nobody else uses in your class can
            sometimes be filed — and still be a poor brand.
          </p>
        </div>
      </section>

      <section className="stagger-in mt-12" style={{ animationDelay: "100ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          Where Tovra sits
        </h2>
        <div className="mt-4 space-y-4 text-pretty text-muted">
          <p>
            The converter used to be Lumen, then Lum3n. Those sit low on the
            ladder: a dictionary unit of light, already used by a telecom
            company and photo apps. The 3 did not invent a new word.
          </p>
          <p>
            <span className="text-fg">Tovra</span> is coined — fanciful, not
            a light or photo word. That is the rung that can work as a brand.
            It is still not a clearance. No search, no filing, no ®. Terms
            say the same.
          </p>
        </div>
      </section>

      <section className="stagger-in mt-12" style={{ animationDelay: "120ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          Four stories that are not the rule
        </h2>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {MYTHS.map((item) => (
            <li key={item.title} className="py-5">
              <h3 className="font-medium text-fg">{item.title}</h3>
              <p className="mt-2 text-sm text-pretty text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <p className="stagger-in mt-12 text-sm text-pretty text-subtle">
        Not a clearance. A real search looks at the register and how the
        name is used in your class and country.{" "}
        <Link
          to="/insurance"
          className="text-muted underline decoration-border underline-offset-4 hover:text-fg"
        >
          Insurance notes
        </Link>{" "}
        are a different stack.
      </p>
    </article>
  );
}
