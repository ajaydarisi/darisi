"use client";

import { Send } from "lucide-react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/site-content";
import { socialUrls } from "@/lib/seo";

const socials = [
  { label: "GitHub", href: socialUrls.github },
  { label: "LinkedIn", href: socialUrls.linkedin },
];

export function Footer() {
  return (
    <footer aria-label="Site footer" className="pb-10 pt-15">
      <div className="site-shell flex flex-wrap items-center justify-between gap-6 rounded-[clamp(1.75rem,6vw,999px)] bg-card px-[clamp(1.5rem,3vw,2.5rem)] py-5.5 shadow-[var(--shadow-soft)]">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          onClick={() =>
            trackEvent(ANALYTICS_EVENTS.fallbackEmailClick, { location: "footer" })
          }
          className="inline-flex min-h-11 items-center gap-3 text-lg font-semibold text-foreground transition-colors hover:text-accent"
        >
          <Send className="size-[1.1875rem]" strokeWidth={1.9} aria-hidden="true" />
          {CONTACT_EMAIL}
        </a>

        <div className="flex flex-wrap items-center gap-2.5">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[2.875rem] items-center rounded-full bg-background px-5 text-[0.9375rem] font-semibold text-[var(--text-body)] transition-[transform,color] duration-[var(--motion-base)] hover:-translate-y-0.5 hover:text-foreground"
            >
              {social.label}
            </a>
          ))}
          <p className="ml-2.5 text-sm text-soft">© Ajay Darisi · Bengaluru</p>
        </div>
      </div>
    </footer>
  );
}
