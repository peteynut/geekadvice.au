type Props = { className?: string };

export function ThemeBadge({ className }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="28" height="28" rx="6" fill="#c8b6ff" />
      <rect x="6" y="6" width="20" height="20" rx="4" fill="#fff3a8" />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="14"
        fontWeight="700"
        fill="#1a1a2e"
      >
        &gt;_
      </text>
    </svg>
  );
}
