import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Caveat, DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import {
  PLAUSIBLE_API_HOST,
  PLAUSIBLE_DOMAIN,
  hasPlausibleAnalytics,
} from "@/lib/analytics";
import { siteMetadata, siteViewport } from "@/lib/seo";

// Both families are applied to <html> below so every route can reach either
// through a CSS variable, but next/font auto-preloads (`<link rel=preload>`)
// whichever ones are applied at that scope — on every route, regardless of
// whether that page renders them. Only `--font-dm-sans` (the body font,
// `--font-sans`) and `--font-caveat` (the hand-written accents used across
// the homepage and blog) are ever rendered anywhere on the site now that
// `/work` — the only consumer of DM Mono and Source Serif 4 — is gone, so
// both stay `preload`d by default.

// Fallback-only: sits behind --font-dm-sans in the --font-sans stack purely as
// insurance if the self-hosted DM Sans face ever fails to load.
const inter = Inter({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "variable",
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

// DM Sans and Caveat were previously loaded via a
// `@import url(fonts.googleapis.com/...)` in globals.css. Tailwind v4's CSS
// bundler (Lightning CSS) doesn't fetch remote @import targets — it silently
// dropped the rule, so neither ever loaded and both were rendering on their
// fallback the whole time. next/font/google self-hosts them the same way
// Inter already is above, so this fixes it for good.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-dm-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-caveat",
  display: "swap",
});

export const viewport: Viewport = siteViewport;

export const metadata: Metadata = siteMetadata;

const themeInitScript = `
(function() {
  var theme = "dark";
  try {
    var storedTheme = window.localStorage.getItem("darisi-theme");
    theme = storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  } catch (error) {
    theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  document.documentElement.dataset.theme = theme;
  var themeColor = theme === "light" ? "#F6F2EA" : "#0F2724";
  document.querySelectorAll('meta[name="theme-color"]').forEach(function (themeColorMeta) {
    themeColorMeta.setAttribute("content", themeColor);
    themeColorMeta.removeAttribute("media");
  });
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} ${caveat.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {hasPlausibleAnalytics ? (
          <Script
            defer
            data-domain={PLAUSIBLE_DOMAIN}
            src={`${PLAUSIBLE_API_HOST}/js/script.js`}
            strategy="afterInteractive"
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}
