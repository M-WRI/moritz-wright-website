"use client";

import type { Project } from "@/lib/content";
import { getLenisInstance } from "@/lib/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, type CSSProperties } from "react";

gsap.registerPlugin(ScrollTrigger);

type Size = "large" | "medium" | "small";
type Slot = { size: Size; column: string; shift: string };

const SLOTS: Slot[] = [
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

const LOOP_SCROLL_FACTOR: Record<Size, number> = {
  large: 0.16,
  medium: 0.09,
  small: 0.04,
};

const MOUSE_AMP: Record<Size, number> = {
  large: 180,
  medium: 100,
  small: 65,
};

const LOOP_MOUSE_AMP: Record<Size, number> = {
  large: 72,
  medium: 42,
  small: 24,
};

const LOOP_SLOTS: Slot[] = [
  { size: "large", column: "1 / span 4", shift: "4%" },
  { size: "small", column: "10 / span 2", shift: "16%" },
  { size: "medium", column: "9 / span 3", shift: "-10%" },
  { size: "small", column: "2 / span 2", shift: "14%" },
  { size: "large", column: "6 / span 4", shift: "6%" },
  { size: "medium", column: "1 / span 3", shift: "-8%" },
];

const WHEEL_SCALE = 0.72;
const LOOP_COPIES = 3;

function PosterSet({
  projects,
  copy,
  loop = false,
}: {
  projects: Project[];
  copy: number;
  loop?: boolean;
}) {
  const slots = loop ? LOOP_SLOTS : SLOTS;
  const perRow = loop ? 2 : 3;

  return (
    <div data-loop-set className="gallery-world">
      {projects.map((project, index) => {
        const slot = slots[index % slots.length];

        return (
          <article
            key={`${copy}-${project.slug}`}
            data-poster
            data-size={slot.size}
            className="gallery-poster"
            style={
              {
                "--poster-col": slot.column,
                "--poster-row": String(Math.floor(index / perRow) + 1),
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
                      sizes="(max-width: 768px) 42vw, 32vw"
                    />
                  </div>
                  <div className="mt-2 hidden items-baseline justify-between gap-3 md:flex">
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

function applyParallax(
  root: HTMLElement,
  reduce: boolean,
  factors: Record<Size, number>,
) {
  if (reduce) {
    root.querySelectorAll<HTMLElement>("[data-poster-par]").forEach((par) => {
      gsap.set(par, { y: 0 });
    });
    return;
  }

  root.querySelectorAll<HTMLElement>("[data-loop-set]").forEach((set) => {
    const setY = Number(gsap.getProperty(set, "y")) || 0;
    set.querySelectorAll<HTMLElement>("[data-poster]").forEach((fig) => {
      const size = fig.dataset.size as Size;
      const par = fig.querySelector<HTMLElement>("[data-poster-par]");
      const factor = factors[size];
      if (!par || !factor) return;
      gsap.set(par, { y: setY * factor });
    });
  });
}

export function ParallaxGallery({
  projects,
  loop = false,
}: {
  projects: Project[];
  loop?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const copies = loop ? LOOP_COPIES : 1;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const desktop = window.matchMedia("(min-width: 768px)");
    const scrollFactors = loop ? LOOP_SCROLL_FACTOR : SCROLL_FACTOR;
    const mouseAmp = loop ? LOOP_MOUSE_AMP : MOUSE_AMP;

    const ctx = gsap.context(() => {
      if (loop || reduce || !desktop.matches) return;

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
    active = vis.isActive;

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
    const tiltBase = { beta: null as number | null, gamma: null as number | null };
    const TILT_RANGE = 18;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pos.tx = gsap.utils.mapRange(0, window.innerWidth, 1, -1, event.clientX);
      pos.ty = gsap.utils.mapRange(0, window.innerHeight, 1, -1, event.clientY);
    };

    const onOrient = (event: DeviceOrientationEvent) => {
      if (event.gamma == null || event.beta == null) return;

      const angle =
        (screen.orientation?.angle ??
          (window as Window & { orientation?: number }).orientation ??
          0) || 0;
      let gamma = event.gamma;
      let beta = event.beta;

      if (angle === 90) {
        const nextGamma = beta;
        beta = -gamma;
        gamma = nextGamma;
      } else if (angle === -90 || angle === 270) {
        const nextGamma = -beta;
        beta = gamma;
        gamma = nextGamma;
      } else if (angle === 180) {
        gamma = -gamma;
        beta = -beta;
      }

      if (tiltBase.gamma == null || tiltBase.beta == null) {
        tiltBase.gamma = gamma;
        tiltBase.beta = beta;
      }

      const dx = gsap.utils.clamp(
        -TILT_RANGE,
        TILT_RANGE,
        gamma - tiltBase.gamma,
      );
      const dy = gsap.utils.clamp(-TILT_RANGE, TILT_RANGE, beta - tiltBase.beta);
      pos.tx = -dx / TILT_RANGE;
      pos.ty = -dy / TILT_RANGE;
    };

    const orientationEvent = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<string>;
    };
    let tiltListening = false;

    const startTilt = () => {
      if (tiltListening || reduce) return;
      tiltListening = true;
      window.addEventListener("deviceorientation", onOrient);
    };

    const requestTilt = () => {
      if (tiltListening || reduce) return;
      if (typeof orientationEvent.requestPermission === "function") {
        void orientationEvent.requestPermission().then((state) => {
          if (state === "granted") startTilt();
        });
        return;
      }
      startTilt();
    };

    let loopOffset = 0;
    let lockedY: number | null = null;
    let lastTouchY: number | null = null;
    let loopH = 0;
    const sets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-loop-set]"),
    );
    const slots = sets.map((_, index) => index);

    const measureLoopH = () => {
      const set = sets[0];
      if (!set) {
        loopH = 0;
        return;
      }

      const setTop = set.getBoundingClientRect().top;
      let minTop = Infinity;
      let maxBottom = -Infinity;

      set.querySelectorAll<HTMLElement>("[data-poster]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        minTop = Math.min(minTop, rect.top - setTop);
        maxBottom = Math.max(maxBottom, rect.bottom - setTop);
      });

      if (!Number.isFinite(minTop) || !Number.isFinite(maxBottom)) {
        loopH = set.offsetHeight;
        return;
      }

      const seam = Math.min(window.innerHeight * 0.05, 48);
      loopH = Math.max(set.offsetHeight * 0.5, maxBottom - minTop + seam);
    };

    const placeSets = () => {
      if (sets.length < 2 || loopH < 8) return;
      sets.forEach((set, index) => {
        gsap.set(set, { y: slots[index] * loopH - loopOffset, force3D: true });
      });
    };

    const framesOffscreen = (set: HTMLElement) => {
      const cards = set.querySelectorAll<HTMLElement>("[data-poster-mouse]");
      if (!cards.length) return { above: true, below: true };

      const vh = window.innerHeight;
      let maxBottom = -Infinity;
      let minTop = Infinity;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        maxBottom = Math.max(maxBottom, rect.bottom);
        minTop = Math.min(minTop, rect.top);
      });

      return { above: maxBottom < 0, below: minTop > vh };
    };

    const recycleOffscreen = () => {
      if (sets.length < 2 || loopH < 8) return;

      for (let guard = 0; guard < 9; guard += 1) {
        placeSets();
        applyParallax(root, reduce, scrollFactors);

        let topAbove = -1;
        let topSlot = Infinity;
        let bottomBelow = -1;
        let bottomSlot = -Infinity;

        sets.forEach((set, index) => {
          const { above, below } = framesOffscreen(set);
          if (above && slots[index] < topSlot) {
            topSlot = slots[index];
            topAbove = index;
          }
          if (below && slots[index] > bottomSlot) {
            bottomSlot = slots[index];
            bottomBelow = index;
          }
        });

        if (topAbove !== -1) {
          slots[topAbove] += LOOP_COPIES;
          continue;
        }

        if (bottomBelow !== -1 && slots[bottomBelow] >= LOOP_COPIES) {
          slots[bottomBelow] -= LOOP_COPIES;
          continue;
        }

        break;
      }
    };

    const pinGallery = () => {
      const lenis = getLenisInstance();
      const current = lenis?.scroll ?? window.scrollY;
      const top = root.getBoundingClientRect().top;
      lockedY = current + top;
      lenis?.scrollTo(lockedY, { immediate: true, force: true });
      lenis?.stop();
    };

    const release = () => {
      lockedY = null;
      getLenisInstance()?.start();
    };

    const addDelta = (delta: number) => {
      const top = root.getBoundingClientRect().top;
      const scrollingDown = delta > 0;

      if (lockedY == null) {
        if (top > 2) return false;
        if (!scrollingDown && loopOffset <= 0) return false;
        if (top < -2) loopOffset += -top;
        pinGallery();
      }

      loopOffset += delta;

      if (loopOffset <= 0) {
        loopOffset = 0;
        slots.forEach((_, index) => {
          slots[index] = index;
        });
        placeSets();
        applyParallax(root, reduce, scrollFactors);
        release();
        return true;
      }

      placeSets();
      applyParallax(root, reduce, scrollFactors);
      return true;
    };

    const tick = () => {
      if (loop) {
        if (lockedY == null) {
          const top = root.getBoundingClientRect().top;
          if (top < -2) {
            loopOffset += -top;
            pinGallery();
          }
        } else {
          const lenis = getLenisInstance();
          if (lenis && Math.abs(lenis.scroll - lockedY) > 0.5) {
            lenis.scrollTo(lockedY, { immediate: true, force: true });
          }
        }
        placeSets();
        applyParallax(root, reduce, scrollFactors);
      }

      if (!reduce && active) {
        pos.x += (pos.tx - pos.x) * 0.09;
        pos.y += (pos.ty - pos.y) * 0.09;
        (["large", "medium", "small"] as const).forEach((size) => {
          const transform = `translate(${(mouseAmp[size] * pos.x).toFixed(2)}px, ${(mouseAmp[size] * pos.y).toFixed(2)}px)`;
          mice[size].forEach((el) => {
            el.style.transform = transform;
          });
        });
      }

      if (loop) {
        recycleOffscreen();
        applyParallax(root, reduce, scrollFactors);
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (!loop) return;
      if (addDelta(event.deltaY * WHEEL_SCALE)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0]?.clientY ?? null;
      requestTilt();
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!loop || lastTouchY == null) return;
      const y = event.touches[0]?.clientY ?? lastTouchY;
      const delta = lastTouchY - y;
      lastTouchY = y;
      if (addDelta(delta)) {
        event.preventDefault();
      }
    };

    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("click", requestTilt, { once: true });
      if (typeof orientationEvent.requestPermission !== "function") {
        startTilt();
      }
    }
    gsap.ticker.add(tick);

    if (loop) {
      window.addEventListener("wheel", onWheel, {
        passive: false,
        capture: true,
      });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("resize", measureLoopH);
      measureLoopH();
      placeSets();
    } else {
      window.addEventListener("touchstart", requestTilt, { passive: true });
    }

    const onBreakpoint = () => ScrollTrigger.refresh();
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      desktop.removeEventListener("change", onBreakpoint);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("click", requestTilt);
      window.removeEventListener("deviceorientation", onOrient);
      window.removeEventListener("wheel", onWheel, true);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchstart", requestTilt);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", measureLoopH);
      gsap.ticker.remove(tick);
      getLenisInstance()?.start();
      vis.kill();
      ctx.revert();
    };
  }, [loop, projects]);

  return (
    <div
      ref={rootRef}
      data-parallax-root
      className={loop ? "gallery-loop" : undefined}
    >
      {Array.from({ length: copies }, (_, copy) => (
        <PosterSet key={copy} projects={projects} copy={copy} loop={loop} />
      ))}
    </div>
  );
}
