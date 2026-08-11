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

/**
 * Last material change to the homepage content.
 *
 * The sitemap's `lastmod` for `/` reads from here. It is set by hand — not
 * from the build clock — because a build-time date would claim the page
 * changed on every deploy, and Google discards `lastmod` it finds unreliable.
 * Bump this when project entries, skill areas, or the hero/story copy
 * actually change; leave it alone for styling and asset work.
 */
export const siteContentRevised = "2026-08-07";

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
  // Served by src/app/opengraph-image.tsx, generated at build from this config.
  // Extensionless by Next's file convention; the `?<hash>` Next appends to the
  // meta tags is only a cache-buster, so this bare path is stable for JSON-LD.
  ogImagePath: "/opengraph-image",
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

/**
 * The one place the social card is described. Every page must spread this into
 * its own `openGraph`, because a child route's `openGraph` block replaces the
 * parent's wholesale — relying on inheritance (or on the opengraph-image file
 * convention cascading) silently leaves child pages with no card at all.
 */
export const ogImage = {
  url: `${seoConfig.siteUrl}${seoConfig.ogImagePath}`,
  width: 1200,
  height: 630,
  alt: seoConfig.ogImageAlt,
  type: "image/png",
} as const;

/**
 * Canonical `@id`s for the site's structured-data entities. Shared so a post's
 * author resolves to the *same* Person node the homepage defines rather than a
 * detached duplicate — one entity in the graph, not one per page.
 */
export const entityIds = {
  person: `${seoConfig.siteUrl}/#person`,
  website: `${seoConfig.siteUrl}/#website`,
  blog: `${seoConfig.siteUrl}/blog/#blog`,
} as const;

/**
 * The Person entity, emitted in full on every page that references it.
 *
 * A bare `{"@id": ...}` reference is only resolvable when the target node is in
 * the same document, and Google requires `author.name` to be present for
 * Article rich results. Repeating the node under one stable `@id` gives both:
 * the required properties locally, and a single consolidated entity globally.
 */
export function buildPersonNode() {
  return {
    "@type": "Person",
    "@id": entityIds.person,
    name: seoConfig.personName,
    alternateName: seoConfig.personAlternateName,
    url: seoConfig.siteUrl,
    image: `${seoConfig.siteUrl}${seoConfig.ogImagePath}`,
    description: seoConfig.description,
    email: `mailto:${seoConfig.contactEmail}`,
    jobTitle: seoConfig.jobTitle,
    sameAs: seoConfig.sameAs,
    knowsAbout: seoConfig.knowsAbout,
    homeLocation: {
      "@type": "Place",
      name: seoConfig.location.label,
      address: {
        "@type": "PostalAddress",
        addressLocality: seoConfig.location.city,
        addressRegion: seoConfig.location.region,
        addressCountry: seoConfig.location.countryCode,
      },
    },
  };
}

/** Emitted alongside anything that points at `#website`, for the same reason. */
export function buildWebSiteNode() {
  return {
    "@type": "WebSite",
    "@id": entityIds.website,
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    description: seoConfig.shortDescription,
    inLanguage: seoConfig.language,
    publisher: { "@id": entityIds.person },
  };
}

/** Home › … trail, rendered by Google directly in the result snippet. */
export function buildBreadcrumbJsonLd(
  trail: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${seoConfig.siteUrl}${crumb.path === "/" ? "" : crumb.path}`,
      }),
    ),
  };
}

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
    types: {
      "application/rss+xml": `${seoConfig.siteUrl}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: seoConfig.locale,
    url: seoConfig.siteUrl,
    siteName: seoConfig.siteName,
    title: seoConfig.title,
    description: seoConfig.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.title,
    description: seoConfig.description,
    images: [ogImage.url],
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
