"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
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
      className="section-space border-y border-border-subtle bg-surface bg-grid-pattern"
    >
      <div className="site-shell">
        <AnimateOnScroll variant="fade-up">
          <div className="border border-border bg-background/90 p-6 shadow-[var(--shadow-card)] md:p-10 lg:p-14">
            <SectionHeading
              eyebrow="Start a conversation"
              titleId="contact-heading"
              title="Bring the messy first draft."
              description="Tell me where the workflow is getting stuck, what the product needs to make easier, or the decision you’re trying to reach. I’ll reply with a practical next step."
            />

            <div className="mt-10 border-t border-border-subtle pt-6">
              <p className="font-utility text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary-text">
                A useful first note can be as simple as
              </p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Examples of topics to discuss">
                {prompts.map((topic) => (
                  <li key={topic} className="border border-border-subtle bg-surface px-3 py-1.5 text-sm text-muted-foreground">
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  onClick={() =>
                    trackEvent(ANALYTICS_EVENTS.fallbackEmailClick, {
                      location: "contact_section",
                    })
                  }
                >
                  <Mail className="h-4 w-4" />
                  Start by email
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={socialUrls.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={socialUrls.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-8 inline-block border-b border-primary-text pb-1 text-sm text-foreground transition-colors hover:text-primary-text"
              onClick={() =>
                trackEvent(ANALYTICS_EVENTS.fallbackEmailClick, {
                  location: "contact_section_address",
                })
              }
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
