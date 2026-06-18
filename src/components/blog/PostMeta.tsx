import { format, parseISO } from "date-fns";
import { TagList } from "./TagPill";

export function PostMeta({
  date,
  tags,
  readingTime,
  className,
}: {
  date: string;
  tags: string[];
  readingTime: number;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted ${className ?? ""}`}>
      <time dateTime={date}>{format(parseISO(date), "dd-MM-yyyy")}</time>
      <span aria-hidden>·</span>
      <span>{readingTime} min read</span>
      {tags.length > 0 && (
        <>
          <span aria-hidden>·</span>
          <TagList tags={tags} />
        </>
      )}
    </div>
  );
}
