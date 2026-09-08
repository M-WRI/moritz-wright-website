"use client";

import { applyTheme, readTheme } from "@/lib/theme";
import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [light, setLight] = useState(false);

  useLayoutEffect(() => {
    const sync = () => setLight(readTheme() === "light");
    sync();
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  return (
    <button
      type="button"
      className={`chrome-btn ${className}`}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      onClick={() => applyTheme(light ? "dark" : "light")}
    >
      {light ? (
        <Moon className="h-7 w-7" strokeWidth={1.75} />
      ) : (
        <Sun className="h-7 w-7" strokeWidth={1.75} />
      )}
    </button>
  );
}
