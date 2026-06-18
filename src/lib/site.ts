export const site = {
  name: "GeekAdvice",
  author: "Peteyyy",
  description:
    "Technical advice that's easy to understand. Coding, game dev (Race Wars), music, and Mac gaming — from Peteyyy.",
  url: "https://geekadvice.au",
  ogImage: "/og.png",
  locale: "en-AU",
  social: {
    soundcloud: "https://soundcloud.com/moralion",
    racewars: "https://racewars.geekadvice.au",
    github: "https://github.com/peteynut",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/blog/", label: "Blog" },
    { href: "/music/", label: "Music" },
    { href: "/macos-gaming/", label: "MacOS Gaming" },
    { href: "/about/", label: "About" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
