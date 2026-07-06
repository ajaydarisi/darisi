import { seoConfig } from "@/lib/seo";

export interface ProjectAction {
  href: string;
  label: string;
  external?: boolean;
  helper?: string;
}

export interface ProjectEntry {
  title: string;
  category: string;
  summary: string;
  problem: string;
  role: string;
  outcome: string;
  tech: string[];
  action: ProjectAction;
  image: string;
  gradient: string;
}

export interface ResultHighlight {
  value: string;
  label: string;
}

export interface TrustPoint {
  title: string;
  description: string;
}

export interface ServiceFocusArea {
  title: string;
  description: string;
  examples: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface ContactContent {
  intro: string;
  formUnavailableTitle: string;
  formUnavailableMessage: string;
  gettingStartedAnswer: string;
  responsePromise: string;
  nextStepNote: string;
  quickEmailLabel: string;
  quickEmailHelper: string;
}

const SITE_URL = seoConfig.siteUrl;
const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;
const SERVICE_ID = `${SITE_URL}/#service`;
const WORK_ID = `${SITE_URL}/#selected-work`;
const FAQ_ID = `${SITE_URL}/#faq`;

export const CHATBOT_URL = "https://chat.darisi.in";
export const CONTACT_EMAIL = seoConfig.contactEmail;
export const FORMSPARK_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPARK_ENDPOINT?.trim() ?? "";
export const hasContactForm = FORMSPARK_ENDPOINT.length > 0;

export const heroProofStats: ResultHighlight[] = [
  {
    value: "One owner",
    label: "across product, UX, and build",
  },
  {
    value: "24h",
    label: "reply window",
  },
  {
    value: "30 days",
    label: "post-launch support",
  },
];

export const trustPoints: TrustPoint[] = [
  {
    title: "Direct collaboration from scope to launch",
    description:
      "You work directly with Ajay on scoping, interface decisions, implementation, and launch so context stays intact instead of getting lost in handoffs.",
  },
  {
    title: "Async-friendly delivery for global teams",
    description:
      "I work from Bengaluru with global teams and keep communication lightweight through fast replies, written updates, and practical decision points.",
  },
  {
    title: "Post-launch support that reduces risk",
    description:
      "I stay involved after launch to smooth out rough edges, fix issues, and make the first weeks of real usage feel calm instead of abrupt.",
  },
];

export const serviceFocusAreas: ServiceFocusArea[] = [
  {
    title: "Product Web Apps",
    description:
      "I design and build product web apps when you need more than a marketing site and want product thinking, UX, and implementation to stay connected.",
    examples:
      "Best for SaaS-style workflows, onboarding, client portals, dashboards, and role-aware product surfaces.",
  },
  {
    title: "Internal Systems & Admin Tools",
    description:
      "I turn messy internal workflows into focused systems for CRM, approvals, reporting, inventory, and finance-heavy operations.",
    examples:
      "Strong fit for CRM layers, approvals, reporting, inventory, vouchers, admin systems, and finance-heavy workflows.",
  },
  {
    title: "Payments, Auth & Platform Features",
    description:
      "I handle the platform layers that often block launch: payments, authentication, registration flows, and internationalization.",
    examples:
      "Includes payment gateway integrations, Keycloak and Supabase auth, multi-language flows, and platform features that need to scale calmly.",
  },
];

export const projects: ProjectEntry[] = [
  {
    title: "Bhagyalakshmi Future Gold",
    category: "E-commerce",
    summary:
      "Bilingual jewelry storefront for a rental-first business that needed premium merchandising, browsing, and smoother checkout.",
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
      external: true,
    },
    image: "/screenshots/bfg.webp",
    gradient: "from-amber-500/20 via-primary/10 to-amber-900/20",
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
      external: true,
    },
    image: "/screenshots/devmarket.webp",
    gradient: "from-blue-500/20 via-primary/10 to-indigo-900/20",
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
    action: {
      href: "#contact",
      label: "Request a walkthrough",
      helper: "Private walkthrough available on request.",
    },
    image: "/screenshots/textile.webp",
    gradient: "from-emerald-500/20 via-primary/10 to-teal-900/20",
  },
];

const baseFaqs: FaqEntry[] = [
  {
    question: "What kind of freelance software engineering work are you best at?",
    answer:
      "The best fit is product-grade web apps, internal systems, CRM and admin workflows, and platform features like payments, auth, registration, and internationalization. I am strongest when the work needs both product thinking and dependable engineering.",
  },
  {
    question: "Can you handle payments, auth, and internationalization in the same build?",
    answer:
      "Yes. That is one of the places where I create the most leverage. I can handle payment gateway integrations, registration systems, Keycloak or Supabase auth, and multi-language flows when the product needs them.",
  },
  {
    question: "Do you work solo or alongside in-house teams?",
    answer:
      "Both. Darisi is my personal freelance brand, so you work directly with me, but I can also plug into an existing team when the project needs collaboration rather than a clean handoff.",
  },
  {
    question: "What is a typical engagement like for a web app or internal tool?",
    answer:
      "Most projects start with a short discovery and scoping pass, then move into visible milestones for product direction, interface decisions, and implementation. I keep the process practical so scope, tradeoffs, and progress stay clear.",
  },
  {
    question: "What should I have ready before reaching out?",
    answer:
      "A rough goal, the audience, and what is currently blocking progress is enough to start. You do not need a polished spec, but it helps if someone on your side can make product decisions and keep momentum moving.",
  },
  {
    question: "How do you handle collaboration across time zones?",
    answer:
      "I work from Bengaluru, India, and the process is designed to be async-friendly for global teams. You will get clear written updates, decision points, and fast replies without needing daily calls to keep momentum.",
  },
  {
    question: "What happens after launch?",
    answer:
      "I include 30 days of post-launch support so bugs, polish, and handoff questions do not get dumped on your team the moment we go live. If you need ongoing support after that, we can scope it separately.",
  },
];

export function getContactContent(
  contactFormEnabled = hasContactForm
): ContactContent {
  return {
    intro: contactFormEnabled
      ? "Tell me what you are building, who it is for, and where things are stuck. I work from Bengaluru with global teams on product web apps, internal systems, payments, auth, and internationalization-heavy software. Rough answers are fine."
      : "The project form is temporarily unavailable, but I am still taking on new freelance software engineering work. Email me directly with a few lines of context and I will reply within 24 hours with next steps.",
    formUnavailableTitle: "Form temporarily unavailable",
    formUnavailableMessage: `Form submissions are temporarily unavailable right now. Email me directly at ${CONTACT_EMAIL} and I will reply within 24 hours.`,
    gettingStartedAnswer: contactFormEnabled
      ? "Use the contact form below or send a quick intro email. I will respond within 24 hours with next steps."
      : `Email me directly at ${CONTACT_EMAIL}. The project form is temporarily unavailable, but I will still respond within 24 hours with next steps.`,
    responsePromise: "Replies within 24 hours.",
    nextStepNote:
      "After you submit, I will review the scope, reply with the clearest next step I can offer, and keep the conversation low-pressure.",
    quickEmailLabel: "Prefer a quick intro email instead?",
    quickEmailHelper:
      "A few lines about the product, audience, blocker, and timeline are enough to start the conversation.",
  };
}

export function getFaqEntries(contactFormEnabled = hasContactForm): FaqEntry[] {
  return [
    ...baseFaqs,
    {
      question: "How do I get started?",
      answer: getContactContent(contactFormEnabled).gettingStartedAnswer,
    },
  ];
}

export const contactContent = getContactContent();
export const faqEntries = getFaqEntries();

// Real client testimonials. The Testimonials section renders nothing while this
// array is empty. Add genuine quotes with attribution here — do not use
// placeholder or fabricated quotes on the live site.
export const testimonials: Testimonial[] = [];

export function buildJsonLd(contactFormEnabled = hasContactForm) {
  const faqs = getFaqEntries(contactFormEnabled);
  const ogImageUrl = `${SITE_URL}${seoConfig.ogImagePath}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: seoConfig.personName,
        alternateName: seoConfig.personAlternateName,
        url: SITE_URL,
        image: ogImageUrl,
        description: seoConfig.description,
        email: `mailto:${CONTACT_EMAIL}`,
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
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: CONTACT_EMAIL,
            areaServed: seoConfig.areaServed,
            availableLanguage: ["English"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: seoConfig.siteName,
        url: SITE_URL,
        description: seoConfig.shortDescription,
        inLanguage: seoConfig.language,
        publisher: {
          "@id": PERSON_ID,
        },
      },
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: SITE_URL,
        name: seoConfig.title,
        description: seoConfig.description,
        inLanguage: "en-US",
        isPartOf: {
          "@id": WEBSITE_ID,
        },
        about: [
          {
            "@id": PERSON_ID,
          },
          {
            "@id": SERVICE_ID,
          },
        ],
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: ogImageUrl,
        },
      },
      {
        "@type": "Service",
        "@id": SERVICE_ID,
        name: seoConfig.serviceName,
        serviceType: seoConfig.serviceType,
        url: SITE_URL,
        description: seoConfig.description,
        provider: {
          "@id": PERSON_ID,
        },
        areaServed: seoConfig.areaServed,
        availableLanguage: ["English"],
      },
      {
        "@type": "ItemList",
        "@id": WORK_ID,
        name: `${seoConfig.personName} selected work`,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            description: project.summary,
            image: `${SITE_URL}${project.image}`,
            url: project.action.external
              ? project.action.href
              : `${SITE_URL}/#contact`,
            creator: {
              "@id": PERSON_ID,
            },
            keywords: project.tech.join(", "),
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": FAQ_ID,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
