import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { Container } from "@/components/ui/Container";
import { PostCard } from "@/components/blog/PostCard";
import { Callout, YouTube, OutLink } from "@/components/blog/MDXComponents";
import { getPageDoc, getPostsByTag } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Music",
  description: "Music by Peteyyy on SoundCloud.",
};

const components = { Callout, YouTube, OutLink };

export default function MusicPage() {
  const page = getPageDoc("music");
  const musicPosts = getPostsByTag("music");
  return (
    <Container className="py-12">
      <article className="mx-auto max-w-prose">
        <h1 className="font-retro text-5xl text-ink md:text-6xl">Music</h1>
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
        <div className="mt-8 overflow-hidden rounded-2xl border border-ink/10 bg-surface">
          <iframe
            title="SoundCloud"
            width="100%"
            height="166"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(site.social.soundcloud)}&color=%231a1a2e&inverse=false&auto_play=false&show_user=true&show_reposts=false&show_teaser=true`}
          />
        </div>
        {musicPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 font-retro text-3xl text-ink">Posts about music</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {musicPosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </article>
    </Container>
  );
}
