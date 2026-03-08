"use client";

import { Code, Smartphone, Palette, Layers } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Full-stack web applications with Next.js, React, and modern tooling. Performant, accessible, and built to scale.",
    outcome:
      "You get a fast, accessible web app ready for thousands of users.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description:
      "Cross-platform mobile apps that feel native and perform beautifully across every device.",
    outcome:
      "You get a cross-platform app that feels native on every device.",
  },
  {
    icon: Palette,
    title: "Design Systems",
    description:
      "Consistent, scalable UI component libraries and design tokens that keep your product aligned.",
    outcome:
      "You get a scalable UI library that keeps your team aligned.",
  },
  {
    icon: Layers,
    title: "Product Design",
    description:
      "From concept to pixel-perfect interfaces with thoughtful UX and clean visual design.",
    outcome:
      "You get a polished interface backed by thoughtful UX research.",
  },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up">
          <div className="text-center mb-16">
            <h2
              id="services-heading"
              className="text-2xl md:text-3xl font-medium text-foreground"
            >
              How I Can Help
            </h2>
            <p className="mt-4 text-muted max-w-xl mx-auto">
              I build digital products that combine engineering precision with
              design clarity.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <AnimateOnScroll key={service.title} variant="fade-up" delay={index * 100}>
              <div className="group bg-surface border border-border rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-medium text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {service.description}
                </p>
                <p className="mt-2 text-xs text-muted/70 italic">
                  {service.outcome}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll variant="fade-up" delay={500}>
          <p className="text-center mt-12 text-sm text-muted">
            Not sure what you need?{" "}
            <a
              href="#contact"
              className="text-primary hover:text-primary-hover transition-colors duration-200"
            >
              Let&apos;s figure it out together.
            </a>
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
