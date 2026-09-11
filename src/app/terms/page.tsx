import { LegalPage, LegalSection } from "@/components/site/LegalPage";
import { site } from "@/lib/content";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms & Conditions for using the website of ${site.legalName}.`,
  robots: { index: true, follow: true },
};

const UPDATED = "12 September 2026";

export default function TermsPage() {
  return (
    <LegalPage kicker="Legal" title="Terms & Conditions" updated={UPDATED}>
      <LegalSection title="1. Operator">
        <p>
          This website is operated by{" "}
          <strong className="text-foreground">{site.legalName}</strong>{" "}
          (“I”, “me”, “my”), based in {site.location}, {site.country}.
        </p>
        <p>
          Contact: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </LegalSection>

      <LegalSection title="2. Scope of these terms">
        <p>
          These Terms &amp; Conditions govern access to and use of{" "}
          <a href={site.url}>{site.url}</a> and any content made available on
          it (the “Site”). By using the Site you agree to these terms. If you do
          not agree, please do not use the Site.
        </p>
        <p>
          The Site is a personal portfolio presenting my work, skills, and
          contact details. It is not an online shop and does not by itself form
          a binding service contract.
        </p>
      </LegalSection>

      <LegalSection title="3. Intellectual property">
        <p>
          Unless otherwise stated, all content on the Site — including text,
          design, layout, graphics, logos, photographs, and code samples — is
          owned by me or used under licence. You may view and download content
          for personal, non-commercial information purposes only.
        </p>
        <p>
          You may not copy, modify, distribute, publicly display, or create
          derivative works from Site content for commercial purposes without
          prior written permission, except where mandatory law allows (for
          example quotation rights under German copyright law).
        </p>
        <p>
          Project names, product marks, and third-party trademarks mentioned on
          the Site remain the property of their respective owners.
        </p>
      </LegalSection>

      <LegalSection title="4. Open-source and linked projects">
        <p>
          Some projects linked from the Site (for example open-source software)
          may be governed by their own licences and terms. Those licences apply
          to the respective repositories or products, not to this Site as a
          whole.
        </p>
      </LegalSection>

      <LegalSection title="5. No professional advice">
        <p>
          Content on the Site is provided for general information only. It does
          not constitute legal, financial, or other professional advice, and
          should not be relied upon as such.
        </p>
      </LegalSection>

      <LegalSection title="6. Availability">
        <p>
          I aim to keep the Site available but do not guarantee uninterrupted or
          error-free access. Maintenance, hosting outages, or force majeure may
          temporarily limit availability.
        </p>
      </LegalSection>

      <LegalSection title="7. External links">
        <p>
          The Site may link to third-party websites or resources. I am not
          responsible for their content, availability, or privacy practices.
          Visiting external sites is at your own risk and subject to their
          terms.
        </p>
      </LegalSection>

      <LegalSection title="8. Limitation of liability">
        <p>
          To the extent permitted by applicable law, I am not liable for
          damages arising from the use of — or inability to use — the Site,
          including loss of data or consequential damages, except where liability
          cannot be excluded: in particular for intent, gross negligence, injury
          to life, body or health, or under the German Product Liability Act.
        </p>
        <p>
          Nothing in these terms limits rights that consumers have under
          mandatory EU or German law.
        </p>
      </LegalSection>

      <LegalSection title="9. Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>Misuse the Site or attempt to disrupt its security or operation</li>
          <li>Scrape or harvest data in a way that overloads the service</li>
          <li>
            Use Site content in a misleading way that suggests endorsement or
            affiliation without permission
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="10. Privacy">
        <p>
          Personal data is processed as described in the{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection title="11. Changes">
        <p>
          I may update these Terms &amp; Conditions from time to time. The
          version published on this page with the latest “Last updated” date
          applies. Continued use of the Site after changes constitutes
          acceptance of the updated terms, insofar as permitted by law.
        </p>
      </LegalSection>

      <LegalSection title="12. Governing law and venue">
        <p>
          These terms are governed by the laws of the Federal Republic of
          Germany, excluding conflict-of-law rules and the UN Convention on
          Contracts for the International Sale of Goods (CISG).
        </p>
        <p>
          If you are a consumer resident in the EU, you also benefit from any
          mandatory protections of the law of your country of residence. Where
          legally permitted for business users, courts in Berlin, Germany shall
          have jurisdiction.
        </p>
      </LegalSection>

      <LegalSection title="13. Severability">
        <p>
          If any provision of these terms is held invalid or unenforceable, the
          remaining provisions remain in full force. The invalid provision shall
          be replaced by a valid one that most closely reflects the original
          intent.
        </p>
      </LegalSection>

      <LegalSection title="14. Contact">
        <p>
          Questions about these terms:{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
