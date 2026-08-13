import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalDoc, LegalSection } from "@/components/legal-doc";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — SuperSimple-HEIC" },
      {
        name: "description",
        content:
          "Terms of Use for the SuperSimple-HEIC HEIC converter. The tool is provided as-is. Conversion runs on your device.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <LegalDoc
          kicker="Legal"
          title="Terms of Use"
          updated="13 August 2026"
        >
          <LegalSection id="agreement" title="1. Agreement">
            <p>
              These Terms of Use (“Terms”) are a binding agreement between you
              and the operator of the SuperSimple-HEIC website and browser tool
              (“SuperSimple-HEIC,” “we,” “us”). They cover the converter, educational
              pages, sample files, and any related features (the “Service”).
            </p>
            <p>
              By visiting, using, or downloading output from the Service, you
              agree to these Terms and to the{" "}
              <Link to="/privacy">Privacy Notice</Link>. If you do not agree,
              do not use the Service.
            </p>
            <p>
              If you use SuperSimple-HEIC on behalf of a company or other organization,
              you represent that you have authority to bind that organization,
              and “you” includes that organization.
            </p>
          </LegalSection>

          <LegalSection id="service" title="2. The Service">
            <p>
              SuperSimple-HEIC is a convenience tool that can decode HEIC/HEIF images in
              your browser and export JPEG, PNG, or WebP files. It also
              publishes general-interest explanations of those formats.
            </p>
            <p>
              Conversion is designed to run on your device. We do not operate
              the converter as a file-upload locker, archive, or backup. We do
              not promise that any particular file will convert, look
              identical, keep metadata, preserve Live Photo motion, depth,
              HDR, color profile, orientation, or sequences, or open in any
              given app, printer, or website.
            </p>
            <p>
              The Service is offered when we choose to offer it. We may
              change, suspend, or stop all or part of it at any time, with or
              without notice, including for maintenance, legal, or abuse
              reasons.
            </p>
          </LegalSection>

          <LegalSection id="eligibility" title="3. Eligibility">
            <p>
              You must be old enough to form a binding contract in your
              region (and at least 13). The Service is not directed at
              children. Do not use it if you are prohibited from doing so
              under export, sanctions, or other applicable law.
            </p>
          </LegalSection>

          <LegalSection id="files" title="4. Your files and your responsibility">
            <p>
              You keep whatever rights you already have in files you process.
              You do not transfer ownership of those files to us by using the
              converter.
            </p>
            <p>You represent and warrant that:</p>
            <ul>
              <li>
                you have all rights, licenses, and permissions needed to
                process the files and to create and use the output;
              </li>
              <li>
                the files and your use of the Service do not infringe
                copyright, trademark, privacy, publicity, or other rights, and
                do not violate any law;
              </li>
              <li>
                you will not use the Service to create, hide, or distribute
                illegal, exploitative, or non-consensual imagery, or to
                interfere with investigations or evidence.
              </li>
            </ul>
            <p>
              You are solely responsible for keeping originals and backups.
              Output files can be larger, smaller, lower quality, or
              incomplete. We are not liable for lost photos, spoiled prints,
              missed deadlines, or any downstream use of a converted file.
            </p>
          </LegalSection>

          <LegalSection id="acceptable-use" title="5. Acceptable use">
            <p>You will not:</p>
            <ul>
              <li>
                use the Service for any unlawful purpose, or to process
                content you are not allowed to copy or convert;
              </li>
              <li>
                attempt to probe, scan, reverse engineer, or disrupt the
                Service, its hosts, or other users, except as allowed by
                mandatory law;
              </li>
              <li>
                bypass technical limits, overload the site, or use automated
                scraping in a way that harms the Service;
              </li>
              <li>
                misrepresent the Service as a professional lab, forensic tool,
                medical device, or official document service;
              </li>
              <li>
                remove notices from our pages or present our educational
                content as legal, photographic, or archival advice.
              </li>
            </ul>
          </LegalSection>

          <LegalSection id="accounts" title="6. No accounts">
            <p>
              Conversion does not require an account. The Service does not
              offer sign-in. There is no user profile or stored photo library
              on our servers.
            </p>
          </LegalSection>

          <LegalSection id="ip" title="7. Our intellectual property">
            <p>
              SuperSimple-HEIC is an unregistered trade name we use as a badge. We do
              not claim a registered trademark, and we do not represent that
              the name has been searched or cleared. The name, design, text,
              sample files we provide, and software we publish as part of the
              site are owned by us or our licensors to the extent the law
              allows. We grant you a limited, revocable, non-exclusive,
              non-transferable license to use the Service for your own lawful
              conversion and reading, not to copy the site, resell it, or
              build a competing service from our pages.
            </p>
            <p>
              Feedback you send may be used by us without obligation to you.
            </p>
          </LegalSection>

          <LegalSection id="third-parties" title="8. Third-party software and patents">
            <p>
              Decoding and encoding rely on third-party libraries, codecs, and
              your browser. HEIF, HEVC, JPEG, PNG, WebP, and related
              technologies may be subject to patents and licenses we do not
              control. We do not grant you any patent license. You are
              responsible for any rights needed for your particular use,
              especially commercial redistribution of encoded media.
            </p>
            <p>
              Third-party sites, browsers, operating systems, and identity
              providers are not our responsibility. Their failures,
              licenses, or terms are between you and them.
            </p>
          </LegalSection>

          <LegalSection id="education" title="9. Educational pages">
            <p>
              Articles about HEIC, file size, JPEG quality, and artifacts are
              general information for a lay audience. They are not
              professional photography, conservation, legal, or engineering
              advice. Examples are illustrative. Measurements run in your
              browser and will differ from other tools and files.
            </p>
          </LegalSection>

          <LegalSection id="warranty" title="10. No warranty">
            <p>
              THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE
              FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES,
              EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, QUIET ENJOYMENT,
              AND ACCURACY.
            </p>
            <p>We do not warrant that:</p>
            <ul>
              <li>conversion will succeed, be lossless, or match the original;</li>
              <li>colors, HDR, metadata, or multi-image files will survive;</li>
              <li>the Service will be uninterrupted, secure, or error-free;</li>
              <li>
                defects will be corrected, or that the site is free of
                harmful components introduced by your environment or the
                network.
              </li>
            </ul>
            <p>
              Some places do not allow certain warranty disclaimers. In those
              places, we disclaim warranties only to the maximum extent
              allowed, and any required warranty is limited to 30 days or the
              shortest period the law permits.
            </p>
          </LegalSection>

          <LegalSection id="liability" title="11. Limitation of liability">
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, WE AND OUR OPERATORS,
              AFFILIATES, LICENSORS, AND SUPPLIERS WILL NOT BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR
              PUNITIVE DAMAGES, OR FOR LOST PROFITS, LOST DATA, LOST PHOTOS,
              SUBSTITUTE SERVICES, PRINT OR PUBLISHING COSTS, REPUTATIONAL
              HARM, OR BUSINESS INTERRUPTION, EVEN IF ADVISED OF THE
              POSSIBILITY.
            </p>
            <p>
              OUR TOTAL LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE WILL
              NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US FOR THE
              SERVICE IN THE 12 MONTHS BEFORE THE CLAIM, OR (B) TEN US
              DOLLARS (US $10). IF YOU PAID NOTHING, OUR LIABILITY IS LIMITED
              TO US $10 OR THE MINIMUM THE LAW ALLOWS, WHICHEVER IS HIGHER
              ONLY WHERE A ZERO CAP IS UNENFORCEABLE.
            </p>
            <p>
              These limits are a fundamental part of the bargain. The Service
              would not be offered on the same terms without them. They apply
              to contract, tort, negligence, strict liability, and any other
              theory, to the extent the law allows.
            </p>
          </LegalSection>

          <LegalSection id="indemnity" title="12. Indemnity">
            <p>
              You will defend, indemnify, and hold harmless SuperSimple-HEIC and its
              operators, affiliates, and licensors from any claim, demand,
              loss, or expense (including reasonable legal fees) arising out
              of: your files or output; your use of the Service; your
              violation of these Terms or of anyone’s rights; or your
              violation of law. We may assume exclusive defense of any matter
              at your expense, and you will cooperate.
            </p>
          </LegalSection>

          <LegalSection id="privacy" title="13. Privacy">
            <p>
              How information is handled is described in the{" "}
              <Link to="/privacy">Privacy Notice</Link>. Conversion is
              designed so image bytes stay on your device. Hosting and
              security tools may still process ordinary technical data such
              as IP address.
            </p>
          </LegalSection>

          <LegalSection id="changes" title="14. Changes">
            <p>
              We may update these Terms. The “Effective” date at the top will
              change. Continued use after an update is acceptance of the
              revised Terms. If you do not agree, stop using the Service.
            </p>
          </LegalSection>

          <LegalSection id="termination" title="15. Termination">
            <p>
              You may stop using the Service at any time. We may refuse or
              terminate access if we believe these Terms were violated, if
              required by law, or if we discontinue the Service. Sections that
              by nature should survive (including 4, 7–12, 16, and 18) will
              survive.
            </p>
          </LegalSection>

          <LegalSection id="law" title="16. Law and disputes">
            <p>
              These Terms are governed by the laws of the jurisdiction in
              which the operator of SuperSimple-HEIC maintains its principal place of
              business, without regard to conflict-of-law rules, except that
              the Federal Arbitration Act may apply to arbitration if the
              parties later agree in writing to arbitrate.
            </p>
            <p>
              Courts located in that jurisdiction will have exclusive venue,
              except that we may seek injunctive relief in any forum for
              misuse of the Service or infringement of intellectual property.
              You and we waive class actions to the extent the law allows.
              Nothing here limits non-waivable consumer protections of your
              home country or state.
            </p>
          </LegalSection>

          <LegalSection id="insurance" title="17. Insurance is separate">
            <p>
              These Terms allocate risk between you and us. They are not an
              insurance policy and do not promise that we carry any particular
              coverage. A short, general map of tech E&O, cyber, and media
              liability is on the{" "}
              <Link to="/insurance">digital liability insurance</Link> page.
              That page is information, not a quote.
            </p>
          </LegalSection>

          <LegalSection id="general" title="18. General">
            <p>
              These Terms and the Privacy Notice are the entire agreement
              about the Service. They supersede prior understandings. If a
              court finds a part unenforceable, the rest stays in effect. Our
              failure to enforce a provision is not a waiver. You may not
              assign these Terms without our consent; we may assign them in
              connection with a reorganization or transfer of the Service.
              Headings are for convenience only. “Including” means “including
              without limitation.”
            </p>
            <p>
              These Terms do not create a partnership, employment, or
              professional-services relationship. We are not your photographer,
              archivist, lawyer, or expert witness.
            </p>
          </LegalSection>
        </LegalDoc>
      </main>
      <SiteFooter />
    </div>
  );
}
