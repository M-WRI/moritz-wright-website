"use client";

import Lenis from "lenis";
import { setLenisInstance } from "@/lib/lenis";
import { useLayoutEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({
  children,
  pathname,
}: {
  children: ReactNode;
  pathname: string;
}) {
  useLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.72,
      smoothWheel: !reduce,
    });
    setLenisInstance(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const intro = document.querySelectorAll<HTMLElement>("[data-intro]");
      if (intro.length) {
        gsap.set(intro, { yPercent: reduce ? 0 : 110 });
        gsap.to(intro, {
          yPercent: 0,
          duration: reduce ? 0 : 0.75,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.08,
        });
      }

      const introHero = document.querySelectorAll<HTMLElement>(
        "[data-intro-hero]",
      );
      if (introHero.length) {
        gsap.set(introHero, { yPercent: reduce ? 0 : 110 });
        gsap.to(introHero, {
          yPercent: 0,
          duration: reduce ? 0 : 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.55,
        });
      }

      const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    });

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [pathname]);

  return children;
}
