"use client";

import { ArrowDown } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { Button } from "@/components/ui/button";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

const capabilities = [
  "Product web apps",
  "Internal systems",
  "Platform layers",
];

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="portfolio-hero relative isolate min-h-[calc(100svh-1px)] overflow-hidden border-b border-border"
    >
      <div className="portfolio-hero__orb" aria-hidden="true" />

      <div className="site-shell relative flex min-h-[calc(100svh-1px)] flex-col justify-center pb-20 pt-[7.5rem]">
        <div className="flex items-center gap-3">
          <span className="h-px w-6 bg-accent" aria-hidden="true" />
          <p className="font-utility text-[0.65625rem] font-medium uppercase tracking-[0.2em] text-primary-text">
            Software Engineer · Bengaluru, India
          </p>
        </div>

        <h1 className="mt-7 flex items-end gap-1">
          <BrandMark
            variant="wordmark"
            alt="Darisi"
            className="w-[clamp(16rem,48vw,54rem)]"
          />
          {/* Wordmark viewBox carries baseline padding below the letters (~21.9% of its height); lift the dot by that amount so it sits on the letters' baseline, not the box edge. */}
          <span
            className="mb-[clamp(1.08rem,3.25vw,3.66rem)] h-[clamp(1rem,2.8vw,3.1rem)] ml-4 w-[clamp(1rem,2.8vw,3.1rem)] shrink-0 rounded-full bg-accent"
            aria-hidden="true"
          />
        </h1>

        <div className="portfolio-hero__rule mt-8 h-px w-full max-w-[43.75rem]" />

        <div className="mt-10 grid max-w-[68.75rem] gap-9 lg:h-[14.625rem] lg:grid-cols-2 lg:items-end lg:gap-16">
          <p
            className="max-w-[32.375rem] self-end font-display text-[1.65rem] font-normal leading-[1.25] tracking-[-0.02em] text-foreground max-lg:order-2"
            role="doc-subtitle"
          >
            I&apos;m Ajay Darisi — a software engineer who builds product web
            apps, internal tools, and the platform layers behind them.
          </p>

          <div className="max-lg:order-1">
            <p className="mb-6 max-w-[27.5rem] text-[0.9375rem] leading-[1.75] text-muted-foreground">
              Most of my time goes into CRM and admin workflows, registration
              systems, payments, auth, and multi-language flows — the parts of a
              product that have to be both clear and dependable.
            </p>

            <ul className="mb-7 flex flex-wrap gap-2" aria-label="Areas of focus">
              {capabilities.map((capability) => (
                <li
                  key={capability}
                  className="border border-border bg-[color-mix(in_srgb,var(--ring)_4%,transparent)] px-3 py-1.5 font-utility text-[0.65625rem] font-medium uppercase tracking-[0.12em] text-secondary-foreground"
                >
                  {capability}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <Button asChild className="h-[2.875rem] rounded-none px-6 text-sm shadow-none hover:translate-y-0 hover:shadow-none">
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
                  <ArrowDown className="h-[0.9375rem] w-[0.9375rem]" aria-hidden="true" />
                </a>
              </Button>
              <a
                href="#contact"
                className="border-b border-accent pb-1 text-sm font-medium text-foreground transition-colors hover:text-primary-text"
                onClick={() =>
                  trackEvent(ANALYTICS_EVENTS.heroSecondaryCtaClick, {
                    location: "hero",
                    target: "contact",
                  })
                }
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#work"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-utility text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-foreground lg:flex"
        aria-label="Scroll down to my work"
      >
        <span className="h-10 w-px bg-accent animate-scroll-dot" aria-hidden="true" />
        Scroll to explore
      </a>
    </section>
  );
}
