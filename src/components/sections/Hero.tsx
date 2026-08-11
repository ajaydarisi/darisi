"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { LocalTime } from "@/components/ui/local-time";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { projects } from "@/lib/site-content";

const proofPoints = [
  { value: "2024—25", label: "selected work" },
  { value: "03", label: "case studies" },
  { value: "02", label: "live products" },
  { value: "Bengaluru", label: "IST, async-friendly" },
];

// Tilt is a custom property so the shared `floaty` keyframe drifts each card
// around its own resting angle instead of snapping them all to one.
const collage = [
  {
    project: projects[0],
    position: "left-[4%] top-2.5 w-[74%]",
    tilt: "-5deg",
    float: "animate-[floaty_9s_ease-in-out_infinite]",
  },
  {
    project: projects[1],
    position: "right-0 top-[9.375rem] w-[66%]",
    tilt: "4deg",
    float: "animate-[floaty_11s_600ms_ease-in-out_infinite]",
  },
  {
    project: projects[2],
    position: "bottom-2 left-0 w-[60%]",
    tilt: "-2deg",
    float: "animate-[floaty_10s_300ms_ease-in-out_infinite]",
  },
];

export function Hero() {
  return (
    <section
      id="hey"
      aria-label="Introduction"
      className="relative -mt-18.5 min-h-svh"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-65 left-1/2 h-225 w-375 animate-[breathe_12s_ease-in-out_infinite] bg-[radial-gradient(closest-side,var(--wash1),var(--wash2))] [translate:-50%]"
      />

      <div className="site-shell relative flex flex-wrap items-start gap-14 pt-[clamp(7.875rem,13vw,22rem)]">
        <div className="min-w-0 flex-[1_1_35rem]">
          <p className="max-w-[44rem] animate-[rise_800ms_80ms_var(--ease-standard)_both] text-[clamp(1.25rem,2.4vw,1.9rem)] font-medium leading-[1.3] -tracking-[0.02em] text-[var(--text-body)]">
            Hey! I&apos;m a software engineer who turns messy product and
            operations problems into software teams can rely on.
          </p>

          <h1 className="mt-[1.125rem] flex items-end animate-[rise_900ms_160ms_var(--ease-standard)_both]">
            <span className="sr-only">Ajay Darisi — Software Engineer</span>
            <BrandMark
              variant="wordmark"
              alt=""
              className="w-[clamp(15rem,48vw,43rem)]"
            />
          </h1>

          <div className="mt-10 flex animate-[fadein_900ms_420ms_both] flex-wrap items-center gap-3.5">
            <a
              href="#work"
              onClick={() =>
                trackEvent(ANALYTICS_EVENTS.heroPrimaryCtaClick, {
                  location: "hero",
                  target: "work",
                })
              }
              className="inline-flex h-[3.875rem] items-center gap-3.5 rounded-full bg-fill px-8 text-[1.0625rem] font-semibold text-on-fill shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-[var(--motion-base)] ease-[var(--ease-standard)] hover:-translate-y-[3px] hover:shadow-[var(--shadow-up)]"
            >
              See my work
              <ArrowRight className="size-[1.1875rem]" aria-hidden="true" />
            </a>
            <a
              href="#chat"
              onClick={() =>
                trackEvent(ANALYTICS_EVENTS.heroSecondaryCtaClick, {
                  location: "hero",
                  target: "chat",
                })
              }
              className="inline-flex h-[3.875rem] items-center rounded-full border-[1.5px] border-line px-[1.875rem] text-[1.0625rem] font-semibold text-foreground transition-[border-color,background-color,transform] duration-[var(--motion-base)] hover:-translate-y-[3px] hover:border-accent hover:bg-card"
            >
              Start a conversation
            </a>
            <span className="inline-flex items-center gap-[0.5625rem] text-sm font-medium text-soft">
              <span
                aria-hidden="true"
                className="size-[0.5625rem] animate-[pulsedot_2.4s_ease-in-out_infinite] rounded-full bg-accent"
              />
              Open to new work · Bengaluru <LocalTime />
            </span>
          </div>

          <ul className="mt-[3.25rem] flex animate-[fadein_900ms_560ms_both] flex-wrap gap-2.5">
            {proofPoints.map((point) => (
              <li
                key={point.label}
                className="inline-flex items-baseline gap-[0.5625rem] rounded-full bg-card px-5 py-[0.6875rem] shadow-[var(--shadow-soft)]"
              >
                <span className="text-base font-bold -tracking-[0.02em] text-foreground">
                  {point.value}
                </span>
                <span className="text-sm font-medium text-soft">{point.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          aria-hidden="true"
          className="relative h-[clamp(20.625rem,46vw,29.375rem)] min-w-[17.5rem] flex-[0_1_25rem] animate-[fadein_1000ms_300ms_both]"
        >
          {collage.map(({ project, position, tilt, float }) => (
            <div
              key={project.title}
              style={
                { "--tilt": tilt, transform: `rotate(${tilt})` } as CSSProperties
              }
              className={`absolute aspect-[4/3] overflow-hidden rounded-[1.375rem] bg-panel2 shadow-[var(--shadow-up)] ${position} ${float}`}
            >
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width: 48rem) 25rem, 75vw"
                className="object-cover object-top"
              />
            </div>
          ))}
          <p className="hand absolute bottom-6 right-0 max-w-[11.25rem] rotate-[4deg] text-right text-[clamp(1.3125rem,2.2vw,1.5625rem)] leading-[1.15] text-soft">
            three products, all shipped end to end
          </p>
        </div>
      </div>
    </section>
  );
}
