import { services } from "@/lib/content";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software, internal tools, AI applications, developer infrastructure, automation, and prototyping.",
};

export default function ServicesPage() {
  return (
    <div>
      <section className="border-b border-border px-5 py-10 md:px-8 md:py-14">
        <p className="meta text-muted">Services</p>
        <h1 className="display-section mt-4 max-w-4xl">{services.title}</h1>
        <p
          data-reveal
          className="meta mt-8 max-w-xl text-[0.8rem] leading-relaxed text-muted"
        >
          {services.intro}
        </p>
      </section>

      <section className="grid border-b border-border sm:grid-cols-2 xl:grid-cols-3">
        {services.items.map((item, index) => (
          <article
            key={item.slug}
            data-reveal
            className="border-b border-border px-5 py-8 last:border-b-0 sm:odd:border-r xl:border-r xl:[&:nth-child(3n)]:border-r-0 md:px-8 xl:[&:nth-last-child(-n+3)]:border-b-0"
          >
            <p className="meta text-muted">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-3 font-display text-2xl uppercase tracking-[-0.03em]">
              {item.title}
            </h2>
            <p className="meta mt-4 max-w-sm text-[0.75rem] leading-relaxed text-muted">
              {item.body}
            </p>
          </article>
        ))}
      </section>

      <section className="px-5 py-10 md:px-8">
        <p data-reveal className="meta">
          <Link href="/contact" className="hover:text-accent">
            Start a Conversation ↗
          </Link>
        </p>
      </section>
    </div>
  );
}
