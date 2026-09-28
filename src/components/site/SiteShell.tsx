"use client";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const apply = () => {
      document.documentElement.style.setProperty(
        "--footer-reveal",
        `${footer.offsetHeight}px`,
      );
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(footer);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--footer-reveal");
    };
  }, []);

  return (
    <SmoothScroll pathname={pathname}>
      <div className="relative z-10 min-h-dvh bg-background">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-card focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
      </div>
      <div aria-hidden className="h-[var(--footer-reveal,5rem)] bg-accent" />
      <div ref={footerRef} className="fixed inset-x-0 bottom-0 z-0 bg-accent">
        <SiteFooter />
      </div>
    </SmoothScroll>
  );
}
