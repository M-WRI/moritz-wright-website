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

export function DesktopScrollLayout() {
  const yearShort = String(YEAR).slice(-2);
  const heroSectionRef = useRef<HTMLElement>(null);
  const mwSignatureRef = useRef<HTMLDivElement>(null);
  const rolesHeadlineRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <div className="overflow-x-clip">
        <section
          ref={heroSectionRef}
          className="h-dvh min-h-dvh w-full border-0 bg-[#ef4444] shadow-none ring-0 outline-none"
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
            className="fixed right-6 top-[95px] z-20 max-w-[min(92vw,48rem)] origin-top-right text-right font-black uppercase tracking-[-0.06em] min-[765px]:right-16 min-[765px]:top-[170px]"
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
            className="fixed bottom-[3.75rem] right-6 z-20 origin-bottom-right font-black uppercase leading-none tracking-[-0.06em] min-[765px]:right-16"
          >
            <p className="hero-type whitespace-nowrap text-black">
              MW — &apos;{yearShort}
            </p>
          </div>
        </section>
        <section className="h-dvh w-full bg-white"></section>
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
