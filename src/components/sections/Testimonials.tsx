"use client";

import { Quote } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { testimonials } from "@/lib/site-content";

export function Testimonials() {
  // Renders only when real testimonials have been supplied in site-content.ts.
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-24"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up">
          <div className="text-center mb-12">
            <Badge
              variant="default"
              className="text-[11px] uppercase tracking-[0.2em]"
            >
              Testimonials
            </Badge>
            <h2
              id="testimonials-heading"
              className="mt-4 text-2xl md:text-3xl font-medium text-foreground"
            >
              What teams say about working with Darisi
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <AnimateOnScroll
              key={testimonial.name}
              variant="fade-up"
              delay={index * 100}
            >
              <Card asChild className="h-full">
                <figure className="flex h-full flex-col p-6">
                  <Quote
                    className="h-6 w-6 text-primary-text"
                    aria-hidden="true"
                  />
                  <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/90">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-border pt-4">
                    <span className="block text-sm font-medium text-foreground">
                      {testimonial.name}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {testimonial.role}
                    </span>
                  </figcaption>
                </figure>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
