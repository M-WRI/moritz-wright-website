import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { DesktopScrollLayout } from "@/components/DesktopScrollLayout";

const SOCIAL = [
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "VSCO", href: "https://vsco.co" },
] as const;

const YEAR = new Date().getFullYear();

function PlaceholderBlock({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      role="img"
      aria-label="Portrait placeholder"
      className={`bg-neutral-400 ${className}`}
      {...props}
    />
  );
}

function SocialLinks({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const linkClass =
    variant === "light"
      ? "text-black underline-offset-2 hover:underline"
      : "text-white underline-offset-2 hover:underline";
  return (
    <nav className={className} aria-label="Social links">
      <ul className="flex flex-col gap-1 text-right text-sm font-medium">
        {SOCIAL.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className={linkClass} target="_blank" rel="noreferrer">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** &lt; lg — dark cover, orange name, centered placeholder */
export function MobileLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-black text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-center pt-6">
        <span
          className="select-none text-center font-black uppercase leading-none tracking-tight text-[#FF4500]"
          style={{ fontSize: "clamp(3.5rem, 18vw, 8rem)" }}
        >
          MORITZ
        </span>
      </div>

      <div className="relative z-10 mx-auto mt-24 flex w-full max-w-sm flex-1 flex-col px-4 pb-36 sm:max-w-md">
        <div className="relative mx-auto aspect-3/4 w-[72%] max-w-[280px]">
          <PlaceholderBlock className="h-full w-full shadow-2xl" />
        </div>

        <div className="pointer-events-none absolute right-4 top-1/3 z-20 -translate-y-1/2 md:right-8">
          <SocialLinks variant="dark" />
        </div>

        <div className="absolute bottom-28 left-4 z-20 max-w-[70%] sm:bottom-32">
          <p className="font-black uppercase leading-[0.95] tracking-tight text-white">
            <span className="block text-3xl sm:text-4xl">Software engineer</span>
            <span className="block text-3xl sm:text-4xl">Designer</span>
          </p>
        </div>

      </div>

      <footer className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between gap-4 px-4 pb-6 text-xs text-white/90 sm:px-6">
        <p>@Copyright {YEAR}</p>
        <Link
          href="mailto:hello@example.com"
          className="shrink-0 font-medium tracking-wide text-white underline-offset-4 hover:underline"
        >
          → Let&apos;s talk ←
        </Link>
      </footer>
    </div>
  );
}

export function Portfolio() {
  return (
    <>
      <div className="lg:hidden">
        <MobileLayout />
      </div>
      <div className="hidden lg:block">
        <DesktopScrollLayout />
      </div>
    </>
  );
}
