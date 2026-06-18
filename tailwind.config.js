/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        ink: "var(--color-text)",
        muted: "var(--color-muted)",
        purple: "var(--color-purple)",
        green: "var(--color-green)",
        yellow: "var(--color-yellow)",
        blue: "var(--color-blue)",
        pink: "var(--color-pink)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jet)", "ui-monospace", "monospace"],
        retro: ["var(--font-vt323)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "72ch",
        wide: "1100px",
      },
      boxShadow: {
        card: "0 1px 0 rgba(26,26,46,0.06), 0 8px 24px -16px rgba(26,26,46,0.12)",
        cardHover: "0 1px 0 rgba(26,26,46,0.08), 0 16px 40px -20px rgba(26,26,46,0.18)",
      },
    },
  },
  plugins: [],
};
