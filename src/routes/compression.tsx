import { createFileRoute } from "@tanstack/react-router";
import { CompressionExplore } from "@/components/compression-explore";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/compression")({
  head: () => ({
    meta: [
      { title: "HEIC file size — Tovra" },
      {
        name: "description",
        content:
          "See how much smaller a HEIC photo is than JPEG, WebP, or PNG — with a live comparison.",
      },
    ],
  }),
  component: CompressionPage,
});

function CompressionPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <CompressionExplore />
      </main>
      <SiteFooter note="Sizes are measured in your browser from the same photo." />
    </div>
  );
}
