import { createFileRoute } from "@tanstack/react-router";
import { MarksGuide } from "@/components/marks-guide";
import { OperatorNote } from "@/components/operator-note";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/marks")({
  head: () => ({
    meta: [
      { title: "Trademark distinctiveness — SuperSimple-HEIC" },
      { name: "robots", content: "noindex" },
      {
        name: "description",
        content:
          "Plain-language notes on the trademark spectrum: generic through fanciful, and why a leetspeak graze is not a clearance.",
      },
    ],
  }),
  component: MarksPage,
});

function MarksPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-3xl px-5 pt-6 sm:px-8 sm:pt-10">
          <OperatorNote />
        </div>
        <MarksGuide />
      </main>
      <SiteFooter note="General information, not a trademark opinion." />
    </div>
  );
}
