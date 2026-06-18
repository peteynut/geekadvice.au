import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { readingTimeMinutes } from "./readingTime";

function parseFrontmatterDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value !== "string") return String(value ?? "");
  const trimmed = value.trim();
  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
  const dmyMatch = trimmed.match(/^(\d{2})-(\d{2})-(\d{4})/);
  if (dmyMatch) return `${dmyMatch[3]}-${dmyMatch[2]}-${dmyMatch[1]}`;
  return trimmed;
}

export type PostFrontmatter = {
  title: string;
  slug?: string;
  date: string | Date;
  description?: string;
  tags?: string[];
  cover?: string;
  draft?: boolean;
};

export type PostFrontmatterResolved = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover?: string;
  draft: boolean;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatterResolved;
  content: string;
  readingTime: number;
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");
const PAGES_DIR = path.join(process.cwd(), "src", "content", "pages");

function listMdx(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

function fileSlug(filename: string, fmSlug?: string): string {
  if (fmSlug) return fmSlug;
  return filename
    .replace(/\.(mdx|md)$/, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function readPostFile(filename: string): Post {
  const file = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  const slug = fileSlug(filename, fm.slug);

  const dateStr = parseFrontmatterDate(fm.date);

  return {
    slug,
    content,
    frontmatter: {
      title: fm.title ?? slug,
      date: dateStr,
      description: fm.description ?? "",
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      cover: fm.cover,
      draft: Boolean(fm.draft),
    },
    readingTime: readingTimeMinutes(content),
  };
}

export function getAllPosts(): Post[] {
  return listMdx(POSTS_DIR)
    .map(readPostFile)
    .filter((p) => !p.frontmatter.draft)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.tags.includes(tag));
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of getAllPosts()) {
    for (const t of p.frontmatter.tags) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export type PageDoc = { content: string; frontmatter: PostFrontmatter };

export function getPageDoc(slug: "about" | "music" | "macos-gaming"): PageDoc {
  const file = path.join(PAGES_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { content, frontmatter: data as PostFrontmatter };
}
