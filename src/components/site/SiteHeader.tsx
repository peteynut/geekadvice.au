import Link from "next/link";
import { site } from "@/lib/site";
import { ThemeBadge } from "./ThemeBadge";

const NAV_STYLES: Record<string, string> = {
  "/blog/": "bg-blue/70 hover:bg-blue",
  "/music/": "bg-pink/70 hover:bg-pink",
  "/macos-gaming/": "bg-green/70 hover:bg-green",
  "/about/": "bg-yellow/70 hover:bg-yellow",
};

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b-2 border-ink/10 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-wide items-center gap-4 px-4 py-3 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-retro text-2xl tracking-tight text-ink hover:opacity-80"
          aria-label={`${site.name} — home`}
        >
          <ThemeBadge className="h-8 w-8" />
          <span>{site.name}</span>
        </Link>
        <nav aria-label="Primary" className="ml-auto">
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
    </header>
  );
}
