"use client";

import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BrandMark } from "@/components/ui/brand-mark";
import { Button } from "@/components/ui/button";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="hero-field relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -right-48 -top-48 h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-[9rem]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      </div>

      <div className="site-shell section-space relative z-10">
        <div className="max-w-3xl">
          <Badge variant="eyebrow">
            Software Engineer | Bengaluru, India
          </Badge>

          <h1 className="mt-6">
            <BrandMark
              variant="wordmark"
              className="h-16 w-auto sm:h-20 lg:h-24"
              priority
            />
          </h1>

          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground md:text-xl"
            role="doc-subtitle"
          >
            I&apos;m Ajay Darisi, a software engineer who builds product web
            apps, internal tools, and the platform layers behind them.
          </p>

          <p
            className="mt-5 max-w-2xl text-base leading-relaxed text-muted"
          >
            Most of my time goes into CRM and admin workflows, registration
            systems, payments, auth, and multi-language flows — the parts of a
            product that have to be both clear and dependable.
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2 font-utility text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary-text">
            <li>Product web apps</li>
            <li>Internal systems</li>
            <li>Platform layers</li>
          </ul>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <a
                href="#work"
                aria-label="View Ajay Darisi's selected work"
                onClick={() =>
                  trackEvent(ANALYTICS_EVENTS.heroPrimaryCtaClick, {
                    location: "hero",
                    target: "work",
                  })
                }
              >
                View My Work
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href="#contact"
                aria-label="Get in touch with Ajay Darisi"
                onClick={() =>
                  trackEvent(ANALYTICS_EVENTS.heroSecondaryCtaClick, {
                    location: "hero",
                    target: "contact",
                  })
                }
              >
                Get in Touch
              </a>
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#work"
        className="animate-hero-rise absolute bottom-1 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 group [@media(max-height:740px)]:hidden"
        style={{ animationDelay: "800ms" }}
        aria-label="Scroll down to my work"
      >
        <span className="font-utility text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-subtle transition-colors duration-[var(--motion-base)] group-hover:text-primary-text">
          Scroll to see work
        </span>
        <div className="h-10 w-6 rounded-full border-2 border-muted/30 pt-2 transition-colors duration-[var(--motion-base)] group-hover:border-primary/40">
          <div className="mx-auto block h-2.5 w-1 rounded-full bg-primary animate-scroll-dot" />
        </div>
      </a>
    </section>
  );
}
