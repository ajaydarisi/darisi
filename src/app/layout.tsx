import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  PLAUSIBLE_API_HOST,
  PLAUSIBLE_DOMAIN,
  hasPlausibleAnalytics,
} from "@/lib/analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://darisi.in";
const SITE_NAME = "Darisi";
const SITE_TITLE =
  "Ajay Darisi | Freelance Product Engineer for Web Apps, E-commerce & Internal Tools";
const SITE_DESCRIPTION =
  "Ajay Darisi builds web apps, e-commerce experiences, and internal tools for startups and growing businesses through Darisi.";

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Darisi",
    "Ajay Darisi",
    "freelance product engineer",
    "web app developer",
    "e-commerce developer",
    "marketplace developer",
    "internal tools developer",
    "Next.js freelancer",
    "product designer developer",
    "startup product engineer",
    "Darisi",
  ],
  authors: [{ name: "Ajay Darisi" }],
  creator: "Ajay Darisi",
  publisher: "Ajay Darisi",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Ajay Darisi through Darisi - freelance product engineer for web apps, e-commerce, and internal tools",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-dot-pattern">
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
