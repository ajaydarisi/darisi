"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Badge } from "@/components/ui/badge";
import { EvidenceLedger } from "@/components/ui/evidence-ledger";
import { SectionHeading } from "@/components/ui/section-heading";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { projects } from "@/lib/site-content";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="section-space">
      <div className="site-shell">
        <AnimateOnScroll variant="fade-up">
          <SectionHeading
            eyebrow="Selected work"
            titleId="work-heading"
            title="Projects I’ve designed and built, end to end."
            description="Each case is organised around the problem, my ownership, and the practical outcome."
          />
        </AnimateOnScroll>

        <div className="mt-14 divide-y divide-border-subtle border-y border-border-subtle">
          {projects.map((project, index) => (
            <AnimateOnScroll key={project.title} variant="fade-up" delay={index * 100}>
              <article
                className={`portfolio-case grid gap-8 py-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-16 ${
                  index % 2 ? "portfolio-case--reverse lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="group relative aspect-[16/10] overflow-hidden border border-border-subtle bg-elevated">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-[var(--motion-enter)] group-hover:scale-[1.02]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 border-t border-[#2A4A47] bg-[#0F2724]/75 px-4 py-3 font-utility text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#F6F2EA] backdrop-blur-sm">
                    {project.category}
                  </figcaption>
                </figure>

                <div className="min-w-0">
                  <p className="font-utility text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-primary-text">
                    {String(index + 1).padStart(2, "0")} / {project.category}
                  </p>
                  <h3 className="mt-4 font-display text-3xl font-medium leading-tight tracking-[-0.035em] text-foreground sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-[var(--text-body)]">
                    {project.summary}
                  </p>

                  <EvidenceLedger
                    items={[
                      { label: "Problem", content: project.problem },
                      { label: "Role", content: project.role },
                      { label: "Outcome", content: project.outcome },
                    ]}
                  />

                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
                    {project.tech.map((tech) => (
                      <li key={tech}>
                        <Badge variant="tag">{tech}</Badge>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7">
                    {project.action ? (
                      <a
                        href={project.action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border-b border-primary-text pb-1 text-sm font-medium text-foreground transition-colors hover:text-primary-text"
                        onClick={() =>
                          trackEvent(ANALYTICS_EVENTS.workProjectClick, {
                            project: project.title,
                          })
                        }
                      >
                        {project.action.label}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : project.note ? (
                      <p className="border-l-2 border-primary-text pl-3 text-sm leading-relaxed text-muted-foreground">
                        {project.note}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
