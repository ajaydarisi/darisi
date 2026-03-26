"use client";

import { ArrowRight, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  return (
    <section
      aria-label="Darisi hero"
      className="relative flex min-h-[85vh] items-center overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px] animate-float" />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-[80px]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-28">
        <div className="max-w-4xl">
          <Badge
            variant="default"
            className="animate-hero-rise uppercase tracking-[0.2em] text-[10px]"
            style={{ animationDelay: "0ms" }}
          >
            Solo Product Engineer & Designer
          </Badge>

          <h1
            className="animate-hero-rise mt-4 text-6xl font-semibold tracking-tight text-gradient-primary md:text-8xl"
            style={{ animationDelay: "100ms" }}
          >
            DARISI
          </h1>

          <p
            className="animate-hero-rise mt-4 max-w-3xl text-xl font-medium leading-relaxed text-muted md:text-2xl"
            style={{ animationDelay: "200ms" }}
            role="doc-subtitle"
          >
            Ajay Darisi builds web apps for startups and growing businesses.
          </p>

          <p
            className="animate-hero-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted"
            style={{ animationDelay: "300ms" }}
          >
            From idea to launch, I design and build clear, reliable digital
            products without adding unnecessary complexity.
          </p>

          <div
            className="animate-hero-rise mt-10 flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "400ms" }}
          >
            <Button asChild size="lg">
              <a
                href="#contact"
                aria-label="Start your project with Ajay Darisi"
                onClick={() =>
                  trackEvent("hero_cta_click", {
                    location: "hero",
                    target: "contact",
                  })
                }
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#work" aria-label="See Ajay Darisi selected work">
                See Selected Work
              </a>
            </Button>
          </div>

          <div
            className="animate-hero-rise mt-5 flex flex-wrap items-center gap-4 text-sm text-muted"
            style={{ animationDelay: "500ms" }}
          >
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-primary" />
              Replies within 24 hours
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
            <span>30 days of post-launch support included</span>
          </div>
        </div>
      </div>

      <a
        href="#work"
        className="animate-hero-rise absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 group"
        style={{ animationDelay: "800ms" }}
        aria-label="Scroll down to selected work"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted/60 transition-colors duration-300 group-hover:text-primary/60">
          Scroll to proof
        </span>
        <div className="h-10 w-6 rounded-full border-2 border-muted/30 pt-2 transition-colors duration-300 group-hover:border-primary/40">
          <div className="mx-auto block h-2.5 w-1 rounded-full bg-primary animate-scroll-dot" />
        </div>
      </a>
    </section>
  );
}
