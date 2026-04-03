"use client";

import Link from "next/link";
import Lenis from "lenis";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LENIS_OPTIONS = {
  lerp: 0.09,
  wheelMultiplier: 0.68,
  smoothWheel: true,
} as const;

const YEAR = new Date().getFullYear();

function PortraitPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Portrait placeholder"
      className={`bg-neutral-400 ${className}`}
    />
  );
}

/** 3-up: grow left → right → middle (DOM indices 0, 2, 1) */
function projectCellOrder(count: number): number[] {
  if (count === 3) return [0, 2, 1];
  return Array.from({ length: count }, (_, i) => i);
}

export function DesktopScrollLayout() {
  const yearShort = String(YEAR).slice(-2);
  const heroSectionRef = useRef<HTMLElement>(null);
  const mwSignatureRef = useRef<HTMLDivElement>(null);
  const rolesHeadlineRef = useRef<HTMLDivElement>(null);
  const gallerySectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = heroSectionRef.current;
    const mw = mwSignatureRef.current;
    const roles = rolesHeadlineRef.current;
    if (!el) return;

    const lenis = new Lenis(LENIS_OPTIONS);
    lenis.on("scroll", ScrollTrigger.update);

    const onGsapTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onGsapTick);
    gsap.ticker.lagSmoothing(0);

    let prevScrollY = lenis.scroll;
    let lastIntent: "down" | "up" | null = null;

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate(self) {
        const y = self.scroll();
        if (y === prevScrollY) return;
        const scrollingDown = y > prevScrollY;
        prevScrollY = y;
        const intent = scrollingDown ? "down" : "up";
        if (intent === lastIntent) return;
        lastIntent = intent;

        if (scrollingDown) {
          gsap.to(el, {
            backgroundColor: "#ffffff",
            duration: 0.2,
            delay: 0.25,
            ease: "sine.inOut",
            overwrite: "auto",
          });
          if (mw) {
            gsap.to(mw, {
              scale: 2,
              duration: 1,
              delay: 0.2,
              transformOrigin: "right bottom",
              ease: "expo.out",
              overwrite: "auto",
            });
          }
          if (roles) {
            gsap.to(roles, {
              scale: 0.78,
              duration: 0.55,
              delay: 0.15,
              transformOrigin: "right top",
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        } else {
          gsap.to(el, {
            backgroundColor: "#ef4444",
            duration: 0.2,
            ease: "sine.inOut",
            overwrite: "auto",
          });
          if (mw) {
            gsap.to(mw, {
              scale: 1,
              duration: 0.55,
              transformOrigin: "right bottom",
              ease: "power3.inOut",
              overwrite: "auto",
            });
          }
          if (roles) {
            gsap.to(roles, {
              scale: 1,
              duration: 0.55,
              transformOrigin: "right top",
              ease: "power3.inOut",
              overwrite: "auto",
            });
          }
        }
      },
    });

    return () => {
      st.kill();
      gsap.ticker.remove(onGsapTick);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    const gallery = gallerySectionRef.current;
    if (!gallery) return;

    const ctx = gsap.context(() => {
      const rows = gallery.querySelectorAll<HTMLElement>("[data-gallery-row]");
      rows.forEach((row) => {
        const cells = row.querySelectorAll<HTMLElement>("[data-project-cell]");
        const n = cells.length;
        if (n === 0) return;

        const order = projectCellOrder(n);
        gsap.set(cells, { scale: 0.5, transformOrigin: "50% 50%" });

        /** Scroll range ends when the last-in-sequence cell reaches scale 1 at its top @ 50vh */
        const lastInSequence = cells[order[order.length - 1]];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            endTrigger: lastInSequence,
            end: "top 50%",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        const stagger = 0.2;
        const piece = 0.28;
        order.forEach((cellIndex, i) => {
          tl.to(
            cells[cellIndex],
            { scale: 1, duration: piece, ease: "none" },
            i * stagger,
          );
        });
      });

      ScrollTrigger.refresh();
    }, gallery);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="overflow-x-clip">
        <section
          ref={heroSectionRef}
          className="relative z-0 h-dvh min-h-dvh w-full border-0 bg-[#ef4444] shadow-none ring-0 outline-none"
        >
          <div className="absolute right-6 top-7 z-20 max-w-[min(94vw,56rem)] text-right min-[765px]:right-16 min-[765px]:top-11">
            <h1 className="font-black uppercase tracking-[-0.06em]">
              <span className="hero-type block leading-[0.95]">
                It&apos;s me —
              </span>
              <span className="hero-type mt-1 block leading-[0.88]">
                Moritz Wright
              </span>
            </h1>
          </div>
          <div
            ref={rolesHeadlineRef}
            className="fixed right-6 top-[95px] z-10 max-w-[min(92vw,48rem)] origin-top-right text-right font-black uppercase tracking-[-0.06em] min-[765px]:right-16 min-[765px]:top-[170px]"
          >
            <div className="space-y-0 leading-none">
              <p className="hero-type leading-[0.92]">Software engineer</p>
              <p className="hero-type leading-[0.92]">Designer</p>
            </div>
          </div>
          <div
            className="absolute z-10 max-[765px]:inset-0 max-[765px]:flex max-[765px]:items-center max-[765px]:justify-center min-[766px]:bottom-0 min-[766px]:left-0 min-[766px]:w-[min(34vw,400px)]"
          >
            <PortraitPlaceholder className="shadow-2xl max-[765px]:aspect-auto max-[765px]:h-[80%] max-[765px]:w-[80%] min-[766px]:aspect-3/4 min-[766px]:w-full" />
          </div>
          <div
            ref={mwSignatureRef}
            className="fixed bottom-[3.75rem] right-6 z-10 origin-bottom-right font-black uppercase leading-none tracking-[-0.06em] min-[765px]:right-16"
          >
            <p className="hero-type whitespace-nowrap text-black">
              MW — &apos;{yearShort}
            </p>
          </div>
        </section>
        <section
          ref={gallerySectionRef}
          className="relative z-20 grid w-full gap-32 bg-white px-4 py-24 md:px-8"
        >
          <div data-gallery-row className="grid grid-cols-5 gap-4">
            <div
              data-project-cell
              className="col-span-1 w-full min-h-0 will-change-transform"
            >
              <div className="aspect-square w-full bg-red-500" />
            </div>
            <div
              data-project-cell
              className="col-span-1 w-full min-h-0 will-change-transform"
            >
              <div className="aspect-square w-full bg-red-500" />
            </div>
            <div
              data-project-cell
              className="col-span-2 w-full min-h-0 will-change-transform"
            >
              <div className="aspect-square w-full bg-red-500" />
            </div>
          </div>
          <div data-gallery-row className="grid grid-cols-5 gap-4">
            <div
              data-project-cell
              className="col-span-1 w-full min-h-0 will-change-transform"
            >
              <div className="aspect-square w-full bg-red-500" />
            </div>
            <div
              data-project-cell
              className="col-span-1 w-full min-h-0 will-change-transform"
            >
              <div className="aspect-square w-full bg-red-500" />
            </div>
            <div
              data-project-cell
              className="col-span-1 w-full min-h-0 will-change-transform"
            >
              <div className="aspect-square w-full bg-neutral-200" />
            </div>
            <div
              data-project-cell
              className="col-span-2 w-full min-h-0 will-change-transform"
            >
              <div className="aspect-square w-full bg-red-500" />
            </div>
          </div>
          <div data-gallery-row className="grid grid-cols-5 gap-4">
            <div
              data-project-cell
              className="col-span-1 w-full min-h-0 will-change-transform"
            >
              <div className="aspect-square w-full bg-neutral-200" />
            </div>
            <div
              data-project-cell
              className="col-span-3 w-full min-h-0 will-change-transform"
            >
              <div className="aspect-square w-full bg-red-500" />
            </div>
            <div
              data-project-cell
              className="col-span-1 w-full min-h-0 will-change-transform"
            >
              <div className="aspect-square w-full bg-neutral-200" />
            </div>
          </div>
        </section>
      </div >
      <footer className="fixed bottom-0 left-0 right-0 z-30 flex items-end justify-between gap-4 px-5 py-3.5 lg:px-12 lg:py-4">
        <p className="min-w-0 text-left text-[11px] font-semibold leading-tight text-black lg:text-xs">
          Moritz Wright — {yearShort}
        </p>
        <Link
          href="mailto:hello@example.com"
          className="shrink-0 text-[11px] font-semibold uppercase tracking-wide underline-offset-4 hover:underline lg:text-xs"
        >
          → Let&apos;s talk ←
        </Link>
      </footer>
    </>
  );
}
