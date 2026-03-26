"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { heroProofStats } from "@/lib/site-content";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      aria-label="Darisi hero"
      className="relative flex min-h-[calc(100svh-6rem)] items-center overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px] animate-float" />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-[80px]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <Badge
            variant="outline"
            className={`border-primary/30 bg-primary/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-primary/80 transition-all duration-700 ease-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Darisi | Bengaluru, India | Global Remote
          </Badge>

          <h1
            className={`mt-6 max-w-5xl text-4xl font-semibold leading-tight tracking-tight text-gradient-primary transition-all duration-700 ease-out md:text-6xl lg:text-7xl ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            DARISI
          </h1>

          <p
            className={`mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: "300ms",
              transitionDuration: "700ms",
              transitionTimingFunction: "ease-out",
            }}
            role="doc-subtitle"
          >
            I am a freelance product engineer based in Bengaluru,
            India.
          </p>

          <p
            className={`mt-5 max-w-2xl text-base leading-relaxed text-muted ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: "360ms",
              transitionDuration: "700ms",
              transitionTimingFunction: "ease-out",
            }}
          >
            I am strongest when the work needs calm ownership across product
            clarity, UX direction, and build, especially for CRM and admin
            workflows, registration systems, and platform-heavy launches.
          </p>

          <div
            className={`mt-10 flex flex-col gap-4 sm:flex-row ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: "450ms",
              transitionDuration: "700ms",
              transitionTimingFunction: "ease-out",
            }}
          >
            <Button asChild size="lg">
              <a
                href="#contact"
                aria-label="Start your web app or internal systems project with Ajay Darisi"
                onClick={() =>
                  trackEvent(ANALYTICS_EVENTS.heroPrimaryCtaClick, {
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
              <a
                href="#work"
                aria-label="See Ajay Darisi selected work"
                onClick={() =>
                  trackEvent(ANALYTICS_EVENTS.heroSecondaryCtaClick, {
                    location: "hero",
                    target: "work",
                  })
                }
              >
                See Selected Work
              </a>
            </Button>
          </div>

          <div
            className={`mt-8 grid gap-3 sm:grid-cols-3 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: "600ms",
              transitionDuration: "700ms",
              transitionTimingFunction: "ease-out",
            }}
          >
            {heroProofStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-background/50 px-4 py-4"
              >
                <p className="text-xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
          <p
            className={`mt-5 text-sm text-muted ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: "700ms",
              transitionDuration: "700ms",
              transitionTimingFunction: "ease-out",
            }}
          >
            Replies within 24 hours. 30 days of post-launch support included.
          </p>
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
