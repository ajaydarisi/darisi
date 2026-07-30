"use client";

import { LayoutPanelTop, ShieldCheck, Workflow } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { skillAreas } from "@/lib/site-content";

const icons = [LayoutPanelTop, Workflow, ShieldCheck];

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="bg-surface py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up">
          <div className="text-center mb-16">
            <Badge
              variant="default"
              className="text-[11px] uppercase tracking-[0.2em]"
            >
              Skills
            </Badge>
            <h2
              id="skills-heading"
              className="mt-4 text-2xl md:text-3xl font-medium text-foreground"
            >
              What I work with.
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-foreground/90 leading-relaxed">
              The areas I&apos;ve spent the most time in, and the tools I reach
              for when building product surfaces, internal systems, and the
              platform layers underneath them.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
                  className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <article>
                    <CardContent className="px-6 pb-6 pt-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary-text" />
                      </div>
                      <h3 className="mt-5 text-xl font-medium text-foreground">
                        {skill.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {skill.description}
                      </p>
                      <p className="mt-5 rounded-xl border border-border bg-background/60 px-4 py-3 text-sm leading-relaxed text-muted">
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
