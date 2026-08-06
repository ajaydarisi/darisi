"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { useSyncExternalStore } from "react";
import Aurora from "@/components/Aurora";
import ShinyText from "@/components/ShinyText";
import { BrandMark } from "@/components/ui/brand-mark";
import { Button } from "@/components/ui/button";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const SUPPORTING_PHRASE = "Software Engineer · Bengaluru, India";
const SUPPORTING_PHRASE_CLASS =
  "font-utility text-[0.6875rem] font-medium uppercase tracking-[0.14em]";
const AURORA_COLOR_STOPS = [
  "var(--primary)",
  "var(--primary-text)",
  "var(--focus-outline)",
];

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionPreference() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerReducedMotionPreference() {
  return true;
}

export function Hero() {
  const shouldReduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    getServerReducedMotionPreference
  );

  return (
    <section
      aria-label="Introduction"
      className="hero-field relative isolate flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden border-b border-border-subtle"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[70%] opacity-55 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      >
        {!shouldReduceMotion && (
          <Aurora
            colorStops={AURORA_COLOR_STOPS}
            amplitude={0.65}
            blend={0.7}
            speed={0.35}
          />
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--background)_0%,transparent_24%,var(--background)_82%),linear-gradient(to_right,var(--background)_0%,transparent_48%,var(--background)_100%)] opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-35"
        aria-hidden="true"
      />

      <div className="site-shell py-20 sm:py-24 lg:py-28">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-primary-text" aria-hidden="true" />
          {shouldReduceMotion ? (
            <span className={`${SUPPORTING_PHRASE_CLASS} text-muted-foreground`}>
              {SUPPORTING_PHRASE}
            </span>
          ) : (
            <ShinyText
              text={SUPPORTING_PHRASE}
              speed={3.5}
              delay={1.5}
              color="var(--muted)"
              shineColor="var(--primary-text)"
              className={SUPPORTING_PHRASE_CLASS}
            />
          )}
        </div>

        <h1 className="portfolio-hero__name mt-8 max-w-[64rem]">
          <BrandMark variant="wordmark" priority className="h-auto w-full" />
        </h1>

        <div className="mt-10 grid gap-8 border-t border-border-subtle pt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:gap-16">
          <div>
            <p
              className="max-w-2xl font-display text-[clamp(1.75rem,3.2vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.04em] text-foreground"
              role="doc-subtitle"
            >
              I&apos;m Ajay Darisi, a software engineer who builds product web
              apps, internal tools, and the platform layers behind them.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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

          <div className="flex flex-col justify-between gap-8 lg:border-l lg:border-border-subtle lg:pl-10">
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Most of my time goes into CRM and admin workflows, registration
              systems, payments, auth, and multi-language flows — the parts of a
              product that have to be both clear and dependable.
            </p>

            <ul className="grid border-t border-border-subtle font-utility text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-primary-text sm:grid-cols-3 lg:grid-cols-1">
              <li className="border-b border-border-subtle py-3">
                Product web apps
              </li>
              <li className="border-b border-border-subtle py-3">
                Internal systems
              </li>
              <li className="border-b border-border-subtle py-3">
                Platform layers
              </li>
            </ul>
          </div>
        </div>
      </div>

      <a
        href="#work"
        className="group absolute bottom-6 right-[var(--page-gutter)] hidden items-center gap-3 font-utility text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-muted-subtle transition-colors duration-[var(--motion-base)] hover:text-primary-text xl:flex [@media(max-height:800px)]:hidden"
        aria-label="Scroll down to my work"
      >
        <span>Scroll to see work</span>
        <span className="flex size-9 items-center justify-center rounded-full border border-border transition-colors group-hover:border-primary-text">
          <ArrowDown className="h-4 w-4 animate-scroll-dot" aria-hidden="true" />
        </span>
      </a>
    </section>
  );
}
