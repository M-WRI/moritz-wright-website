"use client";

import Image from "next/image";
import { type CSSProperties, forwardRef, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type ColSpan = 1 | 2 | 3 | 4 | 5;

export type GalleryCell = {
  id: string;
  colSpan: ColSpan;
  colStart?: 1 | 2 | 3 | 4 | 5;
  src: string;
  alt: string;
  aspectClass?: string;
};

export type GalleryRow = {
  id: string;
  cells: GalleryCell[];
  /** 3 cells: animate left → right → middle (center grows last) */
  staggerThree?: boolean;
};

const SAMPLE_ROWS: GalleryRow[] = [
  {
    id: "full-bleed",
    cells: [
      {
        id: "a",
        colSpan: 5,
        src: "https://picsum.photos/seed/gal-a/1600/900",
        alt: "Sample project A",
        aspectClass: "aspect-[21/9] max-h-[70vh]",
      },
    ],
  },
  {
    id: "three-up",
    staggerThree: true,
    cells: [
      {
        id: "b",
        colSpan: 1,
        colStart: 1,
        src: "https://picsum.photos/seed/gal-b/500/700",
        alt: "Sample B — left, grows first",
        aspectClass: "aspect-[3/4]",
      },
      {
        id: "c",
        colSpan: 1,
        colStart: 3,
        src: "https://picsum.photos/seed/gal-c/500/700",
        alt: "Sample C — middle, grows last",
        aspectClass: "aspect-[3/4]",
      },
      {
        id: "d",
        colSpan: 1,
        colStart: 5,
        src: "https://picsum.photos/seed/gal-d/500/700",
        alt: "Sample D — right, grows second",
        aspectClass: "aspect-[3/4]",
      },
    ],
  },
  {
    id: "two-and-one",
    cells: [
      {
        id: "e",
        colSpan: 2,
        src: "https://picsum.photos/seed/gal-e/800/600",
        alt: "Sample E",
        aspectClass: "aspect-[4/3]",
      },
      {
        id: "f",
        colSpan: 2,
        src: "https://picsum.photos/seed/gal-f/800/600",
        alt: "Sample F",
        aspectClass: "aspect-[4/3]",
      },
      {
        id: "g",
        colSpan: 1,
        src: "https://picsum.photos/seed/gal-g/400/600",
        alt: "Sample G",
        aspectClass: "aspect-[2/3]",
      },
    ],
  },
  {
    id: "three-tight",
    cells: [
      {
        id: "h",
        colSpan: 1,
        src: "https://picsum.photos/seed/gal-h/400/400",
        alt: "Sample H",
        aspectClass: "aspect-square",
      },
      {
        id: "i",
        colSpan: 1,
        src: "https://picsum.photos/seed/gal-i/400/400",
        alt: "Sample I",
        aspectClass: "aspect-square",
      },
      {
        id: "j",
        colSpan: 1,
        src: "https://picsum.photos/seed/gal-j/400/400",
        alt: "Sample J",
        aspectClass: "aspect-square",
      },
    ],
  },
];

function BackgroundType() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      aria-hidden
    >
      <div className="absolute -left-[5%] top-[8%] text-[clamp(4rem,18vw,14rem)] font-black uppercase leading-none tracking-[-0.06em] text-black/[0.07]">
        Moritz
      </div>
      <div className="absolute right-[-3%] top-[28%] text-[clamp(3rem,14vw,11rem)] font-black uppercase leading-none tracking-[-0.07em] text-black/[0.06]">
        Wright
      </div>
      <div className="absolute bottom-[12%] left-[10%] text-[clamp(5rem,22vw,18rem)] font-black tabular-nums leading-none text-black/[0.05]">
        ’26
      </div>
      <div className="absolute bottom-[22%] right-[5%] max-w-[70%] text-[clamp(2rem,8vw,6rem)] font-black uppercase leading-[0.85] tracking-[-0.08em] text-black/[0.055]">
        Software
        <br />
        engineer
      </div>
    </div>
  );
}

const CellFrame = forwardRef<
  HTMLDivElement,
  { cell: GalleryCell; className?: string }
>(function CellFrame({ cell, className = "" }, ref) {
  const span = cell.colSpan;
  const start = cell.colStart;
  const gridStyle =
    start != null
      ? ({ gridColumn: `${start} / span ${span}` } as CSSProperties)
      : ({ gridColumn: `span ${span} / span ${span}` } as CSSProperties);

  return (
    <div
      ref={ref}
      className={`relative min-h-0 w-full origin-center will-change-transform ${className}`}
      style={gridStyle}
    >
      <div
        className={`relative w-full overflow-hidden bg-neutral-200 shadow-lg ring-1 ring-black/10 ${cell.aspectClass ?? "aspect-[4/3]"}`}
      >
        <Image
          src={cell.src}
          alt={cell.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          draggable={false}
        />
      </div>
    </div>
  );
});

function GalleryRowBlock({ row }: { row: GalleryRow }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const rowEl = rowRef.current;
    if (!rowEl) return;

    cellRefs.current = cellRefs.current.slice(0, row.cells.length);

    const ctx = gsap.context(() => {
      const initialScale = 0.82;

      if (row.staggerThree && row.cells.length === 3) {
        const left = row.cells.find((c) => c.colStart === 1);
        const middle = row.cells.find((c) => c.colStart === 3);
        const right = row.cells.find((c) => c.colStart === 5);
        if (!left || !middle || !right) return;

        const leftIdx = row.cells.indexOf(left);
        const midIdx = row.cells.indexOf(middle);
        const rightIdx = row.cells.indexOf(right);
        const leftEl = cellRefs.current[leftIdx];
        const midEl = cellRefs.current[midIdx];
        const rightEl = cellRefs.current[rightIdx];
        if (!leftEl || !midEl || !rightEl) return;

        gsap.set([leftEl, rightEl, midEl], { scale: initialScale });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: rowEl,
              start: "bottom bottom",
              end: "+=120%",
              scrub: 1.1,
              invalidateOnRefresh: true,
            },
          })
          .to(leftEl, { scale: 1, duration: 0.34, ease: "none" }, 0)
          .to(rightEl, { scale: 1, duration: 0.33, ease: "none" }, 0.28)
          .to(midEl, { scale: 1, duration: 0.33, ease: "none" }, 0.58);
      } else {
        row.cells.forEach((_, i) => {
          const el = cellRefs.current[i];
          if (!el) return;
          gsap.set(el, { scale: initialScale });
          gsap.to(el, {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "bottom bottom",
              end: "+=90%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        });
      }

      ScrollTrigger.refresh();
    }, rowRef);

    return () => ctx.revert();
  }, [row]);

  return (
    <div ref={rowRef} className="grid w-full grid-cols-5 gap-3 md:gap-5 lg:gap-6">
      {row.cells.map((cell, i) => (
        <CellFrame
          key={cell.id}
          ref={(el) => {
            cellRefs.current[i] = el;
          }}
          cell={cell}
        />
      ))}
    </div>
  );
}

export function GallerySection() {
  return (
    <section className="relative min-h-dvh w-full overflow-hidden bg-white">
      <BackgroundType />
      <div className="relative z-10 mx-auto max-w-[min(100%,1400px)] space-y-20 px-4 py-16 md:space-y-28 md:px-8 md:py-24">
        {SAMPLE_ROWS.map((row) => (
          <GalleryRowBlock key={row.id} row={row} />
        ))}
      </div>
    </section>
  );
}
