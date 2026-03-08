import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const SITE_URL = "https://darisi.in";

const jsonLd = [
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
      "Ajay Darisi — freelance developer and designer. Build. Design. Launch.",
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
    mainEntity: [
      {
        "@type": "Question",
        name: "What's your typical project timeline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most projects take 4–8 weeks from kickoff to launch, depending on scope. I'll give you a realistic timeline during our discovery call — no vague estimates.",
        },
      },
      {
        "@type": "Question",
        name: "How do you handle revisions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each project includes two rounds of revisions. I'd rather get it right the first time through clear communication upfront, but the buffer is there if we need it.",
        },
      },
      {
        "@type": "Question",
        name: "What's your tech stack?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I primarily work with Next.js, React, TypeScript, Supabase, and Tailwind CSS. I choose tools based on what's best for your project, not personal preference.",
        },
      },
      {
        "@type": "Question",
        name: "What happens after launch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I don't disappear after deployment. I offer 30 days of post-launch support included, and ongoing maintenance packages if you need them.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get started?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Fill out the contact form or email me directly. I'll respond within 24 hours with next steps.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Darisi Portfolio",
    description: "Digital products and platforms built by Ajay Darisi.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "CreativeWork",
            name: "Bhagyalakshmi Future Gold",
            description:
              "Full-stack jewelry e-commerce platform with bilingual support, admin panel, and Razorpay payment integration.",
            url: "https://bfg.darisi.in/",
            creator: { "@type": "Person", name: "Ajay Darisi" },
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "CreativeWork",
            name: "DevMarket",
            description:
              "Two-sided freelance marketplace connecting clients with developers.",
            url: "https://market-place-for-websites.vercel.app/",
            creator: { "@type": "Person", name: "Ajay Darisi" },
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "CreativeWork",
            name: "Textile Inventory Manager",
            description:
              "Tally-like accounting and inventory system for textile wholesalers.",
            url: "https://textile-inventory-app.vercel.app/",
            creator: { "@type": "Person", name: "Ajay Darisi" },
          },
        },
      ],
    },
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Work />
        <Stats />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
