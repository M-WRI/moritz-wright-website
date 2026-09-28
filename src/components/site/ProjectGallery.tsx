"use client";

import type { Project } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const FADE_MS = 400;

function GallerySlide({ project }: { project: Project }) {
  return (
    <>
      {project.darkThumb && project.logoText ? (
        <div className="flex h-full w-full items-center justify-center bg-black">
          <span className="font-display text-4xl lowercase tracking-tight text-accent md:text-5xl">
            {project.logoText}
          </span>
        </div>
      ) : project.darkThumb ? (
        <div className="flex h-full w-full items-center justify-center bg-black p-16 md:p-24">
          <Image
            src={project.image}
            alt=""
            width={320}
            height={320}
            className="h-auto w-[28%] max-w-[10rem] object-contain opacity-95 md:max-w-[12rem]"
            sizes="(max-width: 1024px) 40vw, 20vw"
            priority
          />
        </div>
      ) : (
        <Image
          src={project.image}
          alt=""
          fill
          className="object-cover grayscale"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      )}
    </>
  );
}

export function ProjectGallery({
  projects,
  className = "",
}: {
  projects: Project[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const canNavigate = projects.length > 1;
  const useFade = projects.length > 1;

  useEffect(() => {
    setIndex(0);
    setVisible(true);
  }, [projects]);

  const project = projects[index];

  const go = useCallback(
    (delta: -1 | 1) => {
      if (!canNavigate) return;

      if (!useFade) {
        setIndex((current) => (current + delta + projects.length) % projects.length);
        return;
      }

      setVisible(false);
      window.setTimeout(() => {
        setIndex((current) => (current + delta + projects.length) % projects.length);
        setVisible(true);
      }, FADE_MS);
    },
    [canNavigate, projects.length, useFade],
  );

  if (!project) {
    return (
      <div
        className={`relative min-h-[280px] bg-[#6a6a6a] lg:min-h-full ${className}`.trim()}
        aria-hidden
      />
    );
  }

  const fadeClass = useFade
    ? "transition-opacity ease-in-out"
    : "";

  return (
    <div
      className={`relative min-h-[280px] overflow-hidden bg-[#6a6a6a] lg:min-h-full ${className}`.trim()}
      aria-roledescription="carousel"
      aria-label="Recent projects"
    >
      <div
        className={`absolute inset-0 ${fadeClass} ${visible ? "opacity-100" : "opacity-0"}`}
        style={useFade ? { transitionDuration: `${FADE_MS}ms` } : undefined}
      >
        <Link
          href={`/projects/${project.slug}`}
          className="absolute inset-0 block"
          aria-label={`${project.title}, view project`}
        >
          <GallerySlide project={project} />
        </Link>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 pb-5 pt-20 md:px-8 md:pb-6">
        <div
          className={`flex items-end justify-between gap-4 ${fadeClass} ${visible ? "opacity-100" : "opacity-0"}`}
          style={useFade ? { transitionDuration: `${FADE_MS}ms` } : undefined}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="pointer-events-auto min-w-0"
          >
            <p className="meta text-white/80">{project.number}</p>
            <p className="font-display text-xl uppercase tracking-[-0.03em] text-white md:text-2xl">
              {project.title}
            </p>
          </Link>

          {canNavigate ? (
            <div className="pointer-events-auto flex shrink-0 items-center gap-2">
              <span className="meta tabular-nums text-white/70">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => go(-1)}
                className="meta border border-white/35 bg-black/40 px-2.5 py-1.5 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-black/60"
                aria-label="Previous project"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="meta border border-white/35 bg-black/40 px-2.5 py-1.5 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-black/60"
                aria-label="Next project"
              >
                →
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
