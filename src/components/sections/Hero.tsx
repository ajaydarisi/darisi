"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      aria-label="Darisi — Hero"
      className="relative min-h-[85vh] flex items-center overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[80px]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-32">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8 transition-all duration-700 ease-out ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-xs font-medium text-muted tracking-wide uppercase">
            Creative Technology Studio
          </span>
        </div>

        <h1
          className={`text-6xl md:text-8xl font-semibold tracking-tight text-gradient-primary transition-all duration-700 ease-out ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          DARISI
        </h1>

        <p
          className={`mt-4 text-xl md:text-2xl text-muted font-medium transition-all duration-700 ease-out ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "300ms" }}
          role="doc-subtitle"
        >
          Build. Design. Launch.
        </p>

        <p
          className={`mt-6 max-w-xl text-muted leading-relaxed transition-all duration-700 ease-out ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "450ms" }}
        >
          We craft modern digital experiences — from product design to
          full-stack engineering. Precision-built tools, apps, and platforms
          that move fast and feel right.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 mt-10 transition-all duration-700 ease-out ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <Button asChild size="lg">
            <a href="#work" aria-label="Explore Darisi portfolio work">
              Explore Our Work
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#contact" aria-label="Get in touch with Darisi">
              Get in Touch
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
