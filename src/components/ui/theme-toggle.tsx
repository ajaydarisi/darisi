"use client";

import { useSyncExternalStore } from "react";
import { Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export type Theme = "light" | "dark";

const STORAGE_KEY = "darisi-theme";
const THEME_CHANGE_EVENT = "darisi-theme-change";
const THEME_COLORS: Record<Theme, string> = {
  dark: "#0F2724",
  light: "#F6F2EA",
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
  document.querySelectorAll('meta[name="theme-color"]').forEach((themeColorMeta) => {
    themeColorMeta.setAttribute("content", THEME_COLORS[theme]);
    themeColorMeta.removeAttribute("media");
  });
  window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: theme }));
}

function subscribeToTheme(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
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

    applyTheme(mediaQuery.matches ? "dark" : "light");
  };

  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", handleStorageChange);
  mediaQuery.addEventListener("change", handlePreferenceChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", handleStorageChange);
    mediaQuery.removeEventListener("change", handlePreferenceChange);
  };
}

function getServerTheme(): Theme {
  return "dark";
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getActiveTheme,
    getServerTheme
  );

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
      onClick={toggleTheme}
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full text-[var(--nav-accent)] transition-[background-color,transform] duration-[var(--motion-base)] ease-[var(--ease-standard)] hover:bg-[var(--nav-hover)] hover:rotate-[35deg] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--nav-accent)]",
        className
      )}
    >
      <Sun aria-hidden="true" className="size-[1.1875rem]" strokeWidth={1.9} />
    </button>
  );
}
