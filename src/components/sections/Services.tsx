"use client";

import { LayoutPanelTop, ShieldCheck, Workflow } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { serviceFocusAreas } from "@/lib/site-content";

const icons = [LayoutPanelTop, Workflow, ShieldCheck];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up">
          <div className="text-center mb-16">
            <Badge
              variant="default"
              className="text-[11px] uppercase tracking-[0.2em]"
            >
              Services
            </Badge>
            <h2
              id="services-heading"
              className="mt-4 text-2xl md:text-3xl font-medium text-foreground"
            >
              Freelance software engineering for web apps, internal systems, and
              platform work.
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-foreground/90 leading-relaxed">
              I stay focused on software where clear UX, dependable
              engineering, and practical product judgment matter more than
              flashy surface area. That usually means web apps, internal tools,
              payments, auth, and internationalization-heavy features that are
              hard to ship cleanly.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {serviceFocusAreas.map((service, index) => {
            const Icon = icons[index] ?? LayoutPanelTop;

            return (
              <AnimateOnScroll
                key={service.title}
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
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {service.description}
                      </p>
                      <p className="mt-5 rounded-xl border border-border bg-background/60 px-4 py-3 text-sm leading-relaxed text-muted">
                        {service.examples}
                      </p>
                    </CardContent>
                  </article>
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>

        <AnimateOnScroll variant="fade-up" delay={400}>
          <p className="mt-12 text-center text-sm leading-relaxed text-muted">
            If you need a content-heavy brochure site, I may not be the right
            fit. If you need product logic, admin complexity, or platform
            features to feel clear, credible, and shippable, this is the right
            lane.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
