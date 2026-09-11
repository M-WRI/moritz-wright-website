import Image from "next/image";

type SiteMarkProps = {
  className?: string;
  variant?: "dark" | "light";
  priority?: boolean;
};

export function SiteMark({
  className = "",
  variant = "dark",
  priority = false,
}: SiteMarkProps) {
  const src = variant === "light" ? "/logo-light.png" : "/logo.png";

  return (
    <Image
      src={src}
      alt=""
      width={742}
      height={684}
      className={`site-logo ${className}`.trim()}
      priority={priority}
    />
  );
}
