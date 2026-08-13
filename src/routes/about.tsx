import { createFileRoute } from "@tanstack/react-router";
import { AboutHeic } from "@/components/about-heic";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Learn — Tovra" },
      {
        name: "description",
        content:
          "A plain-language guide to HEIC photos: what they are, who made them, why iPhones use them, and when to convert.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <AboutHeic />
      </main>
      <SiteFooter />
    </div>
  );
}