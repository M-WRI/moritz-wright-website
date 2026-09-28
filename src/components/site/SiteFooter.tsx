import { site } from "@/lib/content";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-y-2 border-accent bg-accent text-accent-fg">
      <div className="flex flex-col gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p className="meta">© {new Date().getFullYear()} {site.legalName}</p>
        <nav aria-label="Legal" className="flex flex-wrap gap-4">
          <Link href="/privacy" className="meta hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="meta hover:underline">
            Terms &amp; Conditions
          </Link>
          <a href={`mailto:${site.email}`} className="meta hover:underline">
            {site.email}
          </a>
        </nav>
      </div>
    </footer>
  );
}
