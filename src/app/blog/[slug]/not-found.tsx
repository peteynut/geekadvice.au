import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-muted">Error 404</p>
      <h1 className="mt-3 font-retro text-5xl text-ink md:text-6xl">Post not found</h1>
      <p className="mx-auto mt-4 max-w-prose text-muted">
        That post doesn&apos;t exist (or is still a draft).
      </p>
      <Link
        href="/blog/"
        className="mt-8 inline-block rounded-full bg-yellow/60 px-4 py-2 font-mono text-sm text-ink hover:bg-yellow"
      >
        &larr; all posts
      </Link>
    </Container>
  );
}
