"use client";

import { LayoutPanelTop, ShieldCheck, Workflow } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillAreas } from "@/lib/site-content";

const icons = [LayoutPanelTop, Workflow, ShieldCheck];

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section-space bg-surface">
      <div className="site-shell">
        <AnimateOnScroll variant="fade-up">
          <SectionHeading
            eyebrow="Capabilities"
            titleId="skills-heading"
            title="The work behind a dependable product."
            description="The areas I return to when a customer-facing product, operational workflow, or launch-critical platform layer needs to feel clear."
            align="center"
          />
        </AnimateOnScroll>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {skillAreas.map((skill, index) => {
            const Icon = icons[index] ?? LayoutPanelTop;

            return (
              <AnimateOnScroll
                key={skill.title}
                variant="fade-up"
                delay={index * 100}
              >
                <Card
                  asChild
                  variant="interactive"
                  className="group h-full"
                >
                  <article>
                    <CardContent className="px-6 pb-6 pt-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-control)] bg-primary/10">
                        <Icon className="h-6 w-6 text-primary-text" />
                      </div>
                      <h3 className="mt-5 text-[1.375rem] font-medium tracking-[-0.025em] text-foreground">
                        {skill.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {skill.description}
                      </p>
                      <p className="mt-5 rounded-[var(--radius-control)] border border-border bg-background/60 px-4 py-3 text-sm leading-relaxed text-muted">
                        <span className="mb-1.5 block font-utility text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-primary-text">
                          Tools
                        </span>
                        {skill.tools}
                      </p>
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
