import type { ReactNode } from "react";
import clsx from "clsx";

type Variant = "purple" | "green" | "yellow" | "blue" | "pink";
const STYLES: Record<Variant, string> = {
  purple: "bg-purple text-ink",
  green: "bg-green text-ink",
  yellow: "bg-yellow text-ink",
  blue: "bg-blue text-ink",
  pink: "bg-pink text-ink",
};

export function pickVariant(seed: string): Variant {
  const variants: Variant[] = ["purple", "green", "yellow", "blue", "pink"];
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return variants[Math.abs(h) % variants.length];
}

export function TagPill({
  tag,
  variant,
  as = "span",
  className,
}: {
  tag: string;
  variant?: Variant;
  as?: "span" | "a";
  className?: string;
}) {
  const v = variant ?? pickVariant(tag);
  const base = clsx(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-mono",
    STYLES[v],
    className
  );
  if (as === "a") {
    return (
      <a href={`/tags/${encodeURIComponent(tag)}/`} className={base}>
        #{tag}
      </a>
    );
  }
  return <span className={base}>#{tag}</span>;
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <span className="inline-flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <TagPill key={t} tag={t} as="a" />
      ))}
    </span>
  );
}

export function Chip({
  children,
  variant = "purple",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-mono",
        STYLES[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
