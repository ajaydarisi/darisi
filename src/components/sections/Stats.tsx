"use client";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

const stats = [
  { value: "3", label: "Projects Delivered" },
  { value: "24/7", label: "Availability" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "5+", label: "Technologies Mastered" },
];

export function Stats() {
  return (
    <section aria-label="Key statistics" className="py-20 bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimateOnScroll key={stat.label} variant="fade-up" delay={index * 100}>
              <div className="text-center">
                <span className="block text-4xl md:text-5xl font-bold text-primary">
                  {stat.value}
                </span>
                <span className="block mt-2 text-sm text-muted">
                  {stat.label}
                </span>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
