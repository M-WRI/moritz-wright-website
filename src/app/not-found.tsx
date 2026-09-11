import Link from "next/link";

export default function NotFound() {
  return (
    <div className="border-b border-border px-5 py-24 md:px-8 md:py-32">
      <p className="meta text-muted">Error</p>
      <h1 className="display-section mt-4">404</h1>
      <p className="meta mt-8 max-w-md text-muted">
        That route does not exist.{" "}
        <Link href="/" className="text-foreground hover:text-accent">
          Back home ↗
        </Link>
      </p>
    </div>
  );
}
