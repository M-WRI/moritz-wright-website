export const THEME_KEY = "mw-theme";

export type Theme = "light" | "dark";

export function readTheme(): Theme {
  try {
    return window.localStorage.getItem(THEME_KEY) === "light"
      ? "light"
      : "dark";
  } catch {
    return "dark";
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("light", theme === "light");
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Private mode can block storage.
  }
  window.dispatchEvent(new Event("themechange"));
}
