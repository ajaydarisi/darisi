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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-dot-pattern">
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
