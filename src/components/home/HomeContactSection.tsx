import { ContactChannelList } from "@/components/contact/ContactChannelList";
import { contact } from "@/lib/content";
import Link from "next/link";

export function HomeContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-4 border-b border-border bg-surface-dark text-surface-dark-fg"
    >
      <div className="flex items-center justify-between gap-4 border-b border-surface-dark-fg/15 px-5 py-4 md:px-8">
        <p className="meta">02 / Contact</p>
        <Link href="/contact" className="meta hover:text-accent">
          Get in Touch →
        </Link>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-10 border-b border-surface-dark-fg/15 px-5 py-10 md:px-8 md:py-14 lg:border-b-0 lg:border-r">
          <div className="contact-copy max-w-xl">
            <h2 className="display-contact">
              {contact.lines.map((line, index) =>
                index === contact.lines.length - 1 ? (
                  <span key={line} className="block" data-reveal>
                    {line}
                    <span>.</span>
                  </span>
                ) : (
                  <span key={line} className="block" data-reveal>
                    {line}
                  </span>
                ),
              )}
            </h2>
          </div>
          <div className="flex max-w-xl flex-col gap-8">
            <p
              data-reveal
              className="meta text-[0.75rem] leading-relaxed text-surface-dark-fg/70"
            >
              {contact.body}
            </p>
            <div data-reveal>
              <Link href="/contact" className="btn btn-primary w-full sm:w-auto">
                Get in Touch
                <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <ContactChannelList variant="dark" />
        </div>
      </div>
    </section>
  );
}
