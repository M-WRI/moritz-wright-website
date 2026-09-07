import { BigTitle } from "@/components/site/BigTitle";
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
    <div className="pb-28">
      <BigTitle as="h1">services</BigTitle>
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <p data-reveal className="max-w-xl text-base leading-relaxed text-muted">
          {services.intro}
        </p>
        <div className="mt-16 grid gap-x-16 gap-y-14 sm:grid-cols-2">
          {services.items.map((item, index) => (
            <article key={item.slug} data-reveal>
              <p className="text-[11px] lowercase text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 text-3xl tracking-[-0.04em]">{item.title}</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
        <p data-reveal className="mt-16 text-sm text-muted">
          <Link href="/contact" className="text-foreground">
            start a conversation
          </Link>
        </p>
      </div>
    </div>
  );
}
