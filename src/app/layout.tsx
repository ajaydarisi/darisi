import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import {
  PLAUSIBLE_API_HOST,
  PLAUSIBLE_DOMAIN,
  hasPlausibleAnalytics,
} from "@/lib/analytics";
import { siteMetadata, siteViewport } from "@/lib/seo";

const inter = localFont({
  src: [
    {
      path: "./fonts/InterVariable.woff2",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./fonts/InterVariable-Italic.woff2",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-inter",
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
      className={inter.variable}
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
