import { site } from "@/lib/content";
import Link from "next/link";

const PHRASE = "Get in touch";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const copies = Array.from({ length: 8 }, (_, i) => `${PHRASE} ${i}`);

  return (
    <footer className="relative">
      <Link
        href="/contact"
        className="marquee group block py-8 md:py-12"
        aria-label="Get in touch"
      >
        <div className="marquee-track">
          <div className="flex">
            {copies.map((key) => (
              <span key={key} className="marquee-item">
                {PHRASE}
              </span>
            ))}
          </div>
          <div className="flex" aria-hidden>
            {copies.map((key) => (
              <span key={`${key}-b`} className="marquee-item">
                {PHRASE}
              </span>
            ))}
          </div>
        </div>
      </Link>
      <div className="flex items-end justify-between px-5 pb-5 text-[11px] text-muted md:px-8">
        <p>
          © {site.name} {year}
        </p>
        <p className="max-w-[14rem] text-right lowercase">{site.shortTitle}</p>
      </div>
    </footer>
  );
}
