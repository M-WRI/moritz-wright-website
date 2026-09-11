"use client";

import { SiteMark } from "@/components/site/SiteMark";
import { nav, site } from "@/lib/content";
import { getLenisInstance } from "@/lib/lenis";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("mailto:")) return false;
  const path = href.split("#")[0];
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);

  useLayoutEffect(() => {
    setOpen(false);
  }, [pathname]);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const items = overlay.querySelectorAll<HTMLElement>("[data-menu-item]");
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!readyRef.current) {
      readyRef.current = true;
      gsap.set(overlay, { yPercent: 100, autoAlpha: 0 });
      gsap.set(items, { yPercent: 110 });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (!open) getLenisInstance()?.start();
      },
    });

    if (open) {
      getLenisInstance()?.stop();
      if (reduce) {
        gsap.set(overlay, { yPercent: 0, autoAlpha: 1 });
        gsap.set(items, { yPercent: 0 });
        return;
      }
      gsap.set(items, { yPercent: 110 });
      tl.set(overlay, { autoAlpha: 1 });
      tl.fromTo(
        overlay,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.58, ease: "power3.out" },
      );
      tl.to(items, {
        yPercent: 0,
        duration: 0.72,
        stagger: 0.08,
        ease: "power3.out",
      });
    } else {
      if (reduce) {
        gsap.set(items, { yPercent: 110 });
        gsap.set(overlay, { yPercent: 100, autoAlpha: 0 });
        getLenisInstance()?.start();
        return;
      }
      tl.to(items, {
        yPercent: 110,
        duration: 0.32,
        stagger: 0.04,
        ease: "power3.in",
      });
      tl.to(overlay, {
        yPercent: 100,
        duration: 0.48,
        ease: "power3.in",
      });
      tl.set(overlay, { autoAlpha: 0 });
    }

    return () => {
      tl.kill();
    };
  }, [open]);

  useLayoutEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, []);

  return (
    <>
      <header className="site-frame relative z-30 bg-background">
        <div className="flex items-center justify-between gap-6 px-5 py-4 md:px-8 md:py-5">
          <div className="flex min-w-0 items-center gap-4 md:gap-6">
            <Link
              href="/"
              className="shrink-0"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">{site.name}</span>
              <SiteMark priority />
            </Link>
            <p className="meta hidden truncate text-muted sm:block">
              {site.legalName} / Software Engineer / Berlin • Managua
            </p>
          </div>

          <div className="flex items-center gap-5 md:gap-8">
            <nav
              aria-label="Primary"
              className="hidden items-center gap-5 md:flex lg:gap-7"
            >
              {nav.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`nav-link ${active ? "is-active" : ""}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <span className="square-end hidden md:inline-flex" aria-hidden />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center border border-border md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? (
                <X className="h-5 w-5" strokeWidth={1.75} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        ref={overlayRef}
        id="mobile-nav"
        className="invisible fixed inset-0 z-40 bg-background md:hidden"
        aria-hidden={!open}
      >
        <nav
          aria-label="Mobile"
          className="flex h-full flex-col justify-end gap-4 px-5 pb-10"
        >
          {nav.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <div key={link.href} className="overflow-hidden">
                <span data-menu-item className="block">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-display text-4xl uppercase ${active ? "text-accent" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </span>
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}
