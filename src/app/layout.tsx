import type { Metadata } from "next";
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
  "Darisi — Build. Design. Launch. | Creative Technology Studio";
const SITE_DESCRIPTION =
  "Darisi is a premium creative technology studio crafting digital products, apps, platforms, and design systems with precision and purpose. Build. Design. Launch.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Darisi",
    "Darisi studio",
    "Darisi digital agency",
    "creative technology studio",
    "digital product design",
    "full-stack development",
    "app development",
    "web development agency",
    "Next.js development",
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
        alt: "Darisi — Build. Design. Launch. Premium creative technology studio",
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
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
