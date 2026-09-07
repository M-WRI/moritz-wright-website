import { BigTitle } from "@/components/site/BigTitle";
import { contact, site } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: contact.body,
};

export default function ContactPage() {
  return (
    <div className="pb-16">
      <BigTitle as="h1">contact</BigTitle>
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <p data-reveal className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {contact.body}
        </p>
        <div data-reveal className="mt-10 space-y-4 text-sm">
          <a href={`mailto:${site.email}`} className="block text-foreground">
            {site.email}
          </a>
          {site.socials.github ? (
            <a href={site.socials.github} rel="noreferrer" target="_blank">
              GitHub
            </a>
          ) : (
            <p className="text-muted">GitHub</p>
          )}
          {site.socials.linkedin ? (
            <a href={site.socials.linkedin} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
          ) : (
            <p className="text-muted">LinkedIn</p>
          )}
        </div>
      </div>
    </div>
  );
}
