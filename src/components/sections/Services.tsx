"use client";

import { LayoutPanelTop, ShoppingCart, Waypoints } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { serviceOfferings } from "@/lib/site-content";

const icons = [LayoutPanelTop, ShoppingCart, Waypoints];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up">
          <div className="text-center mb-16">
            <Badge
              variant="default"
              className="text-[10px] uppercase tracking-[0.2em]"
            >
              Services
            </Badge>
            <h2
              id="services-heading"
              className="mt-4 text-2xl md:text-3xl font-medium text-foreground"
            >
              What I Build
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-muted leading-relaxed">
              The service menu is intentionally narrow. These are the areas where
              product thinking and implementation reinforce each other.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {serviceOfferings.map((service, index) => {
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
                    <CardContent className="px-8 pb-8 pt-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-5 text-xl font-medium text-foreground">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {service.description}
                      </p>
                      <p className="mt-5 rounded-xl border border-border bg-background/60 px-4 py-3 text-sm leading-relaxed text-muted">
                        {service.proof}
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
            Every engagement also includes product structure, interface design,
            and a reusable front-end system where it adds leverage.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
