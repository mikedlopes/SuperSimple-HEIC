import { createFileRoute } from "@tanstack/react-router";
import { JpegArtifacts } from "@/components/jpeg-artifacts";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/jpeg-artifacts")({
  head: () => ({
    meta: [
      { title: "JPEG artifacts — Tovra" },
      {
        name: "description",
        content:
          "A plain-language guide to JPEG artifacts: blocking, banding, mosquito noise, and why they do not go away.",
      },
    ],
  }),
  component: ArtifactsPage,
});

function ArtifactsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <JpegArtifacts />
      </main>
      <SiteFooter note="Examples are encoded in your browser from the sample photo." />
    </div>
  );
}
