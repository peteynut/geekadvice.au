import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { Container } from "@/components/ui/Container";
import { PostCard } from "@/components/blog/PostCard";
import { Callout, YouTube, OutLink } from "@/components/blog/MDXComponents";
import { getPageDoc, getPostsByTag } from "@/lib/content";

export const metadata: Metadata = {
  title: "MacOS Gaming",
  description: "Gaming on macOS — Apple silicon, Game Porting Toolkit, what works.",
};

const components = { Callout, YouTube, OutLink };

export default function MacosGamingPage() {
  const page = getPageDoc("macos-gaming");
  const posts = getPostsByTag("macos-gaming");
  return (
    <Container className="py-12">
      <article className="mx-auto max-w-prose">
        <h1 className="font-retro text-5xl text-ink md:text-6xl">MacOS Gaming</h1>
        <div className="prose mt-8">
          <MDXRemote
            source={page.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypePrettyCode, { theme: "github-dark", keepBackground: true }],
                ],
              },
            }}
          />
        </div>
        {posts.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 font-retro text-3xl text-ink">Latest Mac gaming posts</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </article>
    </Container>
  );
}
