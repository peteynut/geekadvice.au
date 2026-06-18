import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { Container } from "@/components/ui/Container";
import { Callout, YouTube, OutLink } from "@/components/blog/MDXComponents";
import { getPageDoc } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "About Peteyyy and GeekAdvice.",
};

const components = { Callout, YouTube, OutLink };

export default function AboutPage() {
  const page = getPageDoc("about");
  return (
    <Container className="py-12">
      <article className="mx-auto max-w-prose">
        <h1 className="font-retro text-5xl text-ink md:text-6xl">About</h1>
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
      </article>
    </Container>
  );
}
