import { LegalPage, LegalSection } from "@/components/site/LegalPage";
import { site } from "@/lib/content";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${site.legalName} — how personal data is handled on this website under the GDPR.`,
  robots: { index: true, follow: true },
};

const UPDATED = "12 September 2026";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage kicker="Legal" title="Privacy Policy" updated={UPDATED}>
      <LegalSection title="1. Who is responsible">
        <p>
          The controller of personal data processed via this website is{" "}
          <strong className="text-foreground">{site.legalName}</strong>{" "}
          (“I”, “me”, “my”), a natural person based in {site.location},{" "}
          {site.country}.
        </p>
        <p>
          Contact for privacy requests:{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </LegalSection>

      <LegalSection title="2. Scope">
        <p>
          This Privacy Policy explains how I process personal data when you visit{" "}
          <a href={site.url}>{site.url}</a>, contact me by email, or otherwise
          interact with this personal portfolio website. It is intended to meet
          the requirements of the EU General Data Protection Regulation (GDPR /
          Regulation (EU) 2016/679) and, where applicable, the German Federal
          Data Protection Act (BDSG).
        </p>
      </LegalSection>

      <LegalSection title="3. What data I process">
        <p>Depending on how you use the site, I may process:</p>
        <ul>
          <li>
            <strong className="text-foreground">Server / access logs</strong> —
            IP address, date and time, requested URL, referrer, user agent, and
            similar technical data that hosting providers typically collect to
            deliver and secure the website.
          </li>
          <li>
            <strong className="text-foreground">Contact data</strong> — if you
            email me (for example at {site.email}), the content of your message
            and your email address, plus any other details you choose to include.
          </li>
          <li>
            <strong className="text-foreground">Usage analytics</strong> —
            aggregated page-view and performance metrics via Vercel Analytics
            and Vercel Speed Insights (typically without cookies).
          </li>
        </ul>
        <p>
          This website does not currently use a contact form, newsletters, user
          accounts, payment processing, or advertising trackers.
        </p>
      </LegalSection>

      <LegalSection title="4. Purposes and legal bases">
        <ul>
          <li>
            <strong className="text-foreground">
              Providing and securing the website
            </strong>{" "}
            (Art. 6(1)(f) GDPR — legitimate interests: operating a secure,
            reliable portfolio site).
          </li>
          <li>
            <strong className="text-foreground">
              Responding to enquiries
            </strong>{" "}
            (Art. 6(1)(b) GDPR where steps are taken prior to a contract, and/or
            Art. 6(1)(f) GDPR — legitimate interests in answering professional
            requests).
          </li>
          <li>
            <strong className="text-foreground">
              Legal obligations
            </strong>{" "}
            where storage or disclosure is required by law (Art. 6(1)(c) GDPR).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Cookies and similar technologies">
        <p>
          This site aims to operate without advertising cookies or social-media
          tracking pixels. Essential technical storage may be used by the
          hosting or delivery stack solely to provide the service (for example
          load balancing or security).
        </p>
        <p>
          I use <strong className="text-foreground">Vercel Analytics</strong> and{" "}
          <strong className="text-foreground">Vercel Speed Insights</strong> to
          understand aggregated page views, basic usage, and real-world
          performance of the Site. Both are designed to be privacy-friendly and
          typically do not rely on browser cookies for their core metrics. Data
          is processed by Vercel as a processor for the purpose of operating and
          improving this website (Art. 6(1)(f) GDPR — legitimate interests).
        </p>
        <p>
          If additional non-essential tracking is introduced later, this policy
          will be updated and, where required by law, consent will be obtained
          beforehand.
        </p>
      </LegalSection>

      <LegalSection title="6. Recipients and processors">
        <p>
          Personal data may be processed by service providers acting on my
          behalf (processors), in particular hosting and infrastructure
          providers needed to run the website and deliver email. They process
          data only under instructions and appropriate data-processing
          agreements where required.
        </p>
        <p>
          I do not sell personal data. Data is not shared with third parties for
          their own marketing purposes.
        </p>
      </LegalSection>

      <LegalSection title="7. International transfers">
        <p>
          Where processors are located outside the European Economic Area (EEA),
          transfers are carried out only with appropriate safeguards under
          Chapter V GDPR (for example EU Standard Contractual Clauses), unless
          an adequacy decision applies.
        </p>
      </LegalSection>

      <LegalSection title="8. Retention">
        <ul>
          <li>
            Server logs are typically retained for a short period necessary for
            security and operations (often up to 7–30 days, depending on the
            host), unless a longer period is required to investigate incidents.
          </li>
          <li>
            Email correspondence is retained as long as needed to handle your
            request and for legitimate documentation of professional
            communication, then deleted or archived according to applicable
            retention rules.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="9. Your rights">
        <p>Under the GDPR you may have the right to:</p>
        <ul>
          <li>Access your personal data (Art. 15)</li>
          <li>Rectification (Art. 16)</li>
          <li>Erasure (Art. 17)</li>
          <li>Restriction of processing (Art. 18)</li>
          <li>Data portability (Art. 20)</li>
          <li>Object to processing based on legitimate interests (Art. 21)</li>
          <li>
            Withdraw consent at any time where processing is based on consent
            (Art. 7(3))
          </li>
        </ul>
        <p>
          To exercise these rights, email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>. You also have the
          right to lodge a complaint with a supervisory authority, in particular
          in the EU Member State of your habitual residence, place of work, or
          place of the alleged infringement. In Germany, this may be your local
          Landesdatenschutzbehörde.
        </p>
      </LegalSection>

      <LegalSection title="10. No automated decision-making">
        <p>
          I do not use personal data for automated decision-making or profiling
          that produces legal or similarly significant effects on you (Art. 22
          GDPR).
        </p>
      </LegalSection>

      <LegalSection title="11. Children">
        <p>
          This website is aimed at a professional audience and is not directed
          at children. I do not knowingly collect personal data from children.
        </p>
      </LegalSection>

      <LegalSection title="12. Changes">
        <p>
          I may update this Privacy Policy from time to time. The “Last updated”
          date at the top will change when material updates are published.
        </p>
      </LegalSection>

      <LegalSection title="13. Related documents">
        <p>
          See also the{" "}
          <Link href="/terms">Terms &amp; Conditions</Link> for use of this
          website.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
