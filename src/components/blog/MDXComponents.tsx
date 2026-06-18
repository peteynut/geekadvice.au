import Link from "next/link";

export function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warn" | "tip";
  children: React.ReactNode;
}) {
  const styles: Record<string, string> = {
    info: "bg-blue/40 border-blue",
    warn: "bg-yellow/40 border-yellow",
    tip: "bg-green/40 border-green",
  };
  return (
    <aside
      className={`not-prose my-6 rounded-lg border-l-4 p-4 text-sm ${styles[type]}`}
      role="note"
    >
      {children}
    </aside>
  );
}

export function YouTube({ id, title }: { id: string; title: string }) {
  return (
    <div className="not-prose my-6 aspect-video overflow-hidden rounded-lg border border-ink/10">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
        loading="lazy"
      />
    </div>
  );
}

export function OutLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="not-prose">
      {children}
    </Link>
  );
}
