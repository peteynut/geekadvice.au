import { site } from "@/lib/site";
import { Github, Music, Gamepad2 } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-surface">
      <div className="mx-auto grid max-w-wide gap-6 px-4 py-10 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-retro text-2xl text-ink">{site.name}</p>
          <p className="mt-2 text-sm text-muted">{site.description}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Elsewhere</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                className="inline-flex items-center gap-2 text-ink hover:underline"
                href={site.social.soundcloud}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Music className="h-4 w-4" /> SoundCloud
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 text-ink hover:underline"
                href={site.social.racewars}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Gamepad2 className="h-4 w-4" /> Race Wars
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 text-ink hover:underline"
                href={site.social.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Colophon</p>
          <p className="mt-3 text-sm text-muted">
            Built using Minimax and a bit of coffee.
          </p>
          <p className="mt-2 text-sm">
            <a className="underline decoration-purple decoration-2 underline-offset-4" href="/rss.xml">
              RSS feed
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="mx-auto flex max-w-wide items-center justify-between px-4 py-4 text-xs text-muted md:px-6">
          <p>
            &copy; {new Date().getFullYear()} {site.author}. All rights reserved.
          </p>
          <p className="font-mono">v0.1.0 &middot; built in the 90s spirit</p>
        </div>
      </div>
    </footer>
  );
}
