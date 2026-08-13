import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalDoc, LegalSection } from "@/components/legal-doc";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Notice — Tovra" },
      {
        name: "description",
        content:
          "Tovra converts HEIC files in your browser. Photos are not uploaded for conversion.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <LegalDoc
          kicker="Legal"
          title="Privacy Notice"
          updated="13 August 2026"
        >
          <LegalSection id="summary" title="In short">
            <p>
              Tovra is built so conversion happens on your device. We do not
              ask you to upload HEIC, HEIF, JPEG, PNG, or WebP files to our
              servers in order to convert them, and we do not operate a photo
              library of your pictures.
            </p>
            <p>
              Hosting the website and stopping abuse can still involve
              ordinary technical data. This notice explains that. It is not
              a contract for legal advice. Use of Tovra is also governed by
              the <Link to="/terms">Terms of Use</Link>.
            </p>
          </LegalSection>

          <LegalSection id="conversion" title="Conversion stays on the device">
            <p>
              When you drop or choose a photo, the file is read by scripts
              running in your browser. Decoding and export are designed to
              happen locally. Converted downloads are generated on your
              device. We do not receive those image bytes as part of the
              conversion pipeline, and we cannot retrieve a photo you
              converted.
            </p>
            <p>
              If you leave the page, close the tab, or clear site data, queued
              work and in-memory previews on that device are gone. We do not
              keep a server-side copy to restore them.
            </p>
          </LegalSection>

          <LegalSection id="technical" title="Technical data we may process">
            <p>
              Any website produces some operational data. Depending on how you
              reach Tovra, our hosts, content networks, security tools, or
              platform provider may automatically process:
            </p>
            <ul>
              <li>IP address, approximate location derived from it, and time;</li>
              <li>browser type, device type, and language;</li>
              <li>pages requested, referrers, and error logs;</li>
              <li>basic abuse-prevention and uptime signals.</li>
            </ul>
            <p>
              We use this to run, secure, and understand the Service — not to
              reconstruct your photos. Retention follows the logs of those
              providers, typically a short operational window unless a
              security or legal matter requires longer.
            </p>
          </LegalSection>

          <LegalSection id="accounts" title="No accounts">
            <p>
              The Service does not offer sign-in. We do not keep a user
              profile or a photo library for you.
            </p>
          </LegalSection>

          <LegalSection id="cookies" title="Cookies and local storage">
            <p>
              The site may use cookies or local storage for preferences or
              basic function. You can block or clear them in your browser.
            </p>
          </LegalSection>

          <LegalSection id="sharing" title="Sharing">
            <p>
              We do not sell your photos. We do not have them from conversion.
              We may share technical data with vendors who host or secure the
              site, with professional advisors, or if required by law, legal
              process, or to protect the Service and other people.
            </p>
          </LegalSection>

          <LegalSection id="children" title="Children">
            <p>
              The Service is not directed at children under 13 (or a higher
              age required where you live). We do not knowingly collect
              personal information from them.
            </p>
          </LegalSection>

          <LegalSection id="rights" title="Your choices">
            <p>
              You can stop using the Service and clear browser data. Where
              data-protection law gives you access, correction, deletion, or
              objection rights for personal data we actually hold, we will
              honor those requests as required.
            </p>
          </LegalSection>

          <LegalSection id="changes" title="Changes">
            <p>
              We may update this notice. The effective date will change.
              Continued use after an update means you have read the revised
              notice.
            </p>
          </LegalSection>
        </LegalDoc>
      </main>
      <SiteFooter />
    </div>
  );
}
