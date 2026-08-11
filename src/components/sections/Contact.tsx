"use client";

import { ArrowRight } from "lucide-react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/site-content";

const prompts = [
  "A product idea",
  "An operational workflow",
  "A platform decision",
];

export function Contact() {
  return (
    <section
      id="connect"
      aria-labelledby="connect-heading"
      className="relative overflow-hidden pb-10 pt-[8.125rem]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[26.25rem] left-1/2 h-[50rem] w-[87.5rem] animate-[breathe_14s_ease-in-out_infinite] bg-[radial-gradient(closest-side,var(--wash1),var(--wash2))] [translate:-50%]"
      />

      <div className="site-shell relative flex flex-col items-center text-center">
        <p className="hand rotate-[-2deg] text-[1.875rem] leading-[1.2] text-soft">
          bring the messy first draft —
          <br />a half-formed idea is a fine start
        </p>

        <h2
          id="connect-heading"
          className="mt-6.5 max-w-[30rem] text-[clamp(2.4rem,5.4vw,4.4rem)] font-bold leading-[0.98] -tracking-[0.05em] text-foreground"
        >
          Tell me where it&apos;s stuck.
        </h2>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          onClick={() =>
            trackEvent(ANALYTICS_EVENTS.fallbackEmailClick, {
              location: "contact_section",
            })
          }
          className="mt-12 inline-flex h-[clamp(6.875rem,13vw,9.875rem)] items-center justify-center rounded-full bg-fill px-[clamp(3rem,7vw,6rem)] text-[clamp(2.6rem,6vw,4.6rem)] font-bold -tracking-[0.045em] text-on-fill shadow-[var(--shadow-up)] transition-transform duration-300 ease-[var(--ease-standard)] hover:-translate-y-1.5 hover:scale-[1.02]"
        >
          Connect
        </a>

        <p className="mt-7.5 max-w-[34rem] text-[1.0625rem] leading-[1.7] text-[var(--text-body)]">
          Tell me where the workflow is getting stuck, what the product needs to
          make easier, or the decision you&apos;re trying to reach. I&apos;ll
          reply with a practical next step — usually within a working day,
          Bengaluru hours.
        </p>

        <ul
          className="mt-8.5 flex flex-wrap justify-center gap-3"
          aria-label="Examples of topics to discuss"
        >
          {prompts.map((topic) => (
            <li key={topic}>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(topic)}`}
                className="inline-flex items-center gap-2.5 rounded-full bg-card px-5.5 py-3.5 text-[0.9375rem] font-medium text-[var(--text-body)] shadow-[var(--shadow-soft)] transition-[transform,color] duration-[var(--motion-base)] hover:-translate-y-[3px] hover:text-foreground"
              >
                {topic}
                <ArrowRight className="size-[0.9375rem] text-accent" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
