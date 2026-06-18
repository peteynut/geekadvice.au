type Props = {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
};

export function PageTitle({ as = "h1", children, className }: Props) {
  const Tag = as;
  return (
    <Tag
      className={
        "font-retro text-4xl tracking-tight text-ink md:text-5xl " + (className ?? "")
      }
    >
      {children}
    </Tag>
  );
}
