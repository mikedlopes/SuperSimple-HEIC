import { Link } from "@tanstack/react-router";

const PI_COVERS = [
  {
    title: "Defense costs",
    body: "Lawyers, court fees, and experts when someone alleges a professional mistake — often even if the claim is weak. This is usually the part that matters.",
  },
  {
    title: "Settlements and judgments",
    body: "Covered amounts you become legally obligated to pay for negligence, an error, or a failure to deliver the professional service the policy describes.",
  },
  {
    title: "Vicarious acts",
    body: "Mistakes by employees or, if the form says so, contractors acting for you — not every freelancer automatically.",
  },
  {
    title: "Personal injury in the professional sense",
    body: "Some PI forms include libel, slander, or breach of confidentiality arising from the professional service. Many do not. Read the insuring clause.",
  },
];

const PI_GAPS = [
  {
    title: "Intentional or knowing wrongs",
    body: "Fraud, crime, and deliberate infringement are out. A conversion bug is different from shipping malware on purpose.",
  },
  {
    title: "Pure breach of contract",
    body: "“You promised 99.9% uptime” or “you guaranteed lossless files” can fall outside PI unless the same facts also look like negligence independent of the contract.",
  },
  {
    title: "Your work / making it right",
    body: "The cost to re-convert, refund, or rebuild the product is often excluded. PI pays third-party financial loss, not a warranty program.",
  },
  {
    title: "Bodily injury and property damage",
    body: "A dropped laptop, a fire, a trip-and-fall — those belong on general liability, not PI.",
  },
  {
    title: "Cyber incidents as such",
    body: "Ransomware, notification, and forensic vendors sit on a cyber form unless the PI package explicitly adds them.",
  },
  {
    title: "Patents and much IP",
    body: "Patent suits are commonly excluded. Copyright in software you ship is often excluded too unless you buy an endorsement.",
  },
  {
    title: "Employment claims",
    body: "Hiring, firing, and harassment need EPLI, not professional indemnity.",
  },
  {
    title: "Fines and unpaid invoices",
    body: "Regulatory penalties and a customer who simply will not pay you are not PI’s job.",
  },
];

const FREE_EXCLUSIONS = [
  {
    wording: "Professional services",
    trap: "Defined as work you do for a fee, or only for “clients.” A stranger on a free page may not qualify.",
    ask: "Endorse “software products made available to end users, including at no charge.”",
  },
  {
    wording: "Client / customer",
    trap: "The claimant has to have hired you. No invoice, no client — and the claim is outside the form.",
    ask: "Who is an insured claimant? Does a consumer user count?",
  },
  {
    wording: "Gratuitous or complimentary services",
    trap: "Some forms exclude work done for free, as a favor, or as a demo. “As-is” and “no charge” can be used against you.",
    ask: "Is there a gratuitous-services exclusion? Can it be deleted?",
  },
  {
    wording: "Technology products vs advice",
    trap: "Classic PI covers advice. A browser tool is a product. If the form never mentions products, freeware sits in a hole.",
    ask: "Do you want a tech E&O products form, not a consultants-only PI form?",
  },
  {
    wording: "Open-source / free software",
    trap: "A few tech forms limit claims arising from software you distribute at no charge or under an open-source license.",
    ask: "Does distributing a free web tool trigger a free-software or open-source exclusion?",
  },
  {
    wording: "Beta, evaluation, preview",
    trap: "Unpaid, “try it,” or experimental use is sometimes excluded as if it were a beta.",
    ask: "Is a public free tool treated as a beta or as a released product?",
  },
  {
    wording: "No contract, no duty",
    trap: "The carrier argues there was no professional relationship, so there was nothing to be negligent about — then refuses both indemnity and defense.",
    ask: "Will you defend a consumer claim even if you later deny indemnity?",
  },
  {
    wording: "Your work / making it right",
    trap: "Re-converting files or “we’ll fix it” is not third-party money. Free tools still hit this wall.",
    ask: "Is there any coverage for the cost of making the product perform as offered?",
  },
];

const KINDS = [
  {
    name: "Professional indemnity",
    also: "PI · professional liability · E&O",
    covers:
      "A client or user says your professional work was negligent and they lost money. Defense and (if covered) damages. In the US this is often sold as E&O; in the UK, Ireland, Australia, and New Zealand it is usually called PI.",
    misses:
      "A shop accident, a ransomware bill, a patent war, or a promise you wrote into a contract that goes beyond ordinary professional care. Also: some free-user claims, if “client” means a paying customer.",
  },
  {
    name: "Tech E&O",
    also: "Technology errors & omissions",
    covers:
      "The same idea, written for software: someone claims your product or platform failed, converted badly, or didn’t do what they thought it would, and they lost money.",
    misses:
      "A hacker ransoming your laptop, a customer slipping in your office, or a claim that your blog post defamed them (unless the policy adds media).",
  },
  {
    name: "Cyber",
    also: "First- and third-party cyber",
    covers:
      "A breach, ransomware, or business-email fraud. First-party pays your own cleanup and downtime. Third-party pays if someone else sues because their data leaked.",
    misses:
      "A user who says the converter “ruined” a photo with no security incident. That is usually PI / E&O, not cyber.",
  },
  {
    name: "Media liability",
    also: "Content / advertising injury",
    covers:
      "Lawsuits over words and images you publish: copyright, trademark, defamation, or right of publicity — including educational pages and sample photos.",
    misses:
      "A user uploading someone else’s HEIC. That is their file, not your article. Your terms push that risk to them; insurance may still help with defense costs.",
  },
  {
    name: "General liability",
    also: "CGL",
    covers:
      "Bodily injury and property damage in the physical world — a visitor trips, you damage a rented studio.",
    misses:
      "Almost every digital claim. Do not treat a shop policy as coverage for an app.",
  },
];

const LUMEN_SCENES = [
  {
    title: "“You wrecked my photos”",
    body: "A user converts a wedding roll, hates the JPEG, and claims financial loss. Terms and “as-is” language are your first line. Professional indemnity / tech E&O may pay defense — if a free user counts as a claimant.",
  },
  {
    title: "Copyright in a dropped file",
    body: "Someone converts pictures they do not own. You never hosted the files, but you can still get a letter. Indemnity in the Terms plus media / PI defense coverage is the usual pairing.",
  },
  {
    title: "The site or account is attacked",
    body: "Even a local converter sits on a host. Logs and IPs exist somewhere. Cyber covers incident response; it does not fix a conversion complaint.",
  },
  {
    title: "Something we wrote is wrong",
    body: "The About and Artifacts pages are opinions and demos. If a brand or photographer claims the text or a sample harms them, that is closer to media liability than to PI.",
  },
];

const CYBER_SIDES = [
  {
    name: "First-party",
    body: "Money you spend on your own mess: forensics, lawyers, notification letters, credit monitoring, ransom (if the form allows it), restoring systems, and income you lost while the product was down.",
  },
  {
    name: "Third-party",
    body: "Money because someone else sues or a regulator comes calling: customers whose data leaked, a downstream company that relied on your API, defense costs, and (sometimes) a small regulatory sublimit.",
  },
];

const CYBER_COVERS = [
  {
    title: "Breach response",
    body: "A panel of forensics, counsel, and a call center. For SaaS this is the core: you discover unauthorized access to the tenant database and the clock starts.",
  },
  {
    title: "Ransomware and extortion",
    body: "Negotiation, sometimes the ransom itself, and the rebuild. Many forms now sublimit ransom or require law-enforcement notice. Backups are still cheaper.",
  },
  {
    title: "Business interruption",
    body: "Lost subscription revenue and extra expense after a covered outage. Waiting periods (8–24 hours) are normal. A five-minute blip will not pay.",
  },
  {
    title: "Dependent / contingent BI",
    body: "Your cloud, DNS, or payments vendor goes down. This is the SaaS-shaped extension. It is often sublimited and excludes a hyperscaler-wide event.",
  },
  {
    title: "Social engineering and funds transfer",
    body: "Someone tricks your finance person into wiring money, or tricks you into changing a customer’s payout account. Tight sublimits. Not the same as a ‘hack.’",
  },
  {
    title: "Media and privacy on the platform",
    body: "Some cyber packages tuck in multimedia or privacy liability for content you host. Do not assume it replaces a media form for articles you wrote.",
  },
  {
    title: "System failure (non-malicious)",
    body: "A bad deploy takes production down with no attacker. Not every cyber form includes this; many only pay after a security event.",
  },
  {
    title: "Regulatory defense",
    body: "GDPR, CCPA, and similar investigations. Fines are often excluded or tiny. Defense and notification are the realistic parts.",
  },
];

const SAAS_NOTES = [
  {
    title: "Customer data in your cloud",
    body: "Classic SaaS: photos, documents, and PII live on your servers. That is the exposure cyber is built for. A local-only converter is a much smaller story — host logs still count.",
  },
  {
    title: "Multi-tenant blast radius",
    body: "One bug or one stolen key can touch every customer. Insurers will ask about isolation, encryption at rest, SSO, and who can dump a tenant.",
  },
  {
    title: "Availability is a product feature",
    body: "SaaS SLAs turn downtime into a contract claim (E&O) and a revenue claim (cyber BI). Read both forms so a bad deploy is not ‘nobody’s policy.’",
  },
  {
    title: "Your vendors are your perimeter",
    body: "Auth, hosting, email, analytics, and object storage all hold something. Ask about contingent BI and whether a processor breach is first- or third-party.",
  },
];

const SPECIFIC_EXCLUSIONS = [
  {
    name: "Dishonest or intentional acts",
    form: "Almost every PI / E&O / cyber form",
    meaning:
      "Fraud, crime, and knowing violations are out. A coding mistake is not the same as shipping something you knew was illegal.",
    forUs:
      "A genuine conversion bug can still be a covered allegation. Cooking metadata to hide evidence would not.",
    example:
      "You quietly strip GPS so a user cannot prove where a photo was taken. A later lawsuit calls that concealment. The dishonest-acts exclusion ends the claim — even if the rest of the converter was fine.",
  },
  {
    name: "Prior known circumstances",
    form: "Claims-made PI and cyber",
    meaning:
      "If you already knew about a problem before the policy started and did not tell the insurer, that claim is out. The retroactive date cuts off older work.",
    forUs:
      "Disclose known converter failures when you apply. A bug you blogged about last year can be a ‘known circumstance.’",
    example:
      "In March you tweet that pink HEICs come out green. In June you bind a PI policy and leave that out of the application. In July a florist sues over green bouquets. The carrier points at the tweet and the prior-knowledge clause.",
  },
  {
    name: "Contractual liability / assumed liability",
    form: "PI and tech E&O",
    meaning:
      "Liability you pick up only because a contract said so — a broad indemnity, a lossless guarantee — is often excluded unless you would have been liable anyway in negligence.",
    forUs:
      "Do not promise ‘any file, perfectly’ in marketing. The Terms already refuse that. Keep the site and the policy telling the same story.",
    example:
      "A studio’s purchase order says you ‘indemnify us for any loss from failed conversions.’ JPEGs look soft; they demand $40,000. The extra indemnity is contractual liability the PI form never agreed to pick up.",
  },
  {
    name: "Your work / your product / making good",
    form: "PI and tech E&O",
    meaning:
      "The insurer will not pay you to redo the job, refund the fee, or patch the product. They may pay a third party’s financial loss from the mistake.",
    forUs:
      "Re-exporting someone’s album or building a ‘fix it’ button is on you. A studio’s reprint bill might be a third-party loss — if a free user even qualifies.",
    example:
      "Two thousand files convert with a pink cast. The user wants you to hire staff and re-export the set by Monday. That labor is ‘making good your work.’ A print shop’s $8,000 reprint invoice to a third party is the kind of loss PI is meant to talk about.",
  },
  {
    name: "Warranties and performance guarantees",
    form: "Tech E&O",
    meaning:
      "Express warranties, uptime SLAs, and ‘will meet this spec’ promises are frequently carved out unless they track ordinary professional care.",
    forUs:
      "‘Lossless,’ ‘print ready,’ or ‘identical to the iPhone’ are warranty-shaped words. Avoid them.",
    example:
      "The homepage says ‘Print-ready JPEGs, identical to the original.’ A lab rejects the files. The claim is framed as breach of that promise. The warranty exclusion lets the carrier step back.",
  },
  {
    name: "Delay in delivery or failure to supply",
    form: "Some tech E&O forms",
    meaning:
      "Late delivery of a product or service is excluded on a surprising number of older tech forms.",
    forUs:
      "Less relevant to a page that converts in the browser — unless you sold a ‘we’ll convert your archive by Friday’ service.",
    example:
      "You take a paid ‘weekend archive’ job and miss Monday. The client claims a campaign launch slipped. An older tech E&O form with a delay exclusion can drop that entire file.",
  },
  {
    name: "Intellectual property — patents",
    form: "PI, tech E&O, and many media forms",
    meaning:
      "Patent infringement is the exclusion that almost never comes out. Separate patent insurance is rare and expensive.",
    forUs:
      "HEVC / HEIF sit in a thicket of patents. This tool does not grant you a license, and a PI policy will not either.",
    example:
      "A patent pool sends a letter: your site decodes HEVC without a license. Defense quotes start in the hundreds of thousands. The IP-patent exclusion is why PI will not take that letter.",
  },
  {
    name: "Intellectual property — copyright and trade secret",
    form: "Often excluded on PI; sometimes bought back on media or tech",
    meaning:
      "Claims that your code or content copies someone else. User files are a different question and may be treated as user-generated content.",
    forUs:
      "Ask whether libheif / third-party codecs and the sample photo are in or out. Ask separately about files the user drops.",
    example:
      "A photographer says the autumn sample on the Size page is their unpublished frame. That is a media / copyright claim about content you published — not a user-drop claim, and not automatically inside PI.",
  },
  {
    name: "Infrastructure / utilities / cloud failure",
    form: "Cyber and some tech E&O",
    meaning:
      "The public internet, power grid, or a major cloud going down is often excluded or sublimited as a catastrophe you do not control.",
    forUs:
      "If the host is dark, that is usually not a PI event. It may also be outside cyber if it is a provider-wide outage.",
    example:
      "A hyperscaler region fails for six hours. Paying SaaS customers demand credits and lost-sales damages. Dependent-BI may be sublimited; a ‘failure of infrastructure’ exclusion can zero it out.",
  },
  {
    name: "Unauthorized access / security failure",
    form: "Often pushed off PI onto cyber — or excluded on both if you failed a ‘minimum security’ warranty",
    meaning:
      "A breach is not ‘professional negligence’ on many PI forms. Cyber then asks whether you kept basic controls.",
    forUs:
      "Conversion is local, but the site is still hosted. Do not assume PI will pick up a leaked access log.",
    example:
      "An auth vendor is breached. Emails and display names leak. Users sue you. PI says ‘this is a security event, not professional negligence.’ Cyber then asks whether MFA was on. If it was not, both forms may stall.",
  },
  {
    name: "Unencrypted devices and portable media",
    form: "Cyber",
    meaning:
      "A lost laptop or USB with unencrypted personal data is a classic cyber exclusion or condition.",
    forUs:
      "You are not meant to hold user photos. If an admin laptop has account exports, encrypt it.",
    example:
      "A laptop with a CSV of signed-in emails is stolen from a car. The drive was not encrypted. The cyber form’s portable-media condition is a coverage defense.",
  },
  {
    name: "Fines, penalties, and multiplied damages",
    form: "Most liability forms",
    meaning:
      "Government fines and punitive damages are widely excluded or only covered where the law forces the insurer to pay.",
    forUs:
      "A privacy regulator’s penalty is not what PI is for. Some cyber forms give a small ‘regulatory’ sublimit — read it.",
    example:
      "A regulator fines you $50,000 for a notice failure. Defense counsel may be covered under a regulatory sublimit. The fine itself is usually excluded.",
  },
  {
    name: "Insured versus insured",
    form: "PI, D&O, some cyber",
    meaning:
      "One insured suing another (co-founder, subsidiary) is out.",
    forUs:
      "If two operators of the same project fall out, this form will not referee it.",
    example:
      "One co-founder sues the other for diverting the Tovra domain. Both are named insureds. Insured-versus-insured ends that file on day one.",
  },
  {
    name: "Bodily injury and tangible property",
    form: "PI (excluded) — that is CGL’s job",
    meaning:
      "Physical harm and smashed hardware are not professional indemnity. Electronic data is sometimes defined as not ‘property.’",
    forUs:
      "A bad JPEG is not bodily injury. A user who claims eye strain or a ruined print as ‘property damage’ will still be a stretch.",
    example:
      "A user says a corrupted export crashed their laptop and ‘destroyed’ an SD card. PI will call that property damage and point at CGL — which then says electronic data is not tangible property.",
  },
  {
    name: "Employment practices",
    form: "PI and cyber",
    meaning:
      "Hiring, firing, harassment, and wage claims need a separate EPLI policy.",
    forUs:
      "Irrelevant until you have staff. Then it is not optional.",
    example:
      "A contractor claims they were fired after flagging a converter bug. That is an employment claim. PI and cyber both send it to EPLI, which you do not have yet.",
  },
  {
    name: "War, nation-state, and infrastructure cyber",
    form: "Cyber (heavily negotiated since 2022)",
    meaning:
      "Hostile-state attacks and warlike cyber operations are excluded or tightly defined. Wording varies a lot.",
    forUs:
      "A random ransomware crew is the usual cyber claim. A named state campaign may not be.",
    example:
      "A government-linked group encrypts the host and leaks account emails. The war / nation-state cyber exclusion — wording that tightened after 2022 — is the first thing the carrier reads.",
  },
];

const QUESTIONS = [
  "If we store customer data in our cloud, is breach response first-party and lawsuits third-party on the same form?",
  "Is business interruption and dependent (cloud vendor) interruption included — and what is the waiting period?",
  "Does a gratuitous-services or free-software exclusion apply to this tool?",
  "Is patent and software-copyright infringement excluded, or bought back?",
  "Is there a prior-known-circumstances or retroactive-date gap?",
  "Is this a claims-made form, and what is the retroactive date?",
  "Will you defend a consumer user, or only paying ‘clients’?",
  "Does this policy treat a free browser tool as a ‘professional service’?",
  "Are claims about conversion quality, color, or lost metadata excluded as ‘your work’?",
  "Is user-generated content (files they drop) in or out?",
  "Do you need both PI / tech E&O and a separate cyber form, or is it packaged?",
  "Is media / IP included, or an endorsement?",
  "What is the retention (deductible) for defense costs — and do they start from dollar one?",
  "Are you covered worldwide, or only in one country?",
  "Does open-source / third-party codec use (libheif, HEVC) create an IP exclusion?",
];

export function InsuranceGuide() {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 pb-16 pt-6 sm:px-8 sm:pt-10">
      <header className="stagger-in max-w-xl">
        <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          For operators
        </p>
        <h1 className="mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-balance text-fg sm:text-5xl">
          Digital liability insurance, in plain language
        </h1>
        <p className="mt-4 text-base text-pretty text-muted">
          Terms of Use shift risk. Insurance is what you buy for the day a
          claim arrives anyway. This is a map of the usual policies — not an
          offer, a quote, or advice for your company. This page is not linked
          from the product. It is a reading note for people who publish the
          tool.
        </p>
      </header>

      <section className="stagger-in mt-12" style={{ animationDelay: "60ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          There isn’t one product with that name
        </h2>
        <div className="mt-4 space-y-4 text-pretty text-muted">
          <p>
            People say “digital liability insurance” the way they say “car
            insurance.” Brokers mean a stack: professional indemnity (PI),
            technology errors and omissions (tech E&O), cyber, and sometimes
            media liability. A general liability policy for a shop or office
            almost never pays for a website mistake.
          </p>
          <p>
            PI and E&O are the same family. Tech E&O is that family cut for
            software. Cyber is about attacks and data incidents. Media is
            about published content. You often want PI or tech E&O plus
            cyber; you add media if you publish articles, sample photos, or
            ads.
          </p>
        </div>
      </section>

      <section className="stagger-in mt-12" style={{ animationDelay: "80ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          The names you will hear
        </h2>
        <ul className="mt-6 space-y-3">
          {KINDS.map((item) => (
            <li
              key={item.name}
              className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
            >
              <p className="font-medium text-fg">{item.name}</p>
              <p className="mt-0.5 text-xs text-subtle">{item.also}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium tracking-wide text-subtle uppercase">
                    Often covers
                  </p>
                  <p className="mt-1 text-sm text-pretty text-muted">
                    {item.covers}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wide text-subtle uppercase">
                    Often misses
                  </p>
                  <p className="mt-1 text-sm text-pretty text-muted">
                    {item.misses}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="professional-indemnity"
        className="stagger-in mt-12 scroll-mt-8"
        style={{ animationDelay: "90ms" }}
      >
        <h2 className="font-display text-2xl tracking-tight text-fg">
          Review: professional indemnity
        </h2>
        <div className="mt-4 space-y-4 text-pretty text-muted">
          <p>
            Professional indemnity is the older, broader name. Errors &
            omissions is the same idea in American English. Tech E&O is that
            idea cut for software: the “professional service” is the product
            or platform, not only advice from a person.
          </p>
          <p>
            If a broker in London says PI and a broker in Austin says tech
            E&O, ask to see the insuring agreement, not the nickname. What
            matters is whether the form treats a tool like Tovra as a
            professional service, and whether a free consumer user counts as
            a claimant. Those two points are{" "}
            <a
              href="#free-tools"
              className="text-fg underline decoration-border underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-fg"
            >
              the usual free-tool exclusions
            </a>
            .
          </p>
        </div>

        <h3 className="mt-8 font-medium text-fg">What a typical PI form is for</h3>
        <p className="mt-2 text-sm text-pretty text-muted">
          Someone alleges that in performing a professional service you were
          negligent, made an error, or left something out, and they suffered
          a financial loss. The policy is usually written on a{" "}
          <strong className="font-medium text-fg">claims-made</strong> basis:
          the claim must be made and reported while the policy (or an
          extended reporting period) is in force, and the work must have
          happened after the retroactive date.
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {PI_COVERS.map((item) => (
            <li
              key={item.title}
              className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
            >
              <p className="font-medium text-fg">{item.title}</p>
              <p className="mt-2 text-sm text-pretty text-muted">{item.body}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-8 font-medium text-fg">Where PI usually stops</h3>
        <ul className="mt-5 divide-y divide-border border-y border-border">
          {PI_GAPS.map((item) => (
            <li
              key={item.title}
              className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
            >
              <p className="font-medium text-fg">{item.title}</p>
              <p className="text-sm text-pretty text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="free-tools"
        className="stagger-in mt-12 scroll-mt-8"
        style={{ animationDelay: "95ms" }}
      >
        <h2 className="font-display text-2xl tracking-tight text-fg">
          Free-tool exclusions
        </h2>
        <div className="mt-4 space-y-4 text-pretty text-muted">
          <p>
            “It’s free, so nobody can sue” is not how claims work. “It’s
            free, so the policy may not respond” is the real risk. Many PI
            and even some tech E&O forms were written for paid client work. A
            public, no-charge converter can fall through those definitions
            without a heading that says “free tools are excluded.”
          </p>
          <p>
            The hole is often in the dictionary at the back of the policy.
          </p>
        </div>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {FREE_EXCLUSIONS.map((item) => (
            <li key={item.wording} className="py-5">
              <p className="font-medium text-fg">{item.wording}</p>
              <p className="mt-2 text-sm text-pretty text-muted">{item.trap}</p>
              <p className="mt-2 text-sm text-pretty text-fg">Ask: {item.ask}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 space-y-4 text-pretty text-muted">
          <p>
            Being free does not make you safer in court. It can make you
            harder to insure. The <Link to="/terms">Terms</Link> (as-is, keep
            originals, indemnity) still matter — they shrink what a plaintiff
            can claim — but they do not fill a hole in the policy.
          </p>
          <p>
            If you later charge, say so. A paid tier can pull the same
            codebase into “professional services” for those customers and
            leave the free tier in the old gap unless the endorsement covers
            both.
          </p>
        </div>
      </section>

      <section
        id="cyber-saas"
        className="stagger-in mt-12 scroll-mt-8"
        style={{ animationDelay: "100ms" }}
      >
        <h2 className="font-display text-2xl tracking-tight text-fg">
          Cyber liability for SaaS
        </h2>
        <div className="mt-4 space-y-4 text-pretty text-muted">
          <p>
            If the product lives in your cloud and customers keep their work
            there, cyber is not optional garnish. It is the policy that
            answers “someone got into the tenant data” and “we were down for
            two days.” Professional indemnity answers “the software did the
            wrong thing.” Buy both. A combined tech-plus-cyber package is
            common; read it as two insuring agreements, not one blur.
          </p>
          <p>
            Tovra is a thin site: hosted pages, no accounts, conversion in
            the browser. The notes below cover a full multi-tenant product
            first, then what still applies here.
          </p>
        </div>

        <h3 className="mt-8 font-medium text-fg">Two directions of money</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {CYBER_SIDES.map((item) => (
            <li
              key={item.name}
              className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
            >
              <p className="font-medium text-fg">{item.name}</p>
              <p className="mt-2 text-sm text-pretty text-muted">{item.body}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-8 font-medium text-fg">What a SaaS cyber form usually buys</h3>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {CYBER_COVERS.map((item) => (
            <li
              key={item.title}
              className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
            >
              <p className="font-medium text-fg">{item.title}</p>
              <p className="mt-2 text-sm text-pretty text-muted">{item.body}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-8 font-medium text-fg">What underwriters will ask a SaaS shop</h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-pretty text-muted">
          <li>Where does customer data live, and is it encrypted at rest and in transit?</li>
          <li>How are tenants isolated? Can one customer see another?</li>
          <li>MFA for admins, SSO, logging, and who can export a whole tenant.</li>
          <li>Backup frequency, restore tests, and ransomware-resistant copies.</li>
          <li>Vendors: host, auth, email, payments, analytics — and their incident clauses.</li>
          <li>A written incident plan, and whether you have used it.</li>
        </ul>

        <h3 className="mt-8 font-medium text-fg">SaaS-shaped gaps</h3>
        <ul className="mt-5 divide-y divide-border border-y border-border">
          {SAAS_NOTES.map((item) => (
            <li
              key={item.title}
              className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
            >
              <p className="font-medium text-fg">{item.title}</p>
              <p className="text-sm text-pretty text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-pretty text-muted">
          Cyber will not fix a bad conversion, grant a HEVC license, or pay
          a “your work” redo. Those stay on{" "}
          <a
            href="#professional-indemnity"
            className="text-fg underline decoration-border underline-offset-4"
          >
            professional indemnity
          </a>{" "}
          and the{" "}
          <a
            href="#exclusions"
            className="text-fg underline decoration-border underline-offset-4"
          >
            exclusion list
          </a>
          . A full SaaS that stores customer files needs cyber in a way this
          on-device converter does not — until you start keeping photos for
          people.
        </p>
      </section>

      <section className="stagger-in mt-12" style={{ animationDelay: "110ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          Terms and insurance do different jobs
        </h2>
        <div className="mt-4 space-y-4 text-pretty text-muted">
          <p>
            The <Link to="/terms">Terms of Use</Link> say the converter is
            as-is, that users keep originals, and that they indemnify you if
            their files cause a fight. That helps. It does not stop someone
            from filing. It does not pay a lawyer. Some claims (especially
            from consumers in their home country) ignore a US-style waiver.
          </p>
          <p>
            Insurance is the budget for defense and, if you are covered, for
            a settlement. Most small-tech policies are written so the insurer
            defends even a weak lawsuit — that defense is often the valuable
            part.
          </p>
        </div>
      </section>

      <section className="stagger-in mt-12" style={{ animationDelay: "120ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          How this shows up for a tool like Tovra
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {LUMEN_SCENES.map((item) => (
            <li
              key={item.title}
              className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
            >
              <h3 className="font-medium text-fg">{item.title}</h3>
              <p className="mt-2 text-sm text-pretty text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="exclusions"
        className="stagger-in mt-12 scroll-mt-8"
        style={{ animationDelay: "140ms" }}
      >
        <h2 className="font-display text-2xl tracking-tight text-fg">
          Specific policy exclusions
        </h2>
        <div className="mt-4 space-y-4 text-pretty text-muted">
          <p>
            Exclusions are the clauses that take back coverage the first
            pages appeared to give. They are not always labeled “free tool.”
            They have names. Below are the ones that show up on PI, tech
            E&O, cyber, and media forms — and how each one reads for a
            converter like this.
          </p>
          <p>
            A broker can sometimes delete, sublimit, or buy back an
            exclusion. Assume none of that has happened until you see it on
            the endorsement schedule. The examples are invented fact patterns
            for reading the form — not cases, and not predictions.
          </p>
        </div>
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {SPECIFIC_EXCLUSIONS.map((item) => (
            <li key={item.name} className="py-5">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="font-medium text-fg">{item.name}</h3>
                <p className="text-xs text-subtle sm:text-right">{item.form}</p>
              </div>
              <p className="mt-2 text-sm text-pretty text-muted">{item.meaning}</p>
              <p className="mt-2 text-sm text-pretty text-fg">{item.forUs}</p>
              <p className="mt-3 text-sm text-pretty text-muted">
                <span className="font-medium text-fg">Example. </span>
                {item.example}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-pretty text-muted">
          Also still in play: the{" "}
          <a
            href="#free-tools"
            className="text-fg underline decoration-border underline-offset-4"
          >
            free-tool definition traps
          </a>{" "}
          (professional services, client, gratuitous work). Those may never
          use the word “exclusion.”
        </p>
      </section>

      <section className="stagger-in mt-12" style={{ animationDelay: "160ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          Questions to take to a broker
        </h2>
        <p className="mt-3 text-pretty text-muted">
          Bring a one-pager: local conversion, no photo upload, no charge,
          no accounts, educational articles, sample HEIC. Then ask:
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-pretty text-muted">
          {QUESTIONS.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
        <p className="mt-4 text-pretty text-muted">
          Prices move with revenue, user count, claims history, and whether
          you store personal data. Published “average monthly” figures for
          small tech E&O are only a starting rumor — get quotes.
        </p>
      </section>

      <section className="stagger-in mt-12" style={{ animationDelay: "180ms" }}>
        <h2 className="font-display text-2xl tracking-tight text-fg">
          A sane order of operations
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-pretty text-muted">
          <li>
            Ship clear <Link to="/terms">Terms</Link> and a{" "}
            <Link to="/privacy">Privacy Notice</Link> that match how the tool
            actually works.
          </li>
          <li>Keep conversion on-device so you are not holding a photo archive.</li>
          <li>
            Keep originals-advice in the UI so “you deleted my only copy” is
            harder.
          </li>
          <li>
            Talk to a broker who places professional indemnity or tech E&O
            with cyber; add media if you publish guides. Get the free-tool
            wording in writing.
          </li>
          <li>
            Have counsel read both the policy and the Terms. This page is a
            field guide, not a substitute.
          </li>
        </ol>
      </section>

      <p className="stagger-in mt-12 text-sm text-pretty text-subtle">
        Tovra does not sell insurance and is not your broker or lawyer.
        Coverage depends on the form you buy and the facts of a claim.
      </p>
    </article>
  );
}
