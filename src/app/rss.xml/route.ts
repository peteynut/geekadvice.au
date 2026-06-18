import { Feed } from "feed";
import { getAllPosts } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();
  const feed = new Feed({
    title: site.name,
    description: site.description,
    id: site.url,
    link: site.url,
    language: "en",
    favicon: `${site.url}/favicon.svg`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${site.author}`,
    author: { name: site.author, link: site.url },
    feedLinks: { rss2: `${site.url}/rss.xml` },
  });

  for (const post of posts.slice(0, 20)) {
    const url = `${site.url}/blog/${post.slug}/`;
    feed.addItem({
      title: post.frontmatter.title,
      id: url,
      link: url,
      description: post.frontmatter.description,
      date: new Date(post.frontmatter.date),
      category: post.frontmatter.tags.map((t) => ({ name: t })),
    });
  }

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
