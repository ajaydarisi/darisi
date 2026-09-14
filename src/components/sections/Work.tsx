"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import AnimatedContent from "@/components/ui/AnimatedContent";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { projects } from "@/lib/site-content";

const total = String(projects.length).padStart(2, "0");

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="pb-10 pt-30">
      <div className="site-shell">
        <p className="hand mb-1.5 rotate-[-2deg] text-[1.75rem] text-soft">
          shipped, not slideware
        </p>
        <AnimatedContent>
          <h2
            id="work-heading"
            className="text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.94] -tracking-[0.05em] text-foreground"
          >
            My latest work
          </h2>
        </AnimatedContent>

        <div className="mt-14 flex flex-col gap-7">
          {projects.map((project, index) => (
            <AnimatedContent key={project.id} delay={index * 0.1}>
              <article id={project.id} aria-labelledby={`${project.id}-heading`} className="scroll-mt-28 rounded-[clamp(1.5rem,3vw,2.25rem)] bg-card p-[clamp(1.375rem,3vw,2.5rem)] shadow-[var(--shadow-soft)]">
                <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-x-11">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3.5">
                      <span className="inline-flex h-8 items-center rounded-full bg-background px-3.5 text-[0.8125rem] font-semibold tracking-[0.02em] text-[var(--text-body)]">
                        {project.category}
                      </span>
                      <span className="text-[0.8125rem] font-semibold text-soft">
                        {String(index + 1).padStart(2, "0")} / {total}
                      </span>
                    </div>

                    <h3 id={`${project.id}-heading`} className="mt-[1.375rem] text-[clamp(2rem,3.4vw,3rem)] font-bold leading-none -tracking-[0.045em] text-foreground">
                      {project.title}
                    </h3>
                    <p className="mt-[1.125rem] text-[1.0625rem] leading-[1.6] text-[var(--text-body)]">
                      {project.summary}
                    </p>
                  </div>

                  <div className="relative aspect-[4/3] w-full lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:aspect-auto lg:h-full lg:min-h-[30rem] overflow-hidden rounded-3xl bg-panel2 shadow-[var(--shadow-soft)]">
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      sizes="(min-width: 64rem) 36rem, 100vw"
                      className="object-cover object-top"
                    />
                  </div>

                  <dl className="flex min-w-0 flex-col gap-0.5 lg:col-start-1">
                    {[
                      { label: "Problem", content: project.problem, radius: "rounded-t-[1.25rem] rounded-b-md" },
                      { label: "Role", content: project.role, radius: "rounded-md" },
                      { label: "Outcome", content: project.outcome, radius: "rounded-t-md rounded-b-[1.25rem]" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`bg-background px-5.5 py-[1.125rem] ${item.radius}`}
                      >
                        <dt className="text-xs font-bold uppercase tracking-[0.09em] text-accent">
                          {item.label}
                        </dt>
                        <dd className="mt-2 text-[0.90625rem] leading-[1.6] text-[var(--text-body)]">
                          {item.content}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="flex min-w-0 flex-wrap items-center gap-4 lg:col-start-1">
                    {project.caseStudyHref ? (
                      <a
                        href={project.caseStudyHref}
                        aria-label={`Read case study: ${project.title}`}
                        onClick={() =>
                          trackEvent(ANALYTICS_EVENTS.workProjectClick, {
                            project: project.title,
                            destination: "case_study",
                          })
                        }
                        className="inline-flex min-h-13 items-center gap-3 rounded-full bg-fill px-5 py-3 text-base font-semibold text-on-fill"
                      >
                        Read case study
                        <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                      </a>
                    ) : null}
                    {project.action ? (
                      <a
                        href={project.action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackEvent(ANALYTICS_EVENTS.workProjectClick, {
                            project: project.title,
                          })
                        }
                        className="inline-flex min-h-13 items-center gap-3 rounded-full border-[1.5px] border-line px-5 py-3 text-base font-semibold text-foreground"
                      >
                        {project.action.label}
                        <ArrowRight className="size-[1.125rem]" aria-hidden="true" />
                      </a>
                    ) : null}
                    {project.note ? (
                      <p className="hand text-[1.375rem] leading-[1.2] text-soft">
                        {project.note}
                      </p>
                    ) : null}
                    <ul
                      className="flex w-full flex-wrap gap-2"
                      aria-label="Technologies used"
                    >
                      {project.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border-[1.5px] border-line px-3.5 py-2 text-[0.8125rem] font-medium text-soft"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
