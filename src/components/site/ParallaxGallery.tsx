"use client";

import type { Project } from "@/lib/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, type CSSProperties } from "react";

gsap.registerPlugin(ScrollTrigger);

type Size = "large" | "medium" | "small";

const SLOTS: Array<{ size: Size; column: string; shift: string }> = [
  { size: "large", column: "1 / span 4", shift: "0%" },
  { size: "small", column: "6 / span 2", shift: "48%" },
  { size: "medium", column: "9 / span 3", shift: "-16%" },
  { size: "medium", column: "2 / span 3", shift: "30%" },
  { size: "large", column: "6 / span 4", shift: "-6%" },
  { size: "small", column: "11 / span 2", shift: "42%" },
  { size: "small", column: "1 / span 2", shift: "-28%" },
  { size: "medium", column: "4 / span 3", shift: "18%" },
  { size: "large", column: "8 / span 4", shift: "-2%" },
];

const SCROLL_FACTOR: Record<Size, number> = {
  large: 0.45,
  medium: 0.26,
  small: 0.12,
};

const MOUSE_AMP: Record<Size, number> = {
  large: 180,
  medium: 100,
  small: 65,
};

export function ParallaxGallery({ projects }: { projects: Project[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const desktop = window.matchMedia("(min-width: 768px)");

    const ctx = gsap.context(() => {
      if (reduce || !desktop.matches) return;

      root.querySelectorAll<HTMLElement>("[data-poster]").forEach((fig) => {
        const size = fig.dataset.size as Size;
        const par = fig.querySelector<HTMLElement>("[data-poster-par]");
        const factor = SCROLL_FACTOR[size];
        if (!par || !factor) return;

        gsap.fromTo(
          par,
          { y: () => -window.innerHeight * factor },
          {
            y: () => window.innerHeight * factor,
            ease: "none",
            scrollTrigger: {
              trigger: fig,
              start: () => `top-=${window.innerHeight * factor}px bottom`,
              end: () => `bottom+=${window.innerHeight * factor}px top`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, root);

    let active = false;
    const vis = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => {
        active = self.isActive;
      },
    });

    const mice: Record<Size, HTMLElement[]> = {
      large: Array.from(
        root.querySelectorAll("[data-size='large'] [data-poster-mouse]"),
      ),
      medium: Array.from(
        root.querySelectorAll("[data-size='medium'] [data-poster-mouse]"),
      ),
      small: Array.from(
        root.querySelectorAll("[data-size='small'] [data-poster-mouse]"),
      ),
    };

    const pos = { tx: 0, ty: 0, x: 0, y: 0 };

    const onMove = (event: PointerEvent) => {
      pos.tx = gsap.utils.mapRange(0, window.innerWidth, 1, -1, event.clientX);
      pos.ty = gsap.utils.mapRange(0, window.innerHeight, 1, -1, event.clientY);
    };

    const tick = () => {
      if (!desktop.matches || reduce || !active) return;
      pos.x += (pos.tx - pos.x) * 0.09;
      pos.y += (pos.ty - pos.y) * 0.09;
      (["large", "medium", "small"] as const).forEach((size) => {
        const transform = `translate(${(MOUSE_AMP[size] * pos.x).toFixed(2)}px, ${(MOUSE_AMP[size] * pos.y).toFixed(2)}px)`;
        mice[size].forEach((el) => {
          el.style.transform = transform;
        });
      });
    };

    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      gsap.ticker.add(tick);
    }

    const onBreakpoint = () => ScrollTrigger.refresh();
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      desktop.removeEventListener("change", onBreakpoint);
      window.removeEventListener("pointermove", onMove);
      gsap.ticker.remove(tick);
      vis.kill();
      ctx.revert();
    };
  }, [projects]);

  return (
    <div ref={rootRef} data-parallax-root className="gallery-world">
      {projects.map((project, index) => {
        const slot = SLOTS[index % SLOTS.length];

        return (
          <article
            key={project.slug}
            data-poster
            data-size={slot.size}
            className="gallery-poster"
            style={
              {
                "--poster-col": slot.column,
                "--poster-row": String(Math.floor(index / 3) + 1),
                "--poster-shift": slot.shift,
              } as CSSProperties
            }
          >
            <Link href={`/projects/${project.slug}`} className="group block">
              <div data-poster-par className="will-change-transform">
                <div data-poster-mouse className="will-change-transform">
                  <div className="gallery-poster__frame">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover grayscale transition duration-700 group-hover:grayscale-0"
                      sizes="(max-width: 768px) 90vw, 32vw"
                    />
                  </div>
                  <div className="mt-2 flex items-baseline justify-between gap-3">
                    <h3 className="text-[13px] tracking-[-0.03em]">
                      {project.title}
                    </h3>
                    <p className="text-[11px] lowercase text-muted">
                      {project.category}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
