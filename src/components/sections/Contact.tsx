"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/site-content";
import { socialUrls } from "@/lib/seo";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-space bg-surface"
    >
      <div className="site-shell relative">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <AnimateOnScroll variant="fade-up" className="relative">
          <SectionHeading
            eyebrow="Start a conversation"
            titleId="contact-heading"
            title="Bring the messy first draft."
            description="Tell me where the workflow is getting stuck, what the product needs to make easier, or the decision you’re trying to reach. I’ll reply with a practical next step."
            align="center"
          />

          <Card variant="inset" className="mx-auto mt-8 max-w-2xl">
            <CardContent className="p-6 text-center md:p-8">
              <p className="font-utility text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-primary-text">
                A useful first note can be as simple as
              </p>
              <ul
                className="mt-4 flex flex-wrap justify-center gap-2"
                aria-label="Examples of topics to discuss"
              >
                {[
                  "A product idea",
                  "An operational workflow",
                  "A platform decision",
                ].map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-border bg-background/70 px-3 py-1.5 text-sm text-muted"
                  >
                    {topic}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
                  <a
                    href={socialUrls.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href={socialUrls.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <p className="mt-6 text-sm text-muted">{CONTACT_EMAIL}</p>
            </CardContent>
          </Card>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
