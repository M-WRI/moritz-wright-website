import { ProjectScreenshots } from "@/components/site/ProjectScreenshots";
import { getProject, getProjects } from "@/lib/projects";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.oneLiner,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Moritz Wright`,
      description: project.oneLiner,
      url: `/projects/${project.slug}`,
      type: "article",
      images: [
        {
          url: project.darkThumb ? "/og.png" : project.image,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Moritz Wright`,
      description: project.oneLiner,
      images: [project.darkThumb ? "/og.png" : project.image],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article>
      <section className="border-b border-border">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-between gap-10 px-5 py-10 md:px-8 md:py-14 lg:border-r lg:border-border">
            <div>
              <Link href="/projects" className="meta text-muted hover:text-foreground">
                ← All Projects
              </Link>
              <p className="meta mt-8 text-muted">{project.number}</p>
              <h1 className="display-project mt-2">{project.title}</h1>
              <p className="mt-5 font-display text-lg uppercase tracking-[-0.02em] md:text-xl">
                {project.tagline}
              </p>
              <p className="meta mt-6 max-w-md text-[0.75rem] leading-relaxed text-muted">
                {project.oneLiner}
              </p>
              <p className="meta mt-6 text-muted">
                {project.tags.join(" · ")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.demo ? (
                <a
                  href={project.demo}
                  rel="noreferrer"
                  target="_blank"
                  className="btn btn-primary"
                >
                  Visit Project
                  <span aria-hidden>↗</span>
                </a>
              ) : (
                <span className="btn btn-primary opacity-60">
                  Visit Project
                  <span aria-hidden>↗</span>
                </span>
              )}
              {project.github ? (
                <a
                  href={project.github}
                  rel="noreferrer"
                  target="_blank"
                  className="btn btn-ghost"
                >
                  View Code
                </a>
              ) : (
                <span className="btn btn-ghost opacity-60">View Code</span>
              )}
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden bg-surface-dark lg:min-h-full">
            <Image
              src={project.heroImage}
              alt={`${project.title} preview`}
              fill
              priority
              className="object-contain p-4 md:p-6"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
            <p className="meta absolute right-5 top-1/2 origin-right -translate-y-1/2 rotate-90 text-white md:right-8">
              {project.overlayText}
            </p>
          </div>
        </div>
      </section>

      <section className="grid border-b border-border lg:grid-cols-3">
        <div className="border-b border-border px-5 py-10 md:px-8 md:py-12 lg:border-b-0 lg:border-r">
          <p className="meta text-muted">/ About</p>
          <h2 className="mt-6 font-display text-2xl uppercase leading-[0.95] tracking-[-0.03em] md:text-3xl">
            {project.aboutHeading}
          </h2>
          <p className="meta mt-6 text-[0.75rem] leading-relaxed text-muted">
            {project.aboutBody}
          </p>
        </div>

        <div className="border-b border-border px-5 py-10 md:px-8 md:py-12 lg:border-b-0 lg:border-r">
          <p className="meta text-muted">/ Key Features</p>
          <ol className="mt-6 space-y-5">
            {project.features.map((feature, index) => (
              <li key={feature.title} className="grid grid-cols-[2.5rem_1fr] gap-3">
                <span className="meta text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-sm uppercase tracking-[-0.02em]">
                    {feature.title}
                  </p>
                  <p className="meta mt-1 text-[0.7rem] leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="px-5 py-10 md:px-8 md:py-12">
          <p className="meta text-muted">/ Tech Stack</p>
          <ul className="mt-6 space-y-4">
            {project.technologies.map((tech) => (
              <li
                key={tech.name}
                className="flex items-start gap-3 border-b border-border pb-4 last:border-b-0 last:pb-0"
              >
                <span
                  className="mt-1 inline-block h-2 w-2 shrink-0 bg-accent"
                  aria-hidden
                />
                <div>
                  <p className="font-display text-sm uppercase tracking-[-0.02em]">
                    {tech.name}
                  </p>
                  <p className="meta mt-1 text-muted">{tech.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProjectScreenshots screenshots={project.screenshots} />
    </article>
  );
}
