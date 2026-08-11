import { buildPersonNode, buildWebSiteNode, entityIds, seoConfig } from "@/lib/seo";

export interface ProjectAction {
  href: string;
  label: string;
}

export interface ProjectEntry {
  title: string;
  category: string;
  summary: string;
  problem: string;
  role: string;
  outcome: string;
  tech: string[];
  action?: ProjectAction;
  note?: string;
  image: string;
}

export interface SkillArea {
  title: string;
  description: string;
  tools: string;
}

const SITE_URL = seoConfig.siteUrl;
const PERSON_ID = entityIds.person;
const WEBSITE_ID = entityIds.website;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;

export const CONTACT_EMAIL = seoConfig.contactEmail;

export const skillAreas: SkillArea[] = [
  {
    title: "Product Web Apps",
    description:
      "Building product surfaces where UX and implementation stay connected — SaaS-style workflows, onboarding, dashboards, and role-aware interfaces.",
    tools: "Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query",
  },
  {
    title: "Internal Tools & Data",
    description:
      "Turning messy operational workflows into focused systems for CRM, approvals, reporting, inventory, and finance-heavy processes.",
    tools: "PostgreSQL, Supabase, schema design, reporting UX, admin systems",
  },
  {
    title: "Platform Layers",
    description:
      "The plumbing that usually blocks a launch: payments, authentication, registration flows, and internationalization.",
    tools: "Razorpay, Keycloak, Supabase Auth, multi-language / i18n flows",
  },
];

export const projects: ProjectEntry[] = [
  {
    title: "Bhagyalakshmi Future Gold",
    category: "E-commerce",
    summary:
      "Bilingual jewelry storefront for a rental-first business that needed premium merchandising, browsing, and a smoother checkout.",
    problem:
      "The experience had to feel trustworthy for wedding shoppers while handling catalog depth, rentals, and regional language support.",
    role:
      "I handled product design, front-end build, admin workflows, bilingual UX, and Razorpay-backed purchase flows.",
    outcome:
      "The result is a polished storefront with English and Telugu support, rental-led merchandising, and cleaner purchase paths.",
    tech: ["Next.js", "Supabase", "Razorpay", "Tailwind CSS"],
    action: {
      href: "https://bfg.darisi.in/",
      label: "View live site",
    },
    image: "/screenshots/bfg.webp",
  },
  {
    title: "DevMarket",
    category: "Marketplace",
    summary:
      "Two-sided marketplace built to help clients post projects and help developers respond with clear proposals.",
    problem:
      "The product needed to make a complex two-sided flow feel simple from onboarding through messaging and project handoff.",
    role:
      "I owned product design, application architecture, role-based onboarding, proposal workflows, and in-product communication patterns.",
    outcome:
      "It shipped as a live marketplace experience with project posting, proposals, messaging, and role-aware navigation.",
    tech: ["Next.js", "Supabase", "TanStack Query", "TypeScript"],
    action: {
      href: "https://market.darisi.in/",
      label: "View live product",
    },
    image: "/screenshots/devmarket.webp",
  },
  {
    title: "TexLedger",
    category: "Internal Tool",
    summary:
      "Accounting and inventory workspace for textile wholesalers who need faster operational visibility than spreadsheets and ledgers allow.",
    problem:
      "The system had to cover vouchers, stock movement, reporting, and finance-heavy workflows without overwhelming the team using it.",
    role:
      "I shaped the information architecture, dashboard design, operational workflows, reporting UX, and internal product implementation.",
    outcome:
      "The outcome is a structured internal dashboard for vouchers, stock summaries, receivables, and financial reporting views.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "shadcn/ui"],
    note: "Internal tool for a textile wholesaler — not publicly accessible.",
    image: "/screenshots/textile.webp",
  },
];

/** The projects are only ever described on the homepage — there is no
 *  standalone work index route. */
function buildWorkItemList() {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#selected-work`,
    name: `${seoConfig.personName} selected work`,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        image: `${SITE_URL}${project.image}`,
        url: project.action?.href ?? `${SITE_URL}/#work`,
        creator: {
          "@id": PERSON_ID,
        },
        keywords: project.tech.join(", "),
      },
    })),
  };
}

export function buildJsonLd() {
  const ogImageUrl = `${SITE_URL}${seoConfig.ogImagePath}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonNode(),
      buildWebSiteNode(),
      {
        "@type": "ProfilePage",
        "@id": WEBPAGE_ID,
        url: SITE_URL,
        name: seoConfig.title,
        description: seoConfig.description,
        inLanguage: "en-US",
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        mainEntity: {
          "@id": PERSON_ID,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: ogImageUrl,
        },
      },
      buildWorkItemList(),
    ],
  };
}
