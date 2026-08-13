import { createFileRoute } from "@tanstack/react-router";
import { InsuranceGuide } from "@/components/insurance-guide";
import { OperatorNote } from "@/components/operator-note";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/insurance")({
  head: () => ({
    meta: [
      { title: "Digital liability insurance — Tovra" },
      { name: "robots", content: "noindex" },
      {
        name: "description",
        content:
          "A plain-language map of tech E&O, cyber, and media liability for a published web tool. Not insurance advice.",
      },
    ],
  }),
  component: InsurancePage,
});

function InsurancePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-5 pt-6 sm:px-8 sm:pt-10">
          <OperatorNote />
        </div>
        <InsuranceGuide />
      </main>
      <SiteFooter note="This guide is general information, not a quote or a policy." />
    </div>
  );
}
