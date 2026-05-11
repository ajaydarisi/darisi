"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export type Theme = "light" | "dark";

const STORAGE_KEY = "darisi-theme";
const THEME_CHANGE_EVENT = "darisi-theme-change";
const THEME_COLORS: Record<Theme, string> = {
  dark: "#0B0B0B",
  light: "#F8FAFC",
};

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function getSystemTheme(): Theme {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
}

function getActiveTheme(): Theme {
  if (typeof document !== "undefined") {
    const currentTheme = document.documentElement.dataset.theme ?? null;

    if (isTheme(currentTheme)) {
      return currentTheme;
    }
  }

  if (typeof window !== "undefined") {
    let storedTheme: string | null = null;

    try {
      storedTheme = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      storedTheme = null;
    }

    if (isTheme(storedTheme)) {
      return storedTheme;
    }
  }

  return getSystemTheme();
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLORS[theme]);
  window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: theme }));
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setTheme(getActiveTheme());
    });
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = () => {
      setTheme(getActiveTheme());
    };
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && isTheme(event.newValue)) {
        applyTheme(event.newValue);
      }
    };

    const handlePreferenceChange = () => {
      try {
        if (isTheme(window.localStorage.getItem(STORAGE_KEY))) {
          return;
        }
      } catch {
        return;
      }

      const nextTheme = mediaQuery.matches ? "dark" : "light";
      applyTheme(nextTheme);
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    window.addEventListener("storage", handleStorageChange);
    mediaQuery.addEventListener("change", handlePreferenceChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
      window.removeEventListener("storage", handleStorageChange);
      mediaQuery.removeEventListener("change", handlePreferenceChange);
    };
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // The DOM theme still updates if storage is unavailable.
    }
  }

  const isLight = theme === "light";

  return (
    <button
      type="button"
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={isLight}
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-8 w-16 shrink-0 items-center rounded-full border border-border bg-elevated p-1 text-muted transition-all duration-300 ease-out hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <span className="sr-only">
        {isLight ? "Switch to dark theme" : "Switch to light theme"}
      </span>
      <Moon
        aria-hidden="true"
        className="absolute left-2 h-4 w-4 transition-colors duration-300"
      />
      <Sun
        aria-hidden="true"
        className="absolute right-2 h-4 w-4 transition-colors duration-300"
      />
      <span
        aria-hidden="true"
        className={cn(
          "relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-surface text-primary shadow-[var(--shadow-floating)] transition-transform duration-300 ease-out",
          isLight ? "translate-x-8" : "translate-x-0"
        )}
      >
        {isLight ? (
          <Sun className="h-3.5 w-3.5" />
        ) : (
          <Moon className="h-3.5 w-3.5" />
        )}
      </span>
    </button>
  );
}
