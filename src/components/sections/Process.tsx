"use client";

import { Search, PenTool, Code, Rocket } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const steps = [
  {
    step: 1,
    icon: Search,
    title: "Scope & Fit",
    description:
      "We clarify the business goal, audience, constraints, and what success should look like before design or build starts.",
  },
  {
    step: 2,
    icon: PenTool,
    title: "UX & Interface",
    description:
      "I shape flows, wireframes, and interface direction so the product feels clear before development gets expensive.",
  },
  {
    step: 3,
    icon: Code,
    title: "Build & Integrate",
    description:
      "The product gets built with production-ready code, regular updates, and practical decisions around data, CMS, and operations.",
  },
  {
    step: 4,
    icon: Rocket,
    title: "Launch & Support",
    description:
      "We launch cleanly, smooth out post-release issues, and make handoff feel organized instead of rushed.",
  },
];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up">
          <div className="text-center mb-16">
            <h2
              id="process-heading"
              className="text-2xl md:text-3xl font-medium text-foreground"
            >
              How We Work
            </h2>
            <p className="mt-4 text-muted max-w-xl mx-auto">
              A focused delivery process that keeps decisions visible and avoids
              handoff-heavy chaos.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Connecting line on desktop */}
          <div
            className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-border"
            aria-hidden="true"
          />

          {steps.map((step, index) => (
            <AnimateOnScroll
              key={step.title}
              variant="fade-up"
              delay={index * 150}
            >
              <div className="relative text-center">
                <div className="relative z-10 w-20 h-20 mx-auto rounded-2xl bg-surface border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium mt-4">
                  {step.step}
                </span>
                <h3 className="mt-3 text-lg font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed max-w-[240px] mx-auto">
                  {step.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
