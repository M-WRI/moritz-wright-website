import { about, approach } from "@/lib/content";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: about.body[0],
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-border px-5 py-10 md:px-8 md:py-14">
        <p className="meta text-muted">{about.kicker}</p>
        <h1 className="display-section mt-4 max-w-4xl">{about.title}</h1>
      </section>

      <section className="border-b border-border px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-3xl space-y-5">
          {about.body.map((paragraph) => (
            <p
              key={paragraph}
              data-reveal
              className="meta text-[0.8rem] leading-relaxed text-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="border-b border-border">
        <div className="border-b border-border px-5 py-4 md:px-8">
          <p className="meta">/ {approach.title}</p>
        </div>
        <div className="grid sm:grid-cols-2">
          {approach.items.map((item, index) => (
            <article
              key={item.title}
              data-reveal
              className={`border-border px-5 py-8 md:px-8 ${index > 0 ? "border-t sm:border-t-0" : ""} ${index % 2 === 1 ? "sm:border-l" : ""} ${index > 1 ? "border-t" : ""}`}
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
        </div>
      </section>

      <section className="px-5 py-10 md:px-8">
        <p data-reveal className="meta">
          <Link href="/contact" className="hover:text-accent">
            Work With Me ↗
          </Link>
          <span className="text-muted"> / </span>
          <Link href="/projects" className="hover:text-accent">
            View Work
          </Link>
        </p>
      </section>
    </div>
  );
}
