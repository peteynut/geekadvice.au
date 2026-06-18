import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { Container } from "@/components/ui/Container";
import { PostMeta } from "@/components/blog/PostMeta";
import { Callout, YouTube, OutLink } from "@/components/blog/MDXComponents";
import { getAllSlugs, getAllPosts, getPostBySlug } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
      url: `${site.url}/blog/${post.slug}/`,
    },
  };
}

const mdxComponents = {
  Callout,
  YouTube,
  OutLink,
};

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? all[idx - 1] : undefined;
  const next = idx < all.length - 1 ? all[idx + 1] : undefined;

  return (
    <Container className="py-12">
      <article className="mx-auto max-w-prose">
        <Link
          href="/blog/"
          className="font-mono text-sm text-ink underline decoration-purple decoration-2 underline-offset-4 hover:decoration-pink"
        >
          &larr; all posts
        </Link>
        <h1 className="mt-4 font-retro text-5xl leading-tight text-ink md:text-6xl">
          {post.frontmatter.title}
        </h1>
        <PostMeta
          date={post.frontmatter.date}
          tags={post.frontmatter.tags}
          readingTime={post.readingTime}
          className="mt-4"
        />
        <div className="prose mt-8">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  [
                    rehypePrettyCode,
                    {
                      theme: "github-dark",
                      keepBackground: true,
                    },
                  ],
                ],
              },
            }}
          />
        </div>
      </article>

      <nav
        aria-label="More posts"
        className="mx-auto mt-16 grid max-w-prose gap-4 border-t border-ink/10 pt-8 md:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/blog/${prev.slug}/`}
            className="group rounded-lg border border-ink/10 p-4 transition-transform hover:-translate-y-0.5"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Newer</p>
            <p className="mt-1 font-retro text-xl text-ink group-hover:underline">{prev.frontmatter.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/blog/${next.slug}/`}
            className="group rounded-lg border border-ink/10 p-4 text-right transition-transform hover:-translate-y-0.5"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted">Older</p>
            <p className="mt-1 font-retro text-xl text-ink group-hover:underline">{next.frontmatter.title}</p>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </Container>
  );
}
