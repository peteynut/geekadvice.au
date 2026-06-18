import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-muted">Error 404</p>
      <h1 className="mt-3 font-retro text-6xl text-ink md:text-7xl">Page not found</h1>
      <p className="mx-auto mt-4 max-w-prose text-muted">
        The page you&apos;re looking for has wandered off into the void. Try one of these instead:
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3 font-mono text-sm">
        <Link href="/" className="rounded-full bg-yellow/50 px-4 py-2 text-ink hover:bg-yellow">
          Home
        </Link>
        <Link href="/blog/" className="rounded-full bg-green/50 px-4 py-2 text-ink hover:bg-green">
          Blog
        </Link>
        <Link href="/about/" className="rounded-full bg-blue/50 px-4 py-2 text-ink hover:bg-blue">
          About
        </Link>
      </div>
    </Container>
  );
}
