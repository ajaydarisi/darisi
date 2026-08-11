import type { Metadata } from "next";
import {
  buildBreadcrumbJsonLd,
  buildPersonNode,
  buildWebSiteNode,
  entityIds,
  ogImage,
  seoConfig,
} from "@/lib/seo";

export interface BlogBriefItem {
  label: string;
  text: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  tag: string;
  datePublished: string;
  /** Set only when a published post is materially revised. Drives sitemap
   *  `lastmod` and the JSON-LD `dateModified`. */
  dateModified?: string;
  readingTime: string;
  brief: BlogBriefItem[];
}

const SITE_URL = seoConfig.siteUrl;

export const blogIndexTitle = "Blog | Darisi";
export const blogIndexDescription =
  "Practical writing on product web apps, internal systems, payments, and async delivery — drawn from real product work by Ajay Darisi.";

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "keycloak-vs-supabase-auth",
    title: "Keycloak vs. Supabase Auth: how to choose for your product",
    description:
      "An implementer's comparison of Keycloak and Supabase Auth: what each is actually for, where each one hurts, and a decision framework based on shipping both in client projects.",
    tag: "Guide",
    datePublished: "2026-07-12",
    readingTime: "7 min read",
    brief: [
      {
        label: "Who this is for",
        text: "Founders and technical leads picking an authentication system for a web product, or wondering whether the one they have will hold up.",
      },
      {
        label: "The short answer",
        text: "One product on a Supabase-style stack: use Supabase Auth. Multiple applications needing single sign-on, enterprise federation, or a self-hosted identity requirement: that is Keycloak territory. The mistake is picking the heavier tool for flexibility you never use.",
      },
    ],
  },
  {
    slug: "designing-two-sided-marketplace",
    title:
      "Designing a two-sided marketplace: onboarding, proposals, and messaging",
    description:
      "A case study on DevMarket: making a complex two-sided flow feel simple, from role-based onboarding through proposals, messaging, and role-aware navigation.",
    tag: "Case Study",
    datePublished: "2026-07-12",
    readingTime: "7 min read",
    brief: [
      {
        label: "Client",
        text: "DevMarket, a two-sided marketplace where clients post projects and developers respond with proposals.",
      },
      {
        label: "Problem",
        text: "The product needed to make a complex two-sided flow feel simple from onboarding through messaging and project handoff.",
      },
      {
        label: "Role",
        text: "Product design, application architecture, role-based onboarding, proposal workflows, and in-product communication patterns.",
      },
      {
        label: "Outcome",
        text: "A live marketplace experience with project posting, proposals, messaging, and role-aware navigation.",
      },
    ],
  },
  {
    slug: "bilingual-jewelry-storefront-razorpay",
    title:
      "Building a bilingual jewelry storefront with rentals and Razorpay",
    description:
      "A case study on Bhagyalakshmi Future Gold: designing for wedding-shopper trust, treating Telugu as first-class content, and shipping rental-led merchandising with Razorpay checkout.",
    tag: "Case Study",
    datePublished: "2026-07-12",
    readingTime: "7 min read",
    brief: [
      {
        label: "Client",
        text: "Bhagyalakshmi Future Gold, a rental-first jewelry business serving wedding shoppers in a Telugu-speaking market.",
      },
      {
        label: "Problem",
        text: "The storefront had to feel trustworthy for high-stakes wedding purchases while handling catalog depth, rentals as the primary offer, and full English and Telugu support.",
      },
      {
        label: "Role",
        text: "Product design, front-end build, admin workflows, bilingual UX, and Razorpay-backed purchase flows.",
      },
      {
        label: "Outcome",
        text: "A polished storefront with English and Telugu support, rental-led merchandising, and cleaner purchase paths.",
      },
    ],
  },
  {
    slug: "custom-internal-tools-vs-off-the-shelf",
    title: "Custom internal tools vs. off-the-shelf: when custom is worth it",
    description:
      "Most teams should start with off-the-shelf software. This guide covers the three situations where a custom internal tool earns its cost, and how to decide in a week.",
    tag: "Guide",
    datePublished: "2026-07-12",
    readingTime: "6 min read",
    brief: [
      {
        label: "Who this is for",
        text: "Founders and operations leads running a growing business on spreadsheets, ledgers, or a stack of SaaS subscriptions that no longer quite fits.",
      },
      {
        label: "The short answer",
        text: "Default to off-the-shelf. Go custom only when the workflow is core to how you operate, per-seat pricing scales against you, or your process genuinely does not fit the tools you have tried.",
      },
    ],
  },
  {
    slug: "async-projects-global-teams",
    title: "How I run async projects from Bengaluru with global teams",
    description:
      "An async collaboration approach for product teams across time zones: written updates, clear decision points, visible milestones, and very few meetings.",
    tag: "Process",
    datePublished: "2026-07-12",
    readingTime: "6 min read",
    brief: [
      {
        label: "Who this is for",
        text: "Teams in the US, Europe, or elsewhere working across a large time-zone gap and wondering how collaboration can stay clear and dependable.",
      },
      {
        label: "The short answer",
        text: "Async by default: written updates you can read on your schedule, decisions framed so they are easy to make, staging links for every milestone, and calls reserved for the moments that need them.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPostMeta {
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) {
    throw new Error(`Unknown blog post slug: ${slug}`);
  }
  return post;
}

/** The date a crawler should treat as this post's last meaningful change. */
export function postLastModified(post: BlogPostMeta): string {
  return post.dateModified ?? post.datePublished;
}

/** Newest post change, used as the blog index's `lastmod`. */
export const blogLastModified: string = blogPosts
  .map(postLastModified)
  .reduce((newest, date) => (date > newest ? date : newest));

export function formatPostDate(datePublished: string): string {
  // en-GB for "12 July 2026" — day-first, no comma, matching the post design.
  return new Date(`${datePublished}T00:00:00Z`).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function buildPostMetadata(post: BlogPostMeta): Metadata {
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} | Darisi`,
    description: post.description,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
    },
    openGraph: {
      type: "article",
      locale: seoConfig.locale,
      url,
      siteName: seoConfig.siteName,
      title: post.title,
      description: post.description,
      publishedTime: post.datePublished,
      modifiedTime: postLastModified(post),
      section: post.tag,
      authors: [seoConfig.siteUrl],
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage.url],
    },
  };
}

export function buildPostJsonLd(post: BlogPostMeta) {
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}/#article`,
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: url,
        datePublished: post.datePublished,
        dateModified: postLastModified(post),
        articleSection: post.tag,
        inLanguage: "en-US",
        image: ogImage.url,
        // `@id` references, not inline copies: this is the same Person the
        // homepage defines, and the same Blog the index defines.
        author: { "@id": entityIds.person },
        publisher: { "@id": entityIds.person },
        isPartOf: { "@id": entityIds.blog },
      },
      // Minimal Blog node so the post's `isPartOf` resolves in-document.
      {
        "@type": "Blog",
        "@id": entityIds.blog,
        name: blogIndexTitle,
        url: `${SITE_URL}/blog`,
      },
      buildPersonNode(),
      buildBreadcrumbJsonLd([
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
    ],
  };
}

export function buildBlogIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": entityIds.blog,
        name: blogIndexTitle,
        description: blogIndexDescription,
        url: `${SITE_URL}/blog`,
        inLanguage: "en-US",
        isPartOf: { "@id": entityIds.website },
        author: { "@id": entityIds.person },
        blogPost: blogPosts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${SITE_URL}/blog/${post.slug}/#article`,
          headline: post.title,
          url: `${SITE_URL}/blog/${post.slug}`,
          datePublished: post.datePublished,
          dateModified: postLastModified(post),
        })),
      },
      buildWebSiteNode(),
      buildPersonNode(),
      buildBreadcrumbJsonLd([{ name: "Blog", path: "/blog" }]),
    ],
  };
}
