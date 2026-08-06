"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { projects } from "@/lib/site-content";

const categories = ["All work", ...new Set(projects.map((project) => project.category))];

export function WorkIndex() {
  const [category, setCategory] = useState("All work");
  const [selectedTitle, setSelectedTitle] = useState(projects[0].title);
  const caseHeadingRef = useRef<HTMLHeadingElement>(null);
  const filteredProjects = projects.filter(
    (project) => category === "All work" || project.category === category
  );
  const selectedProject =
    filteredProjects.find((project) => project.title === selectedTitle) ?? filteredProjects[0];

  function selectCategory(nextCategory: string) {
    setCategory(nextCategory);
    const firstProject = projects.find(
      (project) => nextCategory === "All work" || project.category === nextCategory
    );

    if (firstProject) {
      setSelectedTitle(firstProject.title);
    }
  }

  function selectProject(title: string) {
    setSelectedTitle(title);
    requestAnimationFrame(() => caseHeadingRef.current?.focus());
  }

  if (!selectedProject) {
    return null;
  }

  return (
    <section aria-labelledby="work-index-heading" className="section-space">
      <div className="site-shell">
        <div className="border-y border-border-subtle py-8 sm:py-10">
          <p className="font-utility text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-primary-text">
            Selected work / case files
          </p>
          <h1 id="work-index-heading" className="page-title max-w-3xl">
            A working index of useful things
          </h1>
          <p className="page-description">
            Product work organised around the practical problem, the part I played, and what
            changed.
          </p>
        </div>

        <div className="grid border-b border-border-subtle md:grid-cols-[minmax(15rem,19.375rem)_minmax(0,1fr)]">
          <aside className="min-w-0 border-b border-border-subtle py-7 md:border-r md:border-b-0 md:pr-8">
            <p className="font-utility text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Catalogue
            </p>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible" aria-label="Filter work by category">
              {categories.map((item) => {
                const isActive = category === item;

                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => selectCategory(item)}
                    className={`min-h-10 shrink-0 rounded-[var(--radius-control)] border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-outline)] md:w-full ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border-subtle text-muted-foreground hover:border-border hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="mt-7 border-t border-border-subtle pt-5">
              <p className="font-utility text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Projects
              </p>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible">
                {filteredProjects.map((project, index) => {
                  const isSelected = project.title === selectedProject.title;

                  return (
                    <button
                      key={project.title}
                      type="button"
                      aria-current={isSelected ? "true" : undefined}
                      onClick={() => selectProject(project.title)}
                      className={`min-w-[13rem] border-l-2 px-3 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-outline)] md:min-w-0 ${
                        isSelected
                          ? "border-primary-text bg-elevated text-foreground"
                          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      <span className="block font-utility text-[0.625rem] font-medium uppercase tracking-[0.12em] text-primary-text">
                        {String(index + 1).padStart(2, "0")} / {project.category}
                      </span>
                      <span className="mt-1 block text-sm font-medium leading-snug">{project.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <article className="min-w-0 py-7 md:pl-8 md:py-10 lg:pl-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.72fr)] lg:items-start">
              <div>
                <p className="font-utility text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-primary-text">
                  Case file / {selectedProject.category}
                </p>
                <h2
                  ref={caseHeadingRef}
                  tabIndex={-1}
                  className="mt-3 font-display text-3xl font-medium leading-tight tracking-[-0.035em] text-foreground outline-2 outline-offset-4 outline-transparent focus:outline-[var(--focus-outline)] sm:text-4xl"
                >
                  {selectedProject.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--text-body)]">
                  {selectedProject.summary}
                </p>

                <dl className="mt-7 divide-y divide-border-subtle border-y border-border-subtle">
                  {[
                    ["Brief", "Problem", selectedProject.problem],
                    ["Part", "Role", selectedProject.role],
                    ["Result", "Outcome", selectedProject.outcome],
                  ].map(([label, detail, content]) => (
                    <div key={label} className="grid gap-2 py-4 sm:grid-cols-[6rem_1fr] sm:gap-5">
                      <dt className="font-utility text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary-text">
                        {label}
                      </dt>
                      <dd className="m-0 text-sm leading-relaxed text-muted-foreground">
                        <span className="mr-2 font-utility text-[0.625rem] font-medium uppercase tracking-[0.1em] text-muted-subtle">
                          {detail}
                        </span>
                        {content}
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
                  {selectedProject.tech.map((tech) => (
                    <li key={tech}>
                      <Badge variant="tag">{tech}</Badge>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  {selectedProject.action ? (
                    <a
                      href={selectedProject.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-b border-primary-text pb-1 text-sm font-medium text-foreground transition-colors hover:text-primary-text"
                      onClick={() =>
                        trackEvent(ANALYTICS_EVENTS.workProjectClick, {
                          project: selectedProject.title,
                        })
                      }
                    >
                      {selectedProject.action.label}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : selectedProject.note ? (
                    <p className="border-l-2 border-primary-text pl-3 text-sm leading-relaxed text-muted-foreground">
                      {selectedProject.note}
                    </p>
                  ) : null}
                </div>
              </div>

              <figure className="relative aspect-[4/3] overflow-hidden border border-border-subtle bg-elevated lg:sticky lg:top-24">
                <Image
                  src={selectedProject.image}
                  alt={`Screenshot of ${selectedProject.title}`}
                  fill
                  sizes="(min-width: 1024px) 24rem, (min-width: 768px) 30vw, 100vw"
                  className="object-cover object-top"
                />
                <figcaption className="absolute inset-x-0 bottom-0 border-t border-[#2A4A47] bg-[#0F2724]/75 px-3 py-2 font-utility text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[#F6F2EA] backdrop-blur-sm">
                  Source screenshot / {selectedProject.category}
                </figcaption>
              </figure>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
