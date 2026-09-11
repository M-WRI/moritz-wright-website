import { site } from "@/lib/content";
import type { ReactNode } from "react";

export function LegalPage({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article>
      <section className="border-b border-border px-5 py-10 md:px-8 md:py-14">
        <p className="meta text-muted">{kicker}</p>
        <h1 className="display-section mt-4 max-w-4xl">{title}</h1>
        <p className="meta mt-6 text-muted">Last updated: {updated}</p>
        <p className="meta mt-2 text-muted">
          Controller: {site.legalName} · {site.email}
        </p>
      </section>
      <div className="legal-prose mx-auto max-w-3xl space-y-8 px-5 py-10 md:px-8 md:py-14">
        {children}
      </div>
    </article>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl uppercase tracking-[-0.03em]">
        {title}
      </h2>
      <div className="space-y-3 text-[0.8rem] leading-relaxed text-muted [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 [&_li]:ml-4 [&_li]:list-disc [&_ul]:space-y-1">
        {children}
      </div>
    </section>
  );
}
