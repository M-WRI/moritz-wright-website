"use client";

import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SmoothScroll pathname={pathname}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-card focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </SmoothScroll>
  );
}
