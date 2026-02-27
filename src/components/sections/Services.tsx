"use client";

import { Code, Smartphone, Palette, Layers } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Full-stack web applications with Next.js, React, and modern tooling. Performant, accessible, and built to scale.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description:
      "Cross-platform mobile apps that feel native and perform beautifully across every device.",
  },
  {
    icon: Palette,
    title: "Design Systems",
    description:
      "Consistent, scalable UI component libraries and design tokens that keep your product aligned.",
  },
  {
    icon: Layers,
    title: "Product Design",
    description:
      "From concept to pixel-perfect interfaces with thoughtful UX and clean visual design.",
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
              What I Do
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
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
