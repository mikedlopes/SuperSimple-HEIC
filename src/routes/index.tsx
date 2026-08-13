import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/converter";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Converter />
      </main>
      <SiteFooter note="Decodes locally with libheif." />
    </div>
  );
}