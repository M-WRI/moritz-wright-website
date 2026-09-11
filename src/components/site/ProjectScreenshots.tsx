"use client";

import type { ProjectScreenshot } from "@/lib/projects";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function ProjectScreenshots({
  screenshots,
}: {
  screenshots: ProjectScreenshot[];
}) {
  const [index, setIndex] = useState(0);
  const total = screenshots.length;
  if (total === 0) return null;

  const visible = [
    screenshots[index % total],
    screenshots[(index + 1) % total],
    screenshots[(index + 2) % total],
  ];

  const prev = () => setIndex((value) => (value - 1 + total) % total);
  const next = () => setIndex((value) => (value + 1) % total);

  return (
    <section className="border-b border-border">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 md:px-8">
        <p className="meta">/ Screenshots</p>
        <div className="flex items-center gap-3">
          <p className="meta text-muted">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </p>
          <button
            type="button"
            onClick={prev}
            className="flex h-8 w-8 items-center justify-center border border-border transition-colors hover:bg-foreground hover:text-background"
            aria-label="Previous screenshots"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            className="flex h-8 w-8 items-center justify-center border border-border transition-colors hover:bg-foreground hover:text-background"
            aria-label="Next screenshots"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-0 md:grid-cols-3">
        {visible.map((shot, i) => (
          <figure
            key={`${shot.label}-${index}-${i}`}
            className={`border-border bg-card p-4 md:p-5 ${i > 0 ? "border-t md:border-t-0 md:border-l" : ""}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-border/40 bg-background shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
              <Image
                src={shot.src}
                alt={shot.label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <figcaption className="meta mt-4 text-muted">{shot.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
