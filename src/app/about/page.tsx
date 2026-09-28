import { ProjectGallery } from "@/components/site/ProjectGallery";
import { about, approach } from "@/lib/content";
import { getRecentProjects } from "@/lib/projects";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
};

export default function AboutPage() {
  const recentProjects = getRecentProjects(5);

  return (
    <div>
      <section className="grid border-b border-border lg:grid-cols-2">
        <div className="contact-copy flex flex-col justify-between gap-10 border-b border-border px-5 py-10 md:px-8 md:py-14 lg:border-b-0 lg:border-r">
          <div>
            <h1 className="display-contact">
              {about.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <p className="meta max-w-xl text-[0.75rem] leading-relaxed text-muted">
            {about.intro}
          </p>
        </div>
        <ProjectGallery projects={recentProjects} />
      </section>

      <section className="grid border-b border-border lg:grid-cols-2">
        <div className="border-b border-border lg:border-b-0 lg:border-r">
          <div className="border-b border-border px-5 py-4 md:px-8">
            <p className="meta">01 / {about.aboutMeLabel}</p>
          </div>
          <div className="space-y-5 px-5 py-10 md:px-8 md:py-14">
            {about.aboutMe.map((paragraph) => (
              <p
                key={paragraph}
                data-reveal
                className="meta text-[0.75rem] leading-relaxed text-muted"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div>
          <div className="border-b border-border px-5 py-4 md:px-8">
            <p className="meta">02 / {approach.title}</p>
          </div>
          <ol className="px-5 py-10 md:px-8 md:py-14">
            {approach.items.map((item, index) => (
              <li
                key={item.title}
                data-reveal
                className="flex flex-wrap items-baseline gap-x-2 border-b border-border py-4 last:border-b-0"
              >
                <span className="meta w-6 shrink-0 text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg uppercase tracking-[-0.03em] md:text-xl">
                  {item.title}
                </span>
                <span className="meta text-muted">—</span>
                <span className="meta min-w-[12rem] flex-1 text-[0.7rem] leading-relaxed text-muted">
                  {item.body}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="grid border-b border-border sm:grid-cols-3">
        {about.stats.map((stat, index) => (
          <article
            key={stat.value}
            data-reveal
            className={`px-5 py-8 md:px-8 md:py-10 ${index > 0 ? "border-t border-border sm:border-t-0 sm:border-l" : ""}`}
          >
            <p className="font-display text-2xl uppercase tracking-[-0.03em] md:text-3xl">
              {stat.value}
            </p>
            <p className="meta mt-3 max-w-xs text-[0.65rem] leading-relaxed text-muted">
              {stat.label}
            </p>
          </article>
        ))}
      </section>

      <section className="border-b border-border">
        <div className="border-b border-border px-5 py-4 md:px-8">
          <p className="meta">03 / {about.cta.kicker}</p>
        </div>
        <div className="grid gap-8 px-5 py-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:px-8 md:py-14">
          <p
            data-reveal
            className="display-section max-w-3xl text-[clamp(2rem,5vw,3.5rem)] leading-[0.92]"
          >
            {about.cta.title}
          </p>
          <div data-reveal className="md:pb-1">
            <Link href={about.cta.href} className="btn btn-primary">
              {about.cta.label}
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
