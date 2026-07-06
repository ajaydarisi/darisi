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
  serviceName: string;
  serviceType: string;
  jobTitle: string;
  ogImagePath: string;
  ogImageAlt: string;
  locale: string;
  language: string;
  areaServed: string;
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

export const seoConfig: SeoConfig = {
  siteUrl: "https://darisi.in",
  siteName: "Darisi",
  personName: "Ajay Darisi",
  personAlternateName: "Darisi",
  contactEmail: "ajay@darisi.in",
  title:
    "Freelance Software Engineer for Web Apps, Internal Systems & Platform Features | Darisi",
  description:
    "Ajay Darisi is a freelance software engineer based in Bengaluru, India, helping teams worldwide ship product web apps, internal systems, payments, auth, and internationalization-heavy software through Darisi.",
  shortDescription:
    "Darisi is Ajay Darisi's freelance software engineering practice for product web apps, internal systems, and platform features.",
  serviceName:
    "Freelance Software Engineering for Web Apps, Internal Systems & Platform Features",
  serviceType:
    "Freelance Software Engineering for Web Apps, Internal Systems, Payments, Auth, and Internationalization",
  jobTitle: "Freelance Software Engineer",
  ogImagePath: "/og-image.png",
  ogImageAlt:
    "Darisi by Ajay Darisi - freelance software engineer for web apps, internal systems, and platform features",
  locale: "en_US",
  language: "en",
  areaServed: "Worldwide",
  location: {
    city: "Bengaluru",
    region: "Karnataka",
    country: "India",
    countryCode: "IN",
    label: "Bengaluru, Karnataka, India",
  },
  sameAs: [
    "https://github.com/ajaydarisi",
    "https://linkedin.com/in/ajaydarisi",
  ],
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
    "freelance software engineer",
    "product web apps freelancer",
    "internal systems developer",
    "internal tools developer",
    "payments integration developer",
    "authentication developer",
    "internationalization developer",
    "Next.js freelancer",
    "TypeScript freelancer",
    "software engineer Bengaluru",
    "freelance developer India",
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
  themeColor: "#0B0F0E",
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
