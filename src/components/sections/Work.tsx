"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { projects } from "@/lib/site-content";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up">
          <div className="max-w-2xl">
            <Badge
              variant="default"
              className="text-[11px] uppercase tracking-[0.2em]"
            >
              Selected Work
            </Badge>
            <h2
              id="work-heading"
              className="mt-4 text-2xl md:text-3xl font-medium text-foreground"
            >
              Projects I&apos;ve designed and built, end to end.
            </h2>
            <p className="mt-4 text-foreground/90 leading-relaxed">
              Each one lays out the problem, what I owned, and what actually
              shipped.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-8 xl:grid-cols-3">
          {projects.map((project, index) => {
            return (
              <AnimateOnScroll
                key={project.title}
                variant="fade-up"
                delay={index * 150}
              >
                <Card
                  asChild
                  className="group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <article>
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${project.gradient}`}
                      />
                      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                      <Image
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <Badge
                        variant="outline"
                        className="absolute left-4 top-4 z-20"
                      >
                        {project.category}
                      </Badge>
                    </div>

                    <CardContent className="flex flex-1 flex-col px-6 pb-6 pt-6">
                      <h3 className="text-xl font-medium text-foreground">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {project.summary}
                      </p>

                      <dl className="mt-6 space-y-4 text-sm">
                        <div>
                          <dt className="font-medium text-foreground">
                            Problem
                          </dt>
                          <dd className="mt-1 leading-relaxed text-muted">
                            {project.problem}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-foreground">Role</dt>
                          <dd className="mt-1 leading-relaxed text-muted">
                            {project.role}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-medium text-foreground">
                            Outcome
                          </dt>
                          <dd className="mt-1 leading-relaxed text-muted">
                            {project.outcome}
                          </dd>
                        </div>
                      </dl>

                      <ul
                        className="mt-6 flex flex-wrap gap-2"
                        aria-label="Technologies used"
                      >
                        {project.tech.map((tech) => (
                          <li key={tech}>
                            <Badge>{tech}</Badge>
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
