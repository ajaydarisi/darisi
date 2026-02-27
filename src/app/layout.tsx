import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://darisi.in";
const SITE_NAME = "Darisi";
const SITE_TITLE =
  "Darisi — Build. Design. Launch. | Ajay Darisi, Freelance Developer & Designer";
const SITE_DESCRIPTION =
  "I'm Ajay Darisi — a freelance developer and designer crafting digital products, apps, platforms, and design systems with precision and purpose. Available for hire.";

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
    "freelance developer",
    "freelance designer",
    "freelance consultant",
    "digital product design",
    "full-stack developer for hire",
    "app development freelancer",
    "Next.js developer",
    "design systems",
    "Build Design Launch",
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
        alt: "Darisi — Build. Design. Launch. Ajay Darisi, freelance developer and designer",
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
      <body className="bg-dot-pattern">{children}</body>
    </html>
  );
}
