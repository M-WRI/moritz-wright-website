import { BigTitle } from "@/components/site/BigTitle";
import { about, approach, positioning, site } from "@/lib/content";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: positioning,
};

export default function AboutPage() {
  return (
    <div className="pb-28">
      <BigTitle as="h1">about</BigTitle>
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <p data-reveal className="text-sm lowercase text-muted">
          {site.shortTitle}
        </p>
        <div className="mt-10 space-y-5 text-base leading-relaxed text-muted md:text-lg">
          {about.body.map((paragraph) => (
            <p key={paragraph} data-reveal>
              {paragraph}
            </p>
          ))}
        </div>
        <section className="mt-20">
          <h2 data-reveal className="text-2xl tracking-[-0.03em]">
            {approach.title}
          </h2>
          <dl className="mt-8 grid gap-8">
            {approach.items.map((item) => (
              <div key={item.title} data-reveal>
                <dt>{item.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <p data-reveal className="mt-16 text-sm">
          <Link href="/contact">work with me</Link>
          <span className="text-muted"> · </span>
          <Link href="/">view work</Link>
        </p>
      </div>
    </div>
  );
}
