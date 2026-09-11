import { contact, site } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.body,
};

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-border px-5 py-10 md:px-8 md:py-14">
        <p className="meta text-muted">Contact</p>
        <h1 className="display-section mt-4 max-w-4xl">{contact.title}</h1>
        <p
          data-reveal
          className="meta mt-8 max-w-xl text-[0.8rem] leading-relaxed text-muted"
        >
          {contact.body}
        </p>
      </section>

      <section className="grid border-b border-border md:grid-cols-2">
        <div className="border-b border-border px-5 py-10 md:border-b-0 md:border-r md:px-8 md:py-14">
          <p className="meta text-muted">/ Email</p>
          <a
            data-reveal
            href={`mailto:${site.email}`}
            className="mt-6 block font-display text-2xl uppercase tracking-[-0.03em] hover:text-accent md:text-3xl"
          >
            {site.email}
          </a>
        </div>
        <div className="px-5 py-10 md:px-8 md:py-14">
          <p className="meta text-muted">/ Elsewhere</p>
          <div data-reveal className="mt-6 space-y-3">
            {site.socials.github ? (
              <a
                href={site.socials.github}
                rel="noreferrer"
                target="_blank"
                className="meta block hover:text-accent"
              >
                GitHub ↗
              </a>
            ) : (
              <p className="meta text-muted">GitHub — coming soon</p>
            )}
            {site.socials.linkedin ? (
              <a
                href={site.socials.linkedin}
                rel="noreferrer"
                target="_blank"
                className="meta block hover:text-accent"
              >
                LinkedIn ↗
              </a>
            ) : (
              <p className="meta text-muted">LinkedIn — coming soon</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
