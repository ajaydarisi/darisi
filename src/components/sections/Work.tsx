"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import AnimatedContent from "@/components/ui/AnimatedContent";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { projects } from "@/lib/site-content";

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-b border-border-subtle pt-[4.5rem] pb-[5.3125rem]"
    >
      <div className="site-shell">
        <AnimatedContent distance={32} direction="vertical" duration={0.6} ease="power4.out" threshold={0.1}>
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              <p className="font-utility text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary-text">
                Selected work · {String(projects.length).padStart(2, "0")}
              </p>
            </div>
            <h2
              id="work-heading"
              className="mt-12 max-w-[40rem] font-display text-[clamp(3.25rem,6vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.055em] text-foreground lg:ml-[22.4%]"
            >
              Systems that make{" "}
              <span className="italic text-accent">complexity usable.</span>
            </h2>
          </div>
        </AnimatedContent>

        <div className="mt-11 space-y-32">
          {projects.map((project, index) => (
            <AnimatedContent
              key={project.title}
              distance={32}
              direction="vertical"
              duration={0.6}
              ease="power4.out"
              threshold={0.1}
              delay={index * 0.1}
            >
              <article
                className={`grid gap-8 lg:grid-cols-[minmax(0,46.8%)_minmax(0,1fr)] lg:items-start lg:gap-[4.1%] ${
                  index % 2 ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure className="group relative aspect-[4/3] overflow-hidden bg-elevated">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    fill
                    sizes="(min-width: 1024px) 47vw, 100vw"
                    className="object-cover object-top transition-transform duration-[var(--motion-enter)] group-hover:scale-[1.02]"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-[#0F2724]/78 px-4 py-2.5 font-utility text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[#F6F2EA] backdrop-blur-sm">
                    {project.category}
                  </figcaption>
                </figure>

                <div className="min-w-0 lg:pt-1">
                  <p className="font-utility text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary-text">
                    {String(index + 1).padStart(2, "0")} · {project.category}
                  </p>
                  <h3 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.045em] text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-[38rem] text-[0.9375rem] leading-6 text-[var(--text-body)]">
                    {project.summary}
                  </p>

                  <dl className="mt-6 grid gap-4 border-y border-border-subtle py-4 sm:grid-cols-3 sm:gap-5">
                    {[
                      { label: "Problem", content: project.problem },
                      { label: "Role", content: project.role },
                      { label: "Outcome", content: project.outcome },
                    ].map((item) => (
                      <div key={item.label}>
                        <dt className="font-utility text-[0.625rem] font-medium uppercase tracking-[0.12em] text-primary-text">
                          {item.label}
                        </dt>
                        <dd className="mt-2 text-xs leading-5 text-muted-foreground">
                          {item.content}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <ul
                    className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-utility text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                    aria-label="Technologies used"
                  >
                    {project.tech.map((tech) => (
                      <li
                        key={tech}
                        className="after:ml-3 after:text-border after:content-['/'] last:after:hidden"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
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
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : project.note ? (
                      <p className="border-l border-primary-text pl-3 text-sm leading-relaxed text-muted-foreground">
                        {project.note}
                      </p>
                    ) : null}
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
