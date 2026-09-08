import { getProject, projects } from "@/lib/content";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.oneLiner,
  };
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <section className="border-t border-border py-8">
      <h2 className="text-lg font-semibold tracking-[-0.03em]">{title}</h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
        {body}
      </p>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {project.category}
        {project.placeholder ? " · Placeholder" : ""}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        {project.oneLiner}
      </p>
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        {project.github ? (
          <a href={project.github} rel="noreferrer" target="_blank">
            GitHub
          </a>
        ) : null}
        {project.demo ? (
          <a href={project.demo} rel="noreferrer" target="_blank">
            Live demo
          </a>
        ) : null}
        <Link href="/" className="text-muted hover:text-foreground">
          ← Back
        </Link>
      </div>

      <div className="relative mt-10 overflow-hidden bg-card">
        <Image
          src={project.image}
          alt={project.title}
          width={1600}
          height={1000}
          className="h-auto w-full object-cover grayscale"
          sizes="(max-width: 768px) 100vw, 48rem"
        />
      </div>

      <div className="mt-10">
        <Block title="Overview" body={project.overview} />
        <Block title="Problem" body={project.problem} />
        <Block title="Solution" body={project.solution} />
        <Block title="Engineering" body={project.engineering} />
        <section className="border-t border-border py-8">
          <h2 className="text-lg font-semibold tracking-[-0.03em]">Stack</h2>
          {project.technologies.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-base text-muted">To be documented.</p>
          )}
        </section>
        <Block title="Result" body={project.result} />
        {project.learned ? (
          <Block title="What I learned" body={project.learned} />
        ) : null}
      </div>
    </article>
  );
}
