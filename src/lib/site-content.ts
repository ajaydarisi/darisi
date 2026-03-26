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

export interface ServiceOffering {
  title: string;
  description: string;
  proof: string;
}

export interface TrustPoint {
  title: string;
  description: string;
}

export interface BestFitEntry {
  title: string;
  description: string;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

interface ContactContent {
  intro: string;
  formUnavailableTitle: string;
  formUnavailableMessage: string;
  gettingStartedAnswer: string;
  responsePromise: string;
  nextStepNote: string;
}

const SITE_URL = "https://darisi.in";

export const CONTACT_EMAIL = "ajaydarisi5@gmail.com";
export const FORMSPARK_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPARK_ENDPOINT?.trim() ?? "";
export const hasContactForm = FORMSPARK_ENDPOINT.length > 0;

export const serviceOfferings: ServiceOffering[] = [
  {
    title: "Web Apps",
    description:
      "Build polished product experiences for startups and growing teams that need more than a landing page.",
    proof:
      "Great for MVPs, client portals, admin dashboards, and customer-facing workflows that need thoughtful UX and dependable implementation.",
  },
  {
    title: "E-commerce & Marketplaces",
    description:
      "Create buying and selling experiences that balance conversion, operations, and long-term maintainability.",
    proof:
      "Best for catalog-heavy storefronts, rental flows, two-sided onboarding, proposals, messaging, and post-purchase operations.",
  },
  {
    title: "Internal Tools & Admin Systems",
    description:
      "Replace spreadsheets and disconnected workflows with focused internal software your team can actually rely on.",
    proof:
      "Ideal for inventory dashboards, reports, vouchers, approvals, role-based access, and day-to-day operational visibility.",
  },
];

export const trustPoints: TrustPoint[] = [
  {
    title: "Direct collaboration from strategy to launch",
    description:
      "You work directly with Ajay through discovery, interface decisions, implementation, and launch so context stays intact.",
  },
  {
    title: "Replies within 24 hours",
    description:
      "Communication stays async-friendly with clear updates, fast answers, and fewer meetings just to stay aligned.",
  },
  {
    title: "30 days of post-launch support included",
    description:
      "I stay involved after release to smooth out bugs, polish rough edges, and make handoff feel calm instead of abrupt.",
  },
];

export const bestFitEngagements: BestFitEntry[] = [
  {
    title: "Startups shipping a serious first version",
    description:
      "When you need a focused MVP or a clearer v2 without dragging discovery, design, and build across multiple freelancers.",
  },
  {
    title: "E-commerce brands improving how they sell",
    description:
      "Custom storefronts, rental flows, category navigation, and conversion-focused shopping experiences with real operational needs behind them.",
  },
  {
    title: "Marketplaces managing two-sided complexity",
    description:
      "Projects that need onboarding, proposals, messaging, dashboards, and role-aware product decisions to feel simple for both sides.",
  },
  {
    title: "Internal tools replacing spreadsheets and manual ops",
    description:
      "Admin systems, inventory views, reports, and process-heavy workflows that need structure, clarity, and room to grow.",
  },
];

export const bestFitBoundary =
  "I am usually not the right fit for design-only requests, hourly ticket queues, or rushed overnight rescues. The work is strongest when I can own a product outcome end to end.";

export const contactProjectTypes = [
  "Web App",
  "E-commerce / Marketplace",
  "Internal Tool / Admin System",
  "Product Refresh",
  "Not sure yet",
] as const;

export const contactTimelineOptions = [
  "ASAP",
  "Within 2-4 weeks",
  "Within 1-2 months",
  "More than 2 months out",
] as const;

export const projects: ProjectEntry[] = [
  {
    title: "Bhagyalakshmi Future Gold",
    category: "E-commerce",
    summary:
      "Bilingual jewelry storefront for a rental-first business that needed premium merchandising, browsing, and smoother checkout.",
    problem:
      "The experience had to feel trustworthy for wedding shoppers while handling catalog depth, rentals, and regional language support.",
    role:
      "Product design, front-end build, admin workflows, bilingual UX, and Razorpay-backed purchase flows.",
    outcome:
      "Launched a polished storefront with English and Telugu support, rental-led merchandising, and cleaner purchase paths.",
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
    title: "Market Place",
    category: "Marketplace",
    summary:
      "Two-sided freelance marketplace built to help clients post projects and help developers respond with clear proposals.",
    problem:
      "The product needed to make a complex two-sided flow feel simple from onboarding through messaging and project handoff.",
    role:
      "Product design, application architecture, role-based onboarding, proposal workflows, and in-product communication patterns.",
    outcome:
      "Shipped a live marketplace experience with project posting, proposals, messaging, and role-aware navigation.",
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
      "Information architecture, dashboard design, operational workflows, reporting UX, and internal product implementation.",
    outcome:
      "Delivered a structured internal dashboard for vouchers, stock summaries, receivables, and financial reporting views.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "shadcn/ui"],
    action: {
      href: "#contact",
      label: "Request a walkthrough",
      helper: "Private product walkthrough available on request.",
    },
    image: "/screenshots/textile.webp",
    gradient: "from-emerald-500/20 via-primary/10 to-teal-900/20",
  },
];

const baseFaqs: FaqEntry[] = [
  {
    question: "Are you a good fit for my project?",
    answer:
      "I am a strong fit when you need one person to shape the product direction, design the experience, and ship the build. The sweet spot is web apps, e-commerce, marketplaces, and internal tools. If you only need isolated design files or an hourly ticket queue, I will probably point you in a different direction.",
  },
  {
    question: "What is your typical timeline?",
    answer:
      "Most scoped projects land in the 4-8 week range, depending on how much product thinking, interface work, and implementation are involved. After a short discovery conversation, I will give you a realistic timeline instead of a vague estimate.",
  },
  {
    question: "How do revisions work?",
    answer:
      "I work in visible milestones and share progress early, so revisions happen before surprises stack up. Each project includes structured feedback rounds, and we use them to sharpen the product rather than restart from scratch.",
  },
  {
    question: "How do you price projects?",
    answer:
      "Most engagements are fixed-fee after I understand the scope, priorities, and timeline. If the work continues after launch, I can also support it through a lightweight maintenance or iteration plan.",
  },
  {
    question: "How do you handle collaboration across time zones?",
    answer:
      "The process is designed to be async-friendly. You will get clear written updates, decision points, and fast replies without needing daily calls to keep momentum.",
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
      ? "Tell me what you are building, who it is for, and what is blocking progress. I will reply within 24 hours with next steps or a few clarifying questions."
      : "The project form is temporarily unavailable, but I am still taking on new work. Email me directly and I will reply within 24 hours with next steps.",
    formUnavailableTitle: "Form temporarily unavailable",
    formUnavailableMessage: `Form submissions are temporarily unavailable right now. Email me directly at ${CONTACT_EMAIL} and I will reply within 24 hours.`,
    gettingStartedAnswer: contactFormEnabled
      ? "Use the contact form below or email me directly. I will respond within 24 hours with next steps."
      : `Email me directly at ${CONTACT_EMAIL}. The project form is temporarily unavailable, but I will still respond within 24 hours with next steps.`,
    responsePromise: "Replies within 24 hours.",
    nextStepNote:
      "After you submit, I will review the scope, reply with next steps, and keep the conversation low-pressure.",
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

export function buildJsonLd(contactFormEnabled = hasContactForm) {
  const faqs = getFaqEntries(contactFormEnabled);

  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Ajay Darisi",
      alternateName: "Darisi",
      url: SITE_URL,
      image: `${SITE_URL}/logo.svg`,
      description:
        "Ajay Darisi is a freelance product engineer and designer building web apps, e-commerce experiences, and internal tools for startups and growing businesses.",
      jobTitle: "Freelance Product Engineer & Designer",
      sameAs: [
        "https://github.com/ajaydarisi",
        "https://linkedin.com/in/ajaydarisi",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Darisi",
      url: SITE_URL,
      description:
        "Ajay Darisi builds web apps, e-commerce experiences, and internal tools through Darisi.",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Web App, E-commerce, and Internal Tool Development",
      provider: {
        "@type": "Person",
        name: "Ajay Darisi",
        url: SITE_URL,
      },
      description:
        "Freelance product engineering, product design, and front-end development for web apps, marketplaces, e-commerce, and internal tools.",
      areaServed: "Worldwide",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Ajay Darisi Selected Work",
      description:
        "Selected web apps, marketplaces, e-commerce experiences, and internal tools built by Ajay Darisi.",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            description: project.summary,
            url: project.action.external ? project.action.href : SITE_URL,
            creator: { "@type": "Person", name: "Ajay Darisi" },
          },
        })),
      },
    },
  ];
}
