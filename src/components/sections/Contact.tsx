"use client";

import { useState } from "react";
import { ArrowRight, Copy } from "lucide-react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/site-content";

const prompts = [
  "A product idea",
  "An operational workflow",
  "A platform decision",
];

export function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  const [copying, setCopying] = useState(false);

  async function copyEmail() {
    if (copying) return;
    setCopyStatus("");
    setCopying(true);
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopyStatus("Email address copied.");
    } catch {
      setCopyStatus("Couldn’t copy the address. Select the email address above to copy it manually.");
    } finally {
      setCopying(false);
    }
  }

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
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent(ANALYTICS_EVENTS.fallbackEmailClick, {
              location: "contact_section",
            })
          }
          className="mt-12 inline-flex min-h-[clamp(5rem,11vw,8rem)] max-w-full items-center justify-center rounded-full bg-fill px-[clamp(1.5rem,5vw,4rem)] py-6 text-[clamp(2.1rem,5vw,4rem)] font-bold -tracking-[0.045em] text-on-fill shadow-[var(--shadow-up)] transition-transform duration-300 ease-[var(--ease-standard)] hover:-translate-y-1.5 hover:scale-[1.02]"
        >
          Email Ajay
        </a>

        <div className="mt-6 flex max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            onClick={() =>
              trackEvent(ANALYTICS_EVENTS.fallbackEmailClick, {
                location: "contact_address",
              })
            }
            className="select-all break-all text-base font-medium text-foreground underline decoration-line underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            aria-disabled={copying}
            aria-busy={copying}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border-[1.5px] border-line px-4 py-2 text-sm font-semibold text-foreground aria-disabled:opacity-60"
          >
            <Copy className="size-4" aria-hidden="true" />
            {copying ? "Copying…" : "Copy address"}
          </button>
        </div>
        <p role="status" aria-live="polite" aria-atomic="true" className="mt-2 min-h-6 max-w-[30rem] text-sm text-soft">
          {copyStatus}
        </p>

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
