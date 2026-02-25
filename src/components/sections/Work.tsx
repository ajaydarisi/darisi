const projects = [
  {
    title: "Bhagyalakshmi Future Gold",
    description:
      "Full-stack jewelry e-commerce platform with bilingual support (English & Telugu), admin panel, and Razorpay payment integration.",
    tech: ["Next.js", "Supabase", "Razorpay", "Tailwind CSS"],
    href: "https://bfg.darisi.in/",
  },
  {
    title: "DevMarket",
    description:
      "Two-sided freelance marketplace connecting clients with developers — project posting, proposals, built-in messaging, and role-based onboarding.",
    tech: ["Next.js", "Supabase", "TanStack Query", "TypeScript"],
    href: "https://market-place-for-websites.vercel.app/",
  },
  {
    title: "Textile Inventory Manager",
    description:
      "Tally-like accounting and inventory system for textile wholesalers with double-entry accounting, vouchers, stock tracking, and financial reports.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "shadcn/ui"],
    href: "https://textile-inventory-app.vercel.app/",
  },
];

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 id="work-heading" className="text-2xl font-medium text-foreground mb-8">
          Work by Darisi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="bg-surface border border-border rounded-2xl hover:bg-elevated transition-all duration-200 ease-out"
            >
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6"
                aria-label={`View ${project.title} — a Darisi project`}
              >
                <h3 className="text-lg font-medium text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="text-xs text-muted border border-border rounded-lg px-2 py-1"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
