export interface ProjectEntry {
  title: string;
  category: string;
  description: string;
  tech: string[];
  href: string;
  image: string;
  gradient: string;
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
}

const SITE_URL = "https://darisi.in";

export const CONTACT_EMAIL = "ajaydarisi5@gmail.com";
export const FORMSPARK_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPARK_ENDPOINT?.trim() ?? "";
export const hasContactForm = FORMSPARK_ENDPOINT.length > 0;

export const projects: ProjectEntry[] = [
  {
    title: "Bhagyalakshmi Future Gold",
    category: "E-Commerce",
    description:
      "Full-stack jewelry e-commerce platform with bilingual support (English & Telugu), admin panel, and Razorpay payment integration.",
    tech: ["Next.js", "Supabase", "Razorpay", "Tailwind CSS"],
    href: "https://bfg.darisi.in/",
    image: "/screenshots/bfg.png",
    gradient: "from-amber-500/20 via-primary/10 to-amber-900/20",
  },
  {
    title: "DevMarket",
    category: "Marketplace",
    description:
      "Two-sided freelance marketplace connecting clients with developers - project posting, proposals, built-in messaging, and role-based onboarding.",
    tech: ["Next.js", "Supabase", "TanStack Query", "TypeScript"],
    href: "https://market-place-for-websites.vercel.app/",
    image: "/screenshots/devmarket.png",
    gradient: "from-blue-500/20 via-primary/10 to-indigo-900/20",
  },
  {
    title: "Textile Inventory Manager",
    category: "Enterprise",
    description:
      "Tally-like accounting and inventory system for textile wholesalers with double-entry accounting, vouchers, stock tracking, and financial reports.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "shadcn/ui"],
    href: "https://market.darisi.in/",
    image: "/screenshots/textile.png",
    gradient: "from-emerald-500/20 via-primary/10 to-teal-900/20",
  },
];

const baseFaqs: FaqEntry[] = [
  {
    question: "What's your typical project timeline?",
    answer:
      "Most projects take 4-8 weeks from kickoff to launch, depending on scope. I'll give you a realistic timeline during our discovery call - no vague estimates.",
  },
  {
    question: "How do you handle revisions?",
    answer:
      "Each project includes two rounds of revisions. I'd rather get it right the first time through clear communication upfront, but the buffer is there if we need it.",
  },
  {
    question: "What's your tech stack?",
    answer:
      "I primarily work with Next.js, React, TypeScript, Supabase, and Tailwind CSS. I choose tools based on what's best for your project, not personal preference.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. I've worked with clients across time zones. I keep communication async-friendly with regular written updates and scheduled check-ins.",
  },
  {
    question: "What happens after launch?",
    answer:
      "I don't disappear after deployment. I offer 30 days of post-launch support included, and ongoing maintenance packages if you need them.",
  },
];

export function getContactContent(
  contactFormEnabled = hasContactForm
): ContactContent {
  return {
    intro: contactFormEnabled
      ? "Tell me about your project and I'll get back to you within 24 hours. No commitment, no pressure - just a conversation about what you're building."
      : "The project form is temporarily unavailable, but I'm still taking on new work. Email me directly and I'll get back to you within 24 hours.",
    formUnavailableTitle: "Form temporarily unavailable",
    formUnavailableMessage: `Form submissions are temporarily unavailable right now. Email me directly at ${CONTACT_EMAIL} and I'll get back to you within 24 hours.`,
    gettingStartedAnswer: contactFormEnabled
      ? "Fill out the contact form below or email me directly. I'll respond within 24 hours with next steps."
      : `Email me directly at ${CONTACT_EMAIL}. The project form is temporarily unavailable, but I'll still respond within 24 hours with next steps.`,
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
        "Freelance developer and designer crafting digital products, apps, platforms, and design systems with precision and purpose.",
      jobTitle: "Freelance Developer & Designer",
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
        "Ajay Darisi - freelance developer and designer. Build. Design. Launch.",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Digital Product Development",
      provider: {
        "@type": "Person",
        name: "Ajay Darisi",
        url: SITE_URL,
      },
      description:
        "Full-stack engineering, product design, app development, and design systems by Ajay Darisi.",
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
      name: "Darisi Portfolio",
      description: "Digital products and platforms built by Ajay Darisi.",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            url: project.href,
            creator: { "@type": "Person", name: "Ajay Darisi" },
          },
        })),
      },
    },
  ];
}
