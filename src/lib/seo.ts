import type { Metadata, Viewport } from "next";

export interface SeoConfig {
  siteUrl: string;
  siteName: string;
  personName: string;
  personAlternateName: string;
  contactEmail: string;
  title: string;
  description: string;
  shortDescription: string;
  jobTitle: string;
  ogImagePath: string;
  ogImageAlt: string;
  locale: string;
  language: string;
  location: {
    city: string;
    region: string;
    country: string;
    countryCode: string;
    label: string;
  };
  sameAs: string[];
  knowsAbout: string[];
  keywords: string[];
}

const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION?.trim() ?? "";
const bingSiteVerification = process.env.BING_SITE_VERIFICATION?.trim() ?? "";

const GITHUB_URL = "https://github.com/ajaydarisi";
const LINKEDIN_URL = "https://linkedin.com/in/ajaydarisi";

export const socialUrls = { github: GITHUB_URL, linkedin: LINKEDIN_URL };

export const seoConfig: SeoConfig = {
  siteUrl: "https://darisi.in",
  siteName: "Darisi",
  personName: "Ajay Darisi",
  personAlternateName: "Darisi",
  contactEmail: "contact@darisi.in",
  title: "Ajay Darisi — Software Engineer | Portfolio",
  description:
    "Ajay Darisi is a software engineer based in Bengaluru, India. Portfolio of product web apps, internal tools, and platform work across payments, authentication, and internationalization.",
  shortDescription:
    "Personal portfolio of Ajay Darisi, a software engineer in Bengaluru, India.",
  jobTitle: "Software Engineer",
  ogImagePath: "/og-image.png",
  ogImageAlt:
    "Ajay Darisi — software engineer portfolio: product web apps, internal tools, and platform work",
  locale: "en_US",
  language: "en",
  location: {
    city: "Bengaluru",
    region: "Karnataka",
    country: "India",
    countryCode: "IN",
    label: "Bengaluru, Karnataka, India",
  },
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  knowsAbout: [
    "Product web apps",
    "Internal systems",
    "Admin tools",
    "CRM workflows",
    "Payments integration",
    "Authentication",
    "Registration systems",
    "Internationalization",
    "Next.js",
    "TypeScript",
  ],
  keywords: [
    "Ajay Darisi",
    "Darisi",
    "software engineer",
    "software engineer portfolio",
    "Next.js developer",
    "TypeScript developer",
    "React developer",
    "internal tools developer",
    "payments integration",
    "software engineer Bengaluru",
  ],
};

const verification: Metadata["verification"] = {};

if (googleSiteVerification) {
  verification.google = googleSiteVerification;
}

if (bingSiteVerification) {
  verification.other = {
    "msvalidate.01": bingSiteVerification,
  };
}

export const siteViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F2EA" },
    { media: "(prefers-color-scheme: dark)", color: "#0F2724" },
  ],
};

export const siteMetadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: seoConfig.title,
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.personName, url: seoConfig.siteUrl }],
  creator: seoConfig.personName,
  publisher: seoConfig.personName,
  alternates: {
    canonical: seoConfig.siteUrl,
  },
  openGraph: {
    type: "website",
    locale: seoConfig.locale,
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.title,
    description: seoConfig.description,
    images: [
      {
        url: `${seoConfig.siteUrl}${seoConfig.ogImagePath}`,
        width: 1200,
        height: 630,
        alt: seoConfig.ogImageAlt,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.title,
    description: seoConfig.description,
    images: [`${seoConfig.siteUrl}${seoConfig.ogImagePath}`],
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
  ...(Object.keys(verification).length > 0 ? { verification } : {}),
};
