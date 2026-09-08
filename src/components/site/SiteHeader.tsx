"use client";

import { ThemeToggle } from "@/components/site/ThemeToggle";
import { getLenisInstance } from "@/lib/lenis";
import { site } from "@/lib/content";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("mailto:")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

const links = [
  { href: "/blog", label: "writing" },
  { href: "/services", label: "services" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
] as const;

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
      <Link
        href="/"
        className="pointer-events-auto fixed left-5 top-5 z-50 md:left-8 md:top-6"
        onClick={() => setOpen(false)}
      >
        <span className="sr-only">{site.name}</span>
        <img
          src="/logo.png"
          alt=""
          width={814}
          height={579}
          className="site-logo"
        />
      </Link>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <nav
          aria-label="Primary"
          className="pointer-events-auto absolute right-5 top-5 hidden flex-col items-end text-right md:right-8 md:top-16 md:flex"
        >
          {links.map((link) => {
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
      </header>

      <div className="pointer-events-auto fixed right-8 top-6 z-50 hidden md:block">
        <ThemeToggle />
      </div>

      <div
        className="pointer-events-auto fixed right-5 z-50 flex items-center gap-4 md:hidden"
        style={{
          bottom: "max(1.25rem, env(safe-area-inset-bottom))",
        }}
      >
        <ThemeToggle className="chrome-btn" />
        <button
          type="button"
          className="chrome-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X className="h-7 w-7" strokeWidth={1.75} />
          ) : (
            <Menu className="h-7 w-7" strokeWidth={1.75} />
          )}
        </button>
      </div>

      <div
        ref={overlayRef}
        id="mobile-nav"
        className="invisible fixed inset-0 z-40 bg-background md:hidden"
        aria-hidden={!open}
      >
        <nav
          aria-label="Mobile"
          className="absolute right-5 flex flex-col items-end text-right"
          style={{
            bottom: "max(4.5rem, calc(env(safe-area-inset-bottom) + 3.25rem))",
          }}
        >
          {links.map((link) => {
            const active = isActive(pathname, link.href);

            return (
              <div key={link.href} className="overflow-hidden">
                <span data-menu-item className="block">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`nav-link ${active ? "is-active" : ""}`}
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
