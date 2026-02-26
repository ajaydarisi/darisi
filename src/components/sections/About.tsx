"use client";

import { Target, Palette, TrendingUp } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const values = [
  {
    icon: Target,
    title: "Precision Engineering",
    description: "Every line of code is intentional, tested, and optimized.",
  },
  {
    icon: Palette,
    title: "Minimal Aesthetics",
    description: "Clean design that communicates clearly and feels effortless.",
  },
  {
    icon: TrendingUp,
    title: "Long-term Thinking",
    description: "Architecture built for growth, not just today's requirements.",
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Content column */}
          <div className="lg:col-span-3">
            <AnimateOnScroll variant="fade-up">
              <h2
                id="about-heading"
                className="text-2xl md:text-3xl font-medium text-foreground mb-8"
              >
                About Darisi
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fade-up" delay={100}>
              <p className="text-muted leading-relaxed text-lg">
                <strong className="text-foreground">Darisi</strong> is a modern
                digital brand building apps, design systems, and curated online
                experiences. We believe in quiet power — where clean code meets
                purposeful design. Every product we ship is built with precision,
                minimal aesthetics, and long-term thinking.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fade-up" delay={200}>
              <p className="text-muted leading-relaxed text-lg mt-6">
                From early-stage concepts to production-ready platforms,{" "}
                <strong className="text-foreground">Darisi</strong> operates at
                the intersection of engineering and design — creating tools and
                experiences that feel effortless.
              </p>
            </AnimateOnScroll>

            <div className="mt-10 space-y-6">
              {values.map((value, index) => (
                <AnimateOnScroll key={value.title} variant="fade-up" delay={300 + index * 100}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted mt-1">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* Decorative column */}
          <div className="lg:col-span-2">
            <AnimateOnScroll variant="fade-left" delay={200}>
              <div className="bg-surface border border-border rounded-2xl p-8 lg:p-10 relative overflow-hidden h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent" />
                <div className="relative text-center">
                  <img
                    src="/logo.svg"
                    alt=""
                    className="w-20 h-20 mx-auto opacity-20"
                    aria-hidden="true"
                  />
                  <blockquote className="mt-6 text-lg md:text-xl font-medium text-foreground/80 italic leading-relaxed">
                    &ldquo;Build with precision. Design with purpose. Launch
                    with confidence.&rdquo;
                  </blockquote>
                  <p className="mt-4 text-sm text-muted">— Darisi Philosophy</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
