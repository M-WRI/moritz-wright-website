import { ContactForm } from "@/components/contact/ContactForm";
import { contact, site } from "@/lib/content";

export function ContactPageContent() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4.5rem)] flex-col border border-black bg-surface-dark text-surface-dark-fg md:min-h-[calc(100dvh-5rem)]">
      <div className="relative grid min-h-[calc(100dvh-4.5rem)] flex-1 lg:grid-cols-2 lg:items-stretch md:min-h-[calc(100dvh-5rem)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-surface-dark-fg/15 lg:block"
        />
        <div className="flex h-full min-h-full flex-col border-b border-surface-dark-fg/15 px-5 pt-10 pb-[calc(7rem+var(--footer-reveal,5rem))] md:px-8 md:pt-12 md:pb-[calc(8rem+var(--footer-reveal,5rem))] lg:min-h-[calc(100dvh-5rem)] lg:border-b-0 lg:pt-14 lg:pb-[calc(3.5rem+var(--footer-reveal,5rem))]">
          <h1 className="display-contact shrink-0">
            {contact.lines.map((line, index) =>
              index === contact.lines.length - 1 ? (
                <span key={line} className="block">
                  {line}
                  <span>.</span>
                </span>
              ) : (
                <span key={line} className="block">
                  {line}
                </span>
              ),
            )}
          </h1>

          <div className="mt-10 flex max-w-xl flex-col gap-8 lg:mt-auto lg:pb-36">
            <p className="meta text-[0.75rem] leading-relaxed text-surface-dark-fg/70">
              {contact.body}
            </p>
            <p className="meta text-surface-dark-fg/50">{site.location}</p>
          </div>
        </div>

        <div className="flex h-full min-h-full flex-col justify-end px-5 pt-10 pb-[calc(2.5rem+var(--footer-reveal,5rem))] md:px-8 md:pt-12 md:pb-[calc(3rem+var(--footer-reveal,5rem))] lg:min-h-[calc(100dvh-5rem)] lg:pt-14 lg:pb-[calc(3.5rem+var(--footer-reveal,5rem))]">
          <ContactForm className="flex w-full flex-col lg:pb-24" />
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--footer-reveal,5rem)+0.75rem)] z-30 px-5 md:px-8 lg:pointer-events-auto lg:absolute lg:bottom-10 lg:left-0 lg:w-1/2 lg:px-8">
        <div className="pointer-events-auto flex max-w-xl flex-wrap gap-3 bg-surface-dark py-2">
          <a href={`mailto:${site.email}`} className="btn btn-primary">
            Send Email
            <span aria-hidden>↗</span>
          </a>
          <a
            href={site.socials.github}
            target="_blank"
            rel="noreferrer"
            className="btn border border-surface-dark-fg/30 bg-transparent text-surface-dark-fg hover:border-surface-dark-fg hover:bg-surface-dark-fg hover:text-surface-dark"
          >
            GitHub
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
