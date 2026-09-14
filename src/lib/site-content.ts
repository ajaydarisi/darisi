import { buildPersonNode, buildWebSiteNode, entityIds, seoConfig } from "@/lib/seo";

export interface ProjectAction {
  href: string;
  label: string;
}

export interface ProjectEntry {
  id: string;
  caseStudyHref?: string;
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
  evidenceHref: string;
  evidenceLabel: string;
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
    evidenceHref: "/#devmarket",
    evidenceLabel: "Explore DevMarket",
    description:
      "Building product surfaces where UX and implementation stay connected — SaaS-style workflows, onboarding, dashboards, and role-aware interfaces.",
    tools: "Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query",
  },
  {
    title: "Internal Tools & Data",
    evidenceHref: "/#texledger",
    evidenceLabel: "Explore TexLedger",
    description:
      "Turning messy operational workflows into focused systems for CRM, approvals, reporting, inventory, and finance-heavy processes.",
    tools: "PostgreSQL, Supabase, schema design, reporting UX, admin systems",
  },
  {
    title: "Platform Layers",
    evidenceHref: "/blog/keycloak-vs-supabase-auth",
    evidenceLabel: "Read the authentication guide",
    description:
      "The plumbing that usually blocks a launch: payments, authentication, registration flows, and internationalization.",
    tools: "Razorpay, Keycloak, Supabase Auth, multi-language / i18n flows",
  },
];

export const projects: ProjectEntry[] = [
  {
    id: "bfg",
    caseStudyHref: "/blog/bilingual-jewelry-storefront-razorpay",
    title: "Bhagyalakshmi Future Gold",
    category: "E-commerce",
    summary:
      "A bilingual jewelry storefront for wedding shoppers, with rentals, catalog browsing, and checkout.",
    problem:
      "Wedding shoppers needed a trustworthy catalog for rentals and purchases in English and Telugu.",
    role:
      "I designed and built the storefront, admin workflows, bilingual experience, and Razorpay checkout.",
    outcome:
      "Shipped English and Telugu storefronts with rental-led merchandising and Razorpay purchase flows.",
    tech: ["Next.js", "Supabase", "Razorpay", "Tailwind CSS"],
    action: {
      href: "https://bfg.darisi.in/",
      label: "View live site",
    },
    image: "/screenshots/bfg.webp",
  },
  {
    id: "devmarket",
    caseStudyHref: "/blog/designing-two-sided-marketplace",
    title: "DevMarket",
    category: "Marketplace",
    summary:
      "A marketplace where clients post projects and developers respond with proposals.",
    problem:
      "Clients and developers needed clear paths from onboarding to proposals and project conversations.",
    role:
      "I designed the product and built its architecture, role-based onboarding, proposals, and messaging.",
    outcome:
      "Shipped project posting, proposals, messaging, and navigation tailored to each role.",
    tech: ["Next.js", "Supabase", "TanStack Query", "TypeScript"],
    action: {
      href: "https://market.darisi.in/",
      label: "View live product",
    },
    image: "/screenshots/devmarket.webp",
  },
  {
    id: "texledger",
    title: "TexLedger",
    category: "Internal Tool",
    summary:
      "An accounting and inventory workspace for a textile wholesaler, covering stock, vouchers, and reporting.",
    problem:
      "The team needed vouchers, stock movement, and financial reporting in one usable workspace.",
    role:
      "I designed and built the dashboard, operational workflows, and reporting views.",
    outcome:
      "Delivered an internal dashboard for vouchers, stock summaries, receivables, and financial reports.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "shadcn/ui"],
    note: "Internal tool for a textile wholesaler — not publicly accessible.",
    image: "/screenshots/textile.webp",
  },
];

/** Link to detailed case studies when available, otherwise to project evidence. */
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
        url: project.caseStudyHref
          ? `${SITE_URL}${project.caseStudyHref}`
          : project.action?.href ?? `${SITE_URL}/#${project.id}`,
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
