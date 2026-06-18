import Link from "next/link";
import type { Post } from "@/lib/content";
import { PostMeta } from "./PostMeta";

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article
      className={
        "group relative rounded-2xl border border-ink/10 bg-surface p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-cardHover " +
        (featured ? "md:p-8" : "")
      }
    >
      <h3
        className={
          "font-retro tracking-tight text-ink group-hover:underline decoration-purple decoration-2 underline-offset-4 " +
          (featured ? "text-4xl md:text-5xl" : "text-2xl")
        }
      >
        <Link
          href={`/blog/${post.slug}/`}
          className="before:absolute before:inset-0 before:z-10 before:content-[''] before:rounded-2xl"
        >
          {post.frontmatter.title}
        </Link>
      </h3>
      <PostMeta
        date={post.frontmatter.date}
        tags={post.frontmatter.tags}
        readingTime={post.readingTime}
        className="mt-2 relative z-20"
      />
      {post.frontmatter.description && (
        <p className="mt-4 text-ink/80 leading-relaxed">{post.frontmatter.description}</p>
      )}
      <div className="mt-5 relative z-20">
        <Link
          href={`/blog/${post.slug}/`}
          className="text-sm font-mono text-ink underline decoration-green decoration-2 underline-offset-4 hover:decoration-pink"
        >
          read more &rarr;
        </Link>
      </div>
    </article>
  );
}
