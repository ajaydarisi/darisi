"use client";

import { ArrowUp } from "lucide-react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/site-content";

export function Footer() {
  return (
    <footer aria-label="Site footer" className="bg-[#0F2724] text-[#F6F2EA]">
      <div className="site-shell grid h-[6.1875rem] grid-cols-[1fr_auto_1fr] items-center gap-3 font-utility text-[0.5rem] font-medium uppercase tracking-[0.1em] sm:text-[0.625rem]">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-flex min-h-11 min-w-0 items-center truncate text-[#C8DAD6] transition-colors hover:text-[#F6F2EA]"
          onClick={() =>
            trackEvent(ANALYTICS_EVENTS.fallbackEmailClick, { location: "footer" })
          }
        >
          {CONTACT_EMAIL}
        </a>
        <p className="whitespace-nowrap text-[#C8DAD6]">© Ajay Darisi · Bengaluru</p>
        <a
          href="#main-content"
          className="inline-flex min-h-11 justify-self-end items-center gap-2 text-[#F6F2EA] transition-colors hover:text-[#C8DAD6]"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
