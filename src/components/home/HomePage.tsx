import { SiteMark } from "@/components/site/SiteMark";
import { hero, philosophy } from "@/lib/content";
import { featuredProjects } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

export function HomePage() {
  const featured = featuredProjects().slice(0, 4);

  return (
    <>
      <section className="border-b border-border">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-between gap-10 px-5 py-10 md:px-8 md:py-14 lg:min-h-[min(78vh,820px)] lg:border-r lg:border-border">
            <div className="max-w-xl">
              <h1 className="display-hero">
                {hero.lines.map((line) => (
                  <span key={line} className="block overflow-hidden">
                    <span data-intro-hero className="block">
                      {line}
                    </span>
                  </span>
                ))}
              </h1>
              <p className="meta mt-8 max-w-md text-muted md:mt-10">
                {hero.specialties}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href={hero.primaryCta.href} className="btn btn-primary">
                  {hero.primaryCta.label}
                  <span aria-hidden>↗</span>
                </Link>
                <Link href={hero.secondaryCta.href} className="btn btn-ghost">
                  {hero.secondaryCta.label}
                </Link>
              </div>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden bg-[#6a6a6a] lg:min-h-full">
            <ul className="meta absolute right-5 top-5 text-right text-white md:right-8 md:top-8">
              {hero.imageOverlays.top.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="meta absolute bottom-5 right-5 text-right text-white md:bottom-8 md:right-8">
              {hero.imageOverlays.bottom}
            </p>
          </div>
        </div>
      </section>

      <section id="work" className="border-b border-border scroll-mt-4">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 md:px-8">
          <p className="meta">01 / Selected Work</p>
          <Link href="/projects" className="meta hover:text-accent">
            View All Projects →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              data-reveal
              className={`group border-border ${index > 0 ? "border-t sm:border-t-0" : ""} ${index % 2 === 1 ? "sm:border-l" : ""} ${index > 1 ? "xl:border-t-0" : ""} ${index > 0 ? "xl:border-l" : ""}`}
            >
              <article className="flex h-full flex-col bg-background">
                <div
                  className={`relative aspect-[4/3] overflow-hidden ${project.darkThumb ? "bg-black" : "bg-card"}`}
                >
                  {project.darkThumb && project.logoText ? (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-display text-3xl lowercase tracking-tight text-accent transition duration-500 ease-out group-hover:scale-110 md:text-4xl">
                        {project.logoText}
                      </span>
                    </div>
                  ) : project.darkThumb ? (
                    <div className="flex h-full items-center justify-center bg-black p-12 md:p-16">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={240}
                        height={240}
                        className="h-auto w-[34%] max-w-[7rem] object-contain opacity-95 transition duration-500 ease-out group-hover:scale-110 group-hover:opacity-100"
                        sizes="(max-width: 1280px) 20vw, 10vw"
                      />
                    </div>
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover grayscale transition duration-500 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />
                  )}
                </div>
                <div className="space-y-1 border-t border-border bg-background px-4 py-4 transition-colors duration-300 group-hover:bg-accent md:px-5">
                  <p className="meta text-foreground">
                    {project.number} {project.title}
                  </p>
                  <p className="meta text-muted group-hover:text-accent-fg/70">
                    {project.category} / {project.stackLabel}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid border-b border-border lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="border-b border-border px-5 py-10 md:px-8 md:py-14 lg:border-b-0 lg:border-r">
          <h2 className="display-section max-w-full break-words">
            {philosophy.lines.map((line) => (
              <span key={line} className="block" data-reveal>
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className="flex flex-col justify-between gap-10 border-b border-border px-5 py-10 md:px-8 md:py-14 lg:border-b-0 lg:border-r">
          <p
            data-reveal
            className="meta max-w-md text-[0.75rem] leading-relaxed text-muted"
          >
            {philosophy.body}
          </p>
          <div data-reveal>
            <div className="mb-3 h-px w-full bg-border" />
            <Link href={philosophy.cta.href} className="meta hover:text-accent">
              {philosophy.cta.label} ↗
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-16 bg-surface-dark px-5 py-10 text-surface-dark-fg md:px-8 md:py-14">
          <ul data-reveal className="space-y-2">
            {philosophy.interests.map((item) => (
              <li key={item} className="meta text-surface-dark-fg">
                {item}
              </li>
            ))}
          </ul>
          <div data-reveal className="flex items-end justify-between gap-4">
            <SiteMark variant="light" />
            <p className="meta text-right text-surface-dark-fg/70">
              Berlin • Managua
              <br />
              Est. 1988
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
