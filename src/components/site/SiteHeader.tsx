"use client";

import { SiteMark } from "@/components/site/SiteMark";
import { nav, navColumns, site } from "@/lib/content";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("mailto:")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function IntroLine({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className="block min-h-[1.2em] overflow-hidden">
      <span data-intro className={`block ${className}`}>
        {children}
      </span>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const intro = pathname === "/";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-auto flex items-start justify-between gap-6 px-5 pt-5 md:px-8 md:pt-6">
        <Link
          href="/"
          className="text-[15px] tracking-[-0.03em] text-foreground"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        {!intro ? (
          <Link
            href="/"
            aria-label="Home"
            className="absolute left-1/2 top-5 hidden -translate-x-1/2 md:block"
          >
            <SiteMark className="h-7 w-11 text-foreground" />
          </Link>
        ) : null}

        <nav
          className="hidden grid-cols-3 gap-12 text-[14px] leading-[1.35] tracking-[-0.02em] md:grid"
          aria-label="Primary"
        >
          {navColumns.map((column) => (
            <div key={column.title} className="min-w-[7.5rem]">
              <IntroLine className="mb-2 text-[11px] text-muted">
                {column.title}
              </IntroLine>
              {column.links.map((link) => (
                <IntroLine key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-[1px] lowercase transition-opacity hover:opacity-50 ${
                      isActive(pathname, link.href) ? "opacity-100" : "opacity-90"
                    }`}
                  >
                    {link.label}
                  </Link>
                </IntroLine>
              ))}
            </div>
          ))}
        </nav>

        <button
          type="button"
          className="text-[13px] lowercase md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "close" : "menu"}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="pointer-events-auto mt-4 grid grid-cols-2 gap-6 bg-background/95 px-5 pb-8 pt-2 md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="lowercase"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="lowercase" onClick={() => setOpen(false)}>
            contact
          </Link>
        </div>
      ) : null}
    </header>
  );
}
