import type { Project } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article data-reveal className="group flex h-full flex-col border border-border">
      <Link
        href={`/projects/${project.slug}`}
        className={`relative block aspect-[16/10] overflow-hidden ${project.darkThumb ? "bg-surface-dark" : "bg-card"}`}
      >
        {project.darkThumb && project.logoText ? (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-3xl lowercase text-accent">
              {project.logoText}
            </span>
          </div>
        ) : project.darkThumb ? (
          <div className="flex h-full items-center justify-center bg-black p-12">
            <Image
              src={project.image}
              alt={project.title}
              width={240}
              height={240}
              className="h-auto w-[34%] max-w-[7rem] object-contain opacity-95 transition duration-500 ease-out group-hover:scale-110 group-hover:opacity-100"
            />
          </div>
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover grayscale transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 border-t border-border p-5 transition-colors duration-250 group-hover:bg-accent">
        <p className="meta text-muted group-hover:text-accent-fg/70">
          {project.number} / {project.category}
        </p>
        <h3 className="font-display text-xl uppercase tracking-[-0.03em]">
          <Link href={`/projects/${project.slug}`} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="meta text-[0.75rem] leading-relaxed text-muted">
          {project.oneLiner}
        </p>
        {project.technologies.length > 0 ? (
          <ul className="mt-auto flex flex-wrap gap-2 pt-3">
            {project.technologies.map((tech) => (
              <li key={tech.name} className="meta text-muted">
                {tech.name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
