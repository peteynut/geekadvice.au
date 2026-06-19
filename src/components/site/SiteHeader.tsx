"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { ThemeBadge } from "./ThemeBadge";
import { ThemeToggle } from "./ThemeToggle";

const NAV_STYLES: Record<string, string> = {
  "/blog/": "bg-blue/70 hover:bg-blue",
  "/music/": "bg-pink/70 hover:bg-pink",
  "/macos-gaming/": "bg-green/70 hover:bg-green",
  "/about/": "bg-yellow/70 hover:bg-yellow",
};

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-30 border-b-2 border-ink/10 backdrop-blur"
      style={{ backgroundColor: "var(--header-bg)" }}
    >
      <div className="mx-auto flex max-w-wide items-center gap-3 px-4 py-3 md:gap-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-retro text-xl tracking-tight text-ink hover:opacity-80 md:text-2xl"
          aria-label={`${site.name} — home`}
        >
          <ThemeBadge className="h-8 w-8" />
          <span>{site.name}</span>
        </Link>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <nav aria-label="Primary">
            <ul className="flex flex-wrap items-center gap-1.5 text-sm font-mono">
              {site.nav.slice(1).map((item) => {
                const styles = NAV_STYLES[item.href] ?? "bg-purple/60 hover:bg-purple";
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`inline-block rounded-full px-3 py-1.5 text-ink transition-colors ${styles}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-primary-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
          className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-surface/80 text-ink md:hidden"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink/10 px-4 pb-4 pt-3 md:hidden">
          <div className="mx-auto max-w-wide space-y-3">
            <ThemeToggle />
            <nav id="mobile-primary-nav" aria-label="Primary mobile">
              <ul className="grid gap-2 text-sm font-mono">
                {site.nav.map((item) => {
                  const styles = NAV_STYLES[item.href] ?? "bg-purple/60 hover:bg-purple";
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block rounded-xl px-3 py-2 text-ink transition-colors ${styles}`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
