"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { projects } from "@/lib/site-content";

export function WorkIndex() {
  const [selectedTitle, setSelectedTitle] = useState(projects[0].title);
  const caseHeadingRef = useRef<HTMLHeadingElement>(null);
  const selectedProject =
    projects.find((project) => project.title === selectedTitle) ?? projects[0];

  function selectProject(title: string) {
    setSelectedTitle(title);
    requestAnimationFrame(() => caseHeadingRef.current?.focus());
  }

  if (!selectedProject) {
    return null;
  }

  const selectedProjectNumber = projects.findIndex(
    (project) => project.title === selectedProject.title
  ) + 1;

  return (
    <>
      <Navbar />

      <main id="main-content" tabIndex={-1} className="pt-[4.25rem]">
        <section aria-labelledby="work-index-heading" className="site-shell min-h-[calc(100svh-4.25rem)]">
          <div className="grid lg:grid-cols-[310px_minmax(0,1fr)]">
            <aside className="flex min-w-0 flex-col border-b border-border-subtle p-5 sm:p-8 lg:sticky lg:top-[4.25rem] lg:h-[calc(100svh-4.25rem)] lg:self-start lg:border-r lg:border-b-0">
              <p className="font-utility text-[0.625rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Selected work / 2024—25
              </p>
              <p className="mt-5 max-w-[13rem] font-display text-[1.625rem] italic leading-[1.05] tracking-[-0.035em] text-foreground">
                A working index of useful things.
              </p>

              <ul className="mt-8 border-y border-border-subtle" aria-label="Projects">
                {projects.map((project) => {
                  const isSelected = project.title === selectedProject.title;
                  const projectNumber = projects.findIndex(
                    (item) => item.title === project.title
                  ) + 1;

                  return (
                    <li key={project.title} className="border-b border-border-subtle last:border-b-0">
                      <button
                        type="button"
                        aria-current={isSelected ? "true" : undefined}
                        onClick={() => selectProject(project.title)}
                        className={`flex min-h-20 w-full border-l-[3px] py-3 pr-3 pl-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--focus-outline)] ${
                          isSelected
                            ? "border-accent bg-elevated/50 text-foreground"
                            : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                        }`}
                      >
                        <span className="flex min-w-0 flex-col justify-center">
                          <span className="font-utility text-[0.5625rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                            {String(projectNumber).padStart(2, "0")} / {project.category}
                          </span>
                          <span className="mt-1 text-sm font-medium leading-snug">{project.title}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-12 font-utility text-[0.625rem] leading-relaxed tracking-[0.08em] text-muted-foreground lg:mt-auto lg:pt-8">
                Software engineer in Bengaluru.
                <br />
                I make complicated product work feel straightforward.
              </p>
            </aside>

            <article
              id="work-case-file"
              className="min-w-0 px-5 py-10 sm:px-8 lg:pt-[46px] lg:pr-[92px] lg:pb-[37px] lg:pl-[76px]"
            >
              <p className="font-utility text-[0.625rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Case file / {String(selectedProjectNumber).padStart(2, "0")}
              </p>
              <h1
                id="work-index-heading"
                ref={caseHeadingRef}
                tabIndex={-1}
                className="mt-4 font-display text-[clamp(3.25rem,5.625vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.055em] text-foreground outline-2 outline-offset-4 outline-transparent focus:outline-[var(--focus-outline)]"
              >
                {selectedProject.title}
              </h1>
              <p className="mt-5 max-w-[46rem] text-[1.0625rem] leading-[1.55] text-[var(--text-body)]">
                {selectedProject.summary}
              </p>

              <figure className="relative mt-6 aspect-[2/1] overflow-hidden border border-border-subtle bg-elevated lg:mt-[5.25rem]">
                <Image
                  src={selectedProject.image}
                  alt={`Screenshot of ${selectedProject.title}`}
                  fill
                  sizes="(min-width: 1024px) calc(100vw - 478px), 100vw"
                  className="object-cover object-top"
                />
                <figcaption className="absolute inset-x-0 bottom-0 border-t border-border-subtle bg-background/85 px-4 py-3 font-utility text-[0.625rem] font-medium uppercase tracking-[0.14em] text-primary-text backdrop-blur-sm">
                  {selectedProject.category} / {selectedProject.action ? "Live case" : "Internal case"}
                </figcaption>
              </figure>

              <dl className="mt-8 grid border-t border-border-subtle md:grid-cols-3">
                {[
                  ["Brief", selectedProject.problem],
                  ["Role", selectedProject.role],
                  ["Outcome", selectedProject.outcome],
                ].map(([label, content], index) => (
                  <div
                    key={label}
                    className={`border-b border-border-subtle py-5 md:border-b-0 md:py-6 ${
                      index < 2 ? "md:border-r md:pr-6" : "md:pl-6"
                    } ${index === 1 ? "md:px-6" : ""}`}
                  >
                    <dt className="font-utility text-[0.625rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="mt-3 m-0 text-sm leading-relaxed text-[var(--text-body)]">
                      {content}
                    </dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-7 flex flex-wrap gap-x-2 gap-y-2" aria-label="Technologies used">
                {selectedProject.tech.map((tech) => (
                  <li
                    key={tech}
                    className="border border-border-subtle px-2 py-1 font-utility text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                {selectedProject.action ? (
                  <a
                    href={selectedProject.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-primary-text"
                    onClick={() =>
                      trackEvent(ANALYTICS_EVENTS.workProjectClick, {
                        project: selectedProject.title,
                      })
                    }
                  >
                    {selectedProject.action.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : selectedProject.note ? (
                  <p className="border-l-2 border-accent pl-3 text-sm leading-relaxed text-[var(--text-body)]">
                    {selectedProject.note}
                  </p>
                ) : null}
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
