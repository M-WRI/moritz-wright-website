import { ParallaxGallery } from "@/components/site/ParallaxGallery";
import { SiteMark } from "@/components/site/SiteMark";
import { featuredProjects, hero, site } from "@/lib/content";

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
        <ParallaxGallery projects={featured} loop />
      </section>
    </>
  );
}
