import { createFileRoute } from "@tanstack/react-router";
import { HeicAlgorithm } from "@/components/heic-algorithm";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/how")({
  head: () => ({
    meta: [
      { title: "How HEIC compresses — Tovra" },
      {
        name: "description",
        content:
          "How HEIC and HEVC compress a still image: adaptive tiles, spatial prediction, and entropy coding.",
      },
    ],
  }),
  component: HowPage,
});

function HowPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeicAlgorithm />
      </main>
      <SiteFooter />
    </div>
  );
}
