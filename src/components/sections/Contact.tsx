"use client";

import { ArrowUpRight } from "lucide-react";
import AnimatedContent from "@/components/ui/AnimatedContent";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/site-content";
import { socialUrls } from "@/lib/seo";

const prompts = [
  "A product idea",
  "An operational workflow",
  "A platform decision",
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="min-h-[39.3125rem] border-y border-border-subtle bg-grid-pattern py-[4.5rem]"
    >
      <div className="site-shell grid gap-12 lg:grid-cols-[40rem_minmax(0,1fr)] lg:gap-[7.0625rem]">
        <AnimatedContent distance={32} direction="vertical" duration={0.6} ease="power4.out" threshold={0.1}>
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            <p className="font-utility text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary-text">
              Contact · start somewhere
            </p>
          </div>
          <h2
            id="contact-heading"
            className="mt-[5.5625rem] max-w-[40rem] font-display text-[clamp(4rem,8vw,6.4rem)] font-medium leading-[0.92] tracking-[-0.065em] text-foreground"
          >
            Bring the <span className="italic text-accent">messy first draft.</span>
          </h2>
          <p className="mt-6 max-w-[30rem] text-[1.0625rem] leading-[1.7] text-[var(--text-body)]">
            Tell me where the workflow is getting stuck, what the product needs
            to make easier, or the decision you&apos;re trying to reach. I&apos;ll reply
            with a practical next step.
          </p>
        </AnimatedContent>

        <AnimatedContent
          distance={32}
          direction="vertical"
          duration={0.6}
          ease="power4.out"
          threshold={0.1}
          delay={0.1}
          className="lg:pt-[7.5625rem]"
        >
          <div>
            <p className="font-utility text-[0.625rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              A useful first note can be as simple as
            </p>
            <ul
              className="mt-4 divide-y divide-border-subtle border-y border-border-subtle text-[1.0625rem] text-foreground"
              aria-label="Examples of topics to discuss"
            >
              {prompts.map((topic) => (
                <li
                  key={topic}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  {topic}
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 lg:mt-[12.5rem]">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 border-b border-accent pb-1 text-[1.0625rem] font-medium text-foreground transition-colors hover:text-primary-text"
              onClick={() =>
                trackEvent(ANALYTICS_EVENTS.fallbackEmailClick, {
                  location: "contact_section",
                })
              }
            >
              Start by email
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-4 text-[0.8125rem] text-muted-foreground">
            <a
              href={socialUrls.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 transition-colors hover:text-foreground"
            >
              GitHub
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={socialUrls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 transition-colors hover:text-foreground"
            >
              LinkedIn
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

        </AnimatedContent>
      </div>
    </section>
  );
}
