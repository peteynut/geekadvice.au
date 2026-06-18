import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PostCard } from "@/components/blog/PostCard";
import { TagPill } from "@/components/blog/TagPill";
import { getAllPosts, getAllTags } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts on GeekAdvice.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <Container className="py-12">
      <header className="mb-10">
        <h1 className="font-retro text-5xl text-ink md:text-6xl">Blog</h1>
        <p className="mt-3 max-w-prose text-muted">
          {posts.length} {posts.length === 1 ? "post" : "posts"} on coding, game dev, music, and
          Mac gaming.
        </p>
      </header>

      {tags.length > 0 && (
        <nav aria-label="Filter by tag" className="mb-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">Tags</p>
          <ul className="flex flex-wrap gap-2">
            {tags.map(({ tag, count }) => (
              <li key={tag}>
                <Link
                  href={`/tags/${encodeURIComponent(tag)}/`}
                  className="inline-flex items-center gap-1.5"
                >
                  <TagPill tag={tag} as="span" />
                  <span className="font-mono text-xs text-muted">({count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </Container>
  );
}
