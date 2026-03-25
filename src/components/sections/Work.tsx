"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { projects } from "@/lib/site-content";

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
                {/* Project image with fallback gradient */}
                <div className="relative h-44 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${project.gradient}`}
                  />
                  <div className="absolute inset-0 bg-grid-pattern opacity-40" />
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} in a new tab`}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
                  >
                    <span className="text-sm font-medium text-foreground">
                      View Project
                    </span>
                  </a>
                  <span className="pointer-events-none absolute top-4 right-4 z-20 text-xs font-medium text-muted bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
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
