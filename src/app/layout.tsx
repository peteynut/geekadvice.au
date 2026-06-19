import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { site } from "@/lib/site";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "../../public/fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Inter-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const jet = localFont({
  src: [
    { path: "../../public/fonts/JetBrainsMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/JetBrainsMono-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-jet",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

const vt323 = localFont({
  src: [{ path: "../../public/fonts/VT323-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-vt323",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.description}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: site.locale,
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: site.url,
    types: { "application/rss+xml": `${site.url}/rss.xml` },
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jet.variable} ${vt323.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('ga-theme');var p=s==='light'||s==='dark'?s:'system';var r=document.documentElement;r.dataset.themePreference=p;r.dataset.theme=p==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;}catch(e){}})();`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-yellow focus:px-3 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
