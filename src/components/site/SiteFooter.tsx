import { SiteMark } from "@/components/site/SiteMark";
import { site } from "@/lib/content";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="flex flex-col gap-6 px-5 py-6 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="shrink-0">
            <span className="sr-only">{site.name}</span>
            <SiteMark />
          </Link>
          <p className="meta text-muted md:text-center">
            Building Useful Things.
          </p>
          <div className="flex items-center gap-3 md:justify-end">
            <p className="meta text-muted">
              {site.location} / {site.established}
            </p>
            <span
              className="inline-block h-2 w-2 bg-foreground"
              aria-hidden
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta text-muted">
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-4">
            <Link href="/privacy" className="meta text-muted hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="meta text-muted hover:text-foreground">
              Terms &amp; Conditions
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="meta text-muted hover:text-foreground"
            >
              {site.email}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
