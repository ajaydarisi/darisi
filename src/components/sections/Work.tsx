"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const projects = [
  {
    title: "Bhagyalakshmi Future Gold",
    category: "E-Commerce",
    description:
      "Full-stack jewelry e-commerce platform with bilingual support (English & Telugu), admin panel, and Razorpay payment integration.",
    tech: ["Next.js", "Supabase", "Razorpay", "Tailwind CSS"],
    href: "https://bfg.darisi.in/",
    gradient: "from-amber-500/20 via-primary/10 to-amber-900/20",
  },
  {
    title: "DevMarket",
    category: "Marketplace",
    description:
      "Two-sided freelance marketplace connecting clients with developers — project posting, proposals, built-in messaging, and role-based onboarding.",
    tech: ["Next.js", "Supabase", "TanStack Query", "TypeScript"],
    href: "https://market-place-for-websites.vercel.app/",
    gradient: "from-blue-500/20 via-primary/10 to-indigo-900/20",
  },
  {
    title: "Textile Inventory Manager",
    category: "Enterprise",
    description:
      "Tally-like accounting and inventory system for textile wholesalers with double-entry accounting, vouchers, stock tracking, and financial reports.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "shadcn/ui"],
    href: "https://textile-inventory-app.vercel.app/",
    gradient: "from-emerald-500/20 via-primary/10 to-teal-900/20",
  },
];

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up">
          <h2
            id="work-heading"
            className="text-2xl md:text-3xl font-medium text-foreground mb-4"
          >
            Selected Work
          </h2>
          <p className="text-muted mb-12 max-w-xl">
            A selection of products and platforms I&apos;ve built — from
            concept to production.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <AnimateOnScroll key={project.title} variant="fade-up" delay={index * 150}>
              <article className="group bg-surface border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                {/* Gradient placeholder image */}
                <div className="relative h-44 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${project.gradient}`}
                  />
                  <div className="absolute inset-0 bg-grid-pattern opacity-40" />
                  <span className="absolute top-4 right-4 text-xs font-medium text-muted bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {project.description}
                  </p>
                  <ul
                    className="mt-4 flex flex-wrap gap-2"
                    aria-label="Technologies used"
                  >
                    {project.tech.map((t) => (
                      <li
                        key={t}
                        className="text-xs text-primary/80 bg-primary/10 border border-primary/20 rounded-lg px-2.5 py-1"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-5 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                    aria-label={`View ${project.title}`}
                  >
                    View Project
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
