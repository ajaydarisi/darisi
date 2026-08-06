"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
            eyebrow="Selected Work"
            titleId="work-heading"
            title="Projects I’ve designed and built, end to end."
            description="Each case is organised around the problem, my ownership, and the practical outcome."
          />
        </AnimateOnScroll>

        <div className="mt-12 grid grid-cols-1 gap-6 xl:grid-cols-2">
          {projects.map((project, index) => {
            const isFeatured = index === 0;

            return (
              <AnimateOnScroll
                key={project.title}
                variant="fade-up"
                delay={index * 150}
                className={isFeatured ? "xl:col-span-2" : undefined}
              >
                <Card
                  asChild
                  variant="interactive"
                  className="group relative flex h-full flex-col overflow-hidden"
                >
                  <article
                    className={`flex h-full flex-col ${
                      isFeatured
                        ? "xl:grid xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
                        : ""
                    }`}
                  >
                    <div
                      className={`relative aspect-[16/10] overflow-hidden ${
                        isFeatured ? "xl:aspect-auto" : ""
                      }`}
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/10 to-transparent" />
                      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                      <Image
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[var(--motion-enter)] group-hover:scale-[1.03]"
                      />
                      <Badge
                        variant="media"
                        className="absolute left-4 top-4 z-20"
                      >
                        {project.category}
                      </Badge>
                    </div>

                    <CardContent className="flex flex-1 flex-col px-6 pb-6 pt-6">
                      <h3 className="text-[1.375rem] font-medium tracking-[-0.025em] text-foreground">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {project.summary}
                      </p>

                      <EvidenceLedger
                        items={[
                          { label: "Problem", content: project.problem },
                          { label: "Role", content: project.role },
                          { label: "Outcome", content: project.outcome },
                        ]}
                      />

                      <ul
                        className="mt-6 flex flex-wrap gap-2"
                        aria-label="Technologies used"
                      >
                        {project.tech.map((tech) => (
                          <li key={tech}>
                            <Badge variant="tag">{tech}</Badge>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-6">
                        {project.action ? (
                          <a
                            href={project.action.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary-text after:absolute after:inset-0 after:content-['']"
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
                          <p className="text-xs leading-relaxed text-muted-subtle">
                            {project.note}
                          </p>
                        ) : null}
                      </div>
                    </CardContent>
                  </article>
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
