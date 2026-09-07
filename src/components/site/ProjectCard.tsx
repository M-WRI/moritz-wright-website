import type { Project } from "@/lib/content";
import Link from "next/link";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      data-reveal
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-[16/10] bg-border/50"
      >
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {project.placeholder ? "Screenshot pending" : "Project"}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {project.category}
          </p>
          {project.placeholder ? (
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              Placeholder
            </p>
          ) : null}
        </div>
        <h3 className="text-xl font-semibold tracking-[-0.03em]">
          <Link href={`/projects/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted">{project.oneLiner}</p>
        {project.technologies.length > 0 ? (
          <ul className="mt-auto flex flex-wrap gap-2 pt-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto flex flex-wrap gap-4 pt-2 text-sm">
          <Link href={`/projects/${project.slug}`} className="hover:underline">
            Case study
          </Link>
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
        </div>
      </div>
    </article>
  );
}
