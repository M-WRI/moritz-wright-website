export function SiteMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M8 18h32" />
      <path d="M14 18V8M19 18V5M24 18V3M29 18V5M34 18V8" />
      <circle cx="24" cy="25" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
