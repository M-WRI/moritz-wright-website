import { site } from "@/lib/content";
import { Headphones, Mail } from "lucide-react";
import type { ReactNode } from "react";

const channels: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  icon: ReactNode;
  accent?: boolean;
}[] = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: <Mail className="h-4 w-4" strokeWidth={1.75} />,
    accent: true,
  },
  {
    label: "GitHub",
    value: "github.com/M-WRI",
    href: site.socials.github,
    external: true,
    icon: <Headphones className="h-4 w-4" strokeWidth={1.75} />,
  },
];

function ChannelRow({
  label,
  value,
  href,
  external,
  icon,
  accent,
  variant,
}: (typeof channels)[number] & { variant: "light" | "dark" }) {
  const isDark = variant === "dark";
  const className = `group flex items-center gap-4 border-b px-5 py-4 last:border-b-0 md:px-6 md:py-5 ${
    isDark ? "border-surface-dark-fg/15" : "border-border"
  }`;
  const content = (
    <>
      <span
        className={`inline-flex h-10 w-10 shrink-0 items-center justify-center border ${
          accent
            ? "border-accent bg-accent text-white"
            : isDark
              ? "border-surface-dark-fg/25 bg-transparent text-surface-dark-fg"
              : "border-border bg-background"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`meta block text-[0.6rem] ${isDark ? "text-surface-dark-fg/55" : "text-muted"}`}
        >
          {label}
        </span>
        <span className="meta mt-1 block text-[0.72rem]">{value}</span>
      </span>
      <span
        aria-hidden
        className={`meta transition-colors ${
          isDark
            ? "text-surface-dark-fg/45 group-hover:text-surface-dark-fg"
            : "text-muted group-hover:text-foreground"
        }`}
      >
        →
      </span>
    </>
  );

  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {content}
    </a>
  );
}

export function ContactChannelList({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  return (
    <>
      {channels.map((channel) => (
        <ChannelRow key={channel.label} {...channel} variant={variant} />
      ))}
    </>
  );
}
