"use client";

import { useSyncExternalStore } from "react";
import { getServerTheme, getTheme, setTheme, subscribeTheme } from "@/lib/theme";
import type { Locale } from "../data";

export function ThemeToggle({ locale }: { locale: Locale }) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  const label = locale === "vi"
    ? (theme === "dark" ? "Bật chế độ sáng" : "Bật chế độ tối")
    : (theme === "dark" ? "Switch to light mode" : "Switch to dark mode");

  return (
    <button type="button" className="theme-toggle" aria-label={label} title={label}
      aria-pressed={theme === "dark"} onClick={() => setTheme(getTheme() === "dark" ? "light" : "dark")}>
      <svg className="theme-icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M20.8 13.1A9 9 0 0 1 10.9 3.2 9 9 0 1 0 20.8 13.1Z" />
      </svg>
      <svg className="theme-icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </svg>
    </button>
  );
}
