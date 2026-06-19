import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PostCard } from "@/components/blog/PostCard";
import { Chip } from "@/components/blog/TagPill";
import { getAllPosts } from "@/lib/content";
import { site } from "@/lib/site";
import { ArrowRight, Terminal } from "lucide-react";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 4);
  const [latest, ...rest] = posts;

  return (
    <Container>
      <section className="relative mt-6 overflow-hidden rounded-2xl border-2 border-ink/10 bg-surface/80 p-5 shadow-card backdrop-blur-sm sm:p-6 md:mt-10 md:rounded-3xl md:p-14">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple/40 via-blue/30 to-yellow/40" />
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink/70">
            <Terminal className="h-3.5 w-3.5" /> hello world_
          </p>
          <h1 className="mt-3 font-retro text-4xl tracking-tight text-ink sm:text-5xl md:text-7xl">
            Hi, I&apos;m Peteyyy.
            <br />
            <span className="text-ink/70">Welcome to {site.name}.</span>
          </h1>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/80 md:mt-5 md:text-lg">
            Technical advice that&apos;s easy to understand. Home of{" "}
            <Link
              href={site.social.racewars}
              className="underline decoration-green decoration-2 underline-offset-4"
            >
              Race Wars
            </Link>
            , music, coding, Mac gaming, and the occasional thing that I get excited about.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2.5 md:mt-7 md:gap-3">
            <Link
              href="/blog/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-mono text-bg hover:opacity-90 sm:w-auto"
            >
              Read the blog <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink/30 bg-yellow/60 px-4 py-2 text-sm font-mono text-ink hover:bg-yellow sm:w-auto"
            >
              About me
            </Link>
          </div>
        </div>
      </section>

      {latest && (
        <section className="mt-10 md:mt-14">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-retro text-3xl text-ink">Latest post</h2>
            <Link
              href="/blog/"
              className="font-mono text-sm text-ink underline decoration-purple decoration-2 underline-offset-4 hover:decoration-pink"
            >
              all posts &rarr;
            </Link>
          </div>
          <PostCard post={latest} featured />
        </section>
      )}

      {rest.length > 0 && (
        <section className="mt-10 md:mt-14">
          <h2 className="mb-4 font-retro text-2xl text-ink">More posts</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 grid gap-4 md:mt-16 md:gap-6 md:grid-cols-3">
        <Link
          href="/music/"
          className="group rounded-2xl border border-ink/10 bg-pink/30 p-5 transition-transform hover:-translate-y-0.5 md:p-6"
        >
          <Chip variant="pink">Music</Chip>
          <p className="mt-3 font-retro text-xl text-ink md:text-2xl">Beats, demos &amp; SoundCloud</p>
          <p className="mt-2 text-sm text-ink/70">Listen to what I&apos;ve been making.</p>
        </Link>
        <Link
          href="/macos-gaming/"
          className="group rounded-2xl border border-ink/10 bg-green/30 p-5 transition-transform hover:-translate-y-0.5 md:p-6"
        >
          <Chip variant="green">MacOS Gaming</Chip>
          <p className="mt-3 font-retro text-xl text-ink md:text-2xl">Games on Apple silicon</p>
          <p className="mt-2 text-sm text-ink/70">Posts about gaming on Mac.</p>
        </Link>
        <Link
          href="/about/"
          className="group rounded-2xl border border-ink/10 bg-blue/30 p-5 transition-transform hover:-translate-y-0.5 md:p-6"
        >
          <Chip variant="blue">About</Chip>
          <p className="mt-3 font-retro text-xl text-ink md:text-2xl">Who is this guy?</p>
          <p className="mt-2 text-sm text-ink/70">The story, the stack, the why.</p>
        </Link>
      </section>
    </Container>
  );
}
