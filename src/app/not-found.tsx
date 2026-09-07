import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-5 py-32 md:px-10">
      <p className="display-title">404</p>
      <p className="mt-6 text-muted">
        That route does not exist.{" "}
        <Link href="/" className="text-foreground">
          Back home
        </Link>
        .
      </p>
    </div>
  );
}
