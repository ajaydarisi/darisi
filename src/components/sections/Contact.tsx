"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/site-content";
import { socialUrls } from "@/lib/seo";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-surface py-24">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <AnimateOnScroll variant="fade-up">
          <div className="relative mx-auto max-w-2xl text-center">
            <Badge
              variant="default"
              className="text-[11px] uppercase tracking-[0.2em]"
            >
              Contact
            </Badge>
            <h2
              id="contact-heading"
              className="mt-4 text-2xl font-medium text-foreground md:text-3xl"
            >
              Get in touch.
            </h2>
            <p className="mt-4 leading-relaxed text-foreground/90">
              Happy to talk about software, side projects, or an interesting
              problem. Email is the fastest way to reach me.
            </p>

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
                  Email Me
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
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
