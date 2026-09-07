"use client";

import { useEffect, useState } from "react";

function isDark(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(isDark());
  }, []);

  return (
    <button
      type="button"
      className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-foreground hover:text-foreground"
      onClick={() => {
        const next = !isDark();
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
        setDark(next);
      }}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
