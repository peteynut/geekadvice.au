"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "ga-theme";

function getStored(): Theme | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  if (v === "light" || v === "dark" || v === "system") return v;
  return null;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const resolved =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  root.dataset.theme = resolved;
  root.dataset.themePreference = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const initialTheme = getStored() ?? "system";
    setTheme(initialTheme);
    applyTheme(initialTheme);

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      const current = getStored() ?? "system";
      if (current === "system") applyTheme("system");
    };
    mql.addEventListener("change", onSystemChange);
    return () => mql.removeEventListener("change", onSystemChange);
    // local storage is intentionally read once on mount; subsequent changes go through update().
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(next: Theme) {
    setTheme(next);
    if (next === "system") {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
    applyTheme(next);
  }

  const options: { value: Theme; label: string; Icon: typeof Sun }[] = [
    { value: "light", label: "Light", Icon: Sun },
    { value: "dark", label: "Dark", Icon: Moon },
    { value: "system", label: "System", Icon: Monitor },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-surface/70 p-1 text-xs font-mono"
    >
      {options.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => update(value)}
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
              active
                ? "bg-purple text-ink shadow-sm"
                : "text-muted hover:text-ink"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}