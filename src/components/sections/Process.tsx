"use client";

import { Search, PenTool, Code, Rocket } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const steps = [
  {
    step: 1,
    icon: Search,
    title: "Brief & Fit",
    description:
      "We clarify the product goal, the blocker, the audience, and whether the project is actually a good fit before committing to a build.",
  },
  {
    step: 2,
    icon: PenTool,
    title: "Shape the Approach",
    description:
      "I turn the rough problem into a clear plan for flows, interface direction, scope boundaries, and technical decisions.",
  },
  {
    step: 3,
    icon: Code,
    title: "Build in Public",
    description:
      "I build with regular updates, practical tradeoff calls, and close attention to the details that usually slow product teams down.",
  },
  {
    step: 4,
    icon: Rocket,
    title: "Launch & Stabilize",
    description:
      "We ship cleanly, smooth out the early issues, and make sure the product feels steady instead of abandoned the moment it goes live.",
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
              How I run freelance web app and internal tool projects
            </h2>
            <p className="mt-4 text-muted max-w-xl mx-auto">
              A freelance delivery process designed to keep decisions visible,
              scope practical, and momentum steady for global teams without
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
