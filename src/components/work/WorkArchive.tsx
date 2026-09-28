"use client";

import { ProjectGallery } from "@/components/site/ProjectGallery";
import { takeRecentProjects } from "@/lib/project-utils";
import type { Project } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type SortMode = "latest" | "oldest" | "az";

function ProjectThumb({ project }: { project: Project }) {
  return (
    <div
      className={`relative aspect-square w-28 shrink-0 overflow-hidden sm:w-40 ${project.darkThumb ? "bg-black" : "bg-card"}`}
    >
      <span className="meta absolute left-2.5 top-2.5 z-10 text-white/90">
        {project.number}
      </span>
      {project.darkThumb && project.logoText ? (
        <div className="flex h-full items-center justify-center">
          <span className="font-display text-xl lowercase tracking-tight text-accent transition duration-500 group-hover:scale-110">
            {project.logoText}
          </span>
        </div>
      ) : project.darkThumb ? (
        <div className="flex h-full items-center justify-center bg-black p-6 md:p-8">
          <Image
            src={project.image}
            alt={project.title}
            width={160}
            height={160}
            className="h-auto w-[34%] max-w-[5rem] object-contain opacity-95 transition duration-500 ease-out group-hover:scale-110 group-hover:opacity-100"
          />
        </div>
      ) : (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover grayscale transition duration-500 group-hover:scale-[1.04]"
          sizes="160px"
        />
      )}
    </div>
  );
}

function ProjectRowCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex gap-4 sm:gap-5"
    >
      <ProjectThumb project={project} />
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 py-0.5">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-xl uppercase tracking-[-0.03em] md:text-2xl">
              {project.title}
            </h3>
            <span className="meta shrink-0 text-muted">{project.year}</span>
          </div>
          <p className="meta mt-2 line-clamp-3 text-[0.7rem] leading-relaxed text-muted">
            {project.oneLiner}
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <li
                key={tag}
                className="border border-border/70 bg-card px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.06em]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <span className="meta text-foreground transition-colors group-hover:text-accent">
          View Project →
        </span>
      </div>
    </Link>
  );
}

export function WorkArchive({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState<SortMode>("latest");

  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) {
      for (const tag of project.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return [
      { label: "All", count: projects.length },
      ...[...counts.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([label, count]) => ({ label, count })),
    ];
  }, [projects]);

  const galleryProjects = useMemo(
    () => takeRecentProjects(projects, 5),
    [projects],
  );

  const filtered = useMemo(() => {
    const list =
      filter === "All"
        ? [...projects]
        : projects.filter((project) =>
            project.tags.some(
              (tag) => tag.toLowerCase() === filter.toLowerCase(),
            ),
          );

    list.sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "oldest") return a.year.localeCompare(b.year) || a.number.localeCompare(b.number);
      return b.year.localeCompare(a.year) || a.number.localeCompare(b.number);
    });

    return list;
  }, [projects, filter, sort]);

  return (
    <div>
      <section className="border-b border-border">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="flex flex-col justify-between gap-8 px-5 py-10 md:px-8 md:py-14 lg:border-r lg:border-border">
            <div>
              <h1 className="display-section">
                Work
                <br />
                Archive.
              </h1>
              <p className="meta mt-6 max-w-md text-[0.75rem] leading-relaxed text-muted">
                A collection of software, AI, desktop, web and experimental
                projects.
              </p>
            </div>
          </div>

          <ProjectGallery projects={galleryProjects} />
        </div>
      </section>

      <section className="flex flex-col gap-4 border-b border-border px-5 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => {
            const active = filter === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setFilter(item.label)}
                className={`meta border px-2.5 py-1.5 transition-colors ${
                  active
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-border bg-transparent text-foreground hover:border-foreground"
                }`}
              >
                {item.label} ({item.count})
              </button>
            );
          })}
        </div>
        <label className="meta flex items-center gap-2 text-muted">
          Sort:
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortMode)}
            className="border border-border bg-background px-2 py-1.5 text-foreground outline-none"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A–Z</option>
          </select>
        </label>
      </section>

      <section>
        {filtered.length > 0 ? (
          <div className="grid gap-4 p-4 md:gap-5 md:p-5 lg:grid-cols-3">
            {filtered.map((project) => (
              <div key={project.slug}>
                <ProjectRowCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <p className="meta px-5 py-10 text-muted md:px-8">
            No projects match this filter.
          </p>
        )}
      </section>
    </div>
  );
}
