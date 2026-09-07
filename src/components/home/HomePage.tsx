import { BigTitle } from "@/components/site/BigTitle";
import { ParallaxGallery } from "@/components/site/ParallaxGallery";
import { SiteMark } from "@/components/site/SiteMark";
import {
  about,
  approach,
  featuredProjects,
  hero,
  services,
  site,
  whatIDo,
} from "@/lib/content";
import Link from "next/link";

export function HomePage() {
  const featured = featuredProjects();

  return (
    <>
      <section className="relative flex h-dvh min-h-[640px] flex-col items-center justify-center px-5">
        <SiteMark className="h-16 w-24 text-foreground md:h-20 md:w-32" />
        <h1 className="sr-only">{hero.lines.join(" ")}</h1>
        <p className="absolute bottom-5 left-5 text-[11px] text-muted">
          © {site.name} {new Date().getFullYear()}
        </p>
        <div className="mt-10 max-w-xl text-center text-[15px] leading-relaxed text-muted">
          <p className="overflow-hidden">
            <span data-intro-hero className="block">
              {hero.kicker}
            </span>
          </p>
          <p className="mt-4 overflow-hidden text-foreground">
            <span data-intro-hero className="block">
              {hero.lines[0]}
            </span>
          </p>
          <p className="overflow-hidden">
            <span data-intro-hero className="block">
              → {hero.lines[1]}
            </span>
          </p>
          <p className="overflow-hidden">
            <span data-intro-hero className="block">
              → {hero.lines[2]}
            </span>
          </p>
        </div>
      </section>

      <section id="projects" className="relative">
        <BigTitle pin>projects</BigTitle>
        <div className="relative z-10 overflow-visible">
          <ParallaxGallery projects={featured} />
        </div>
      </section>

      <section id="services">
        <BigTitle>services</BigTitle>
        <div className="mx-auto max-w-6xl px-5 pb-28 md:px-10">
          <p data-reveal className="max-w-xl text-sm leading-relaxed text-muted md:text-base">
            {services.intro}
          </p>
          <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {services.items.map((item, index) => (
              <article key={item.slug} data-reveal>
                <p className="text-[11px] lowercase text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-2xl tracking-[-0.04em] md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="practice">
        <BigTitle>practice</BigTitle>
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-28 md:grid-cols-3 md:px-10">
          {whatIDo.items.map((item) => (
            <article key={item.title} data-reveal>
              <h3 className="text-xl tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="about">
        <BigTitle>about</BigTitle>
        <div className="mx-auto grid max-w-6xl gap-16 px-5 pb-32 md:grid-cols-[1.1fr_0.9fr] md:px-10">
          <div className="space-y-5 text-base leading-relaxed text-muted md:text-lg">
            {about.body.slice(0, 3).map((paragraph) => (
              <p key={paragraph} data-reveal>
                {paragraph}
              </p>
            ))}
            <Link
              data-reveal
              href="/about"
              className="inline-block pt-2 text-sm text-foreground"
            >
              more about me
            </Link>
          </div>
          <div data-reveal className="space-y-8">
            {approach.items.map((item) => (
              <div key={item.title}>
                <h3 className="tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
