"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/ui/brand-mark";
import { LocalTime } from "@/components/ui/local-time";
import { SplitText } from "@/components/ui/SplitText";
import { TiltedCard } from "@/components/ui/TiltedCard";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { projects } from "@/lib/site-content";

const positions = [
  "ml-auto w-[84%] rotate-[3deg]",
  "mr-auto w-[84%] -rotate-[3deg]",
  "ml-auto w-[84%] rotate-[2deg]",
];

export function Hero() {
  return (
    <section id="hey" aria-label="Introduction" className="relative -mt-18.5 pb-5 md:pb-12">
      <div aria-hidden="true" className="pointer-events-none absolute -top-65 left-1/2 h-225 w-375 bg-[radial-gradient(closest-side,var(--wash1),var(--wash2))] [translate:-50%]" />
      <div className="site-shell relative grid items-center gap-9 pt-30 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-10 md:pt-36 lg:gap-16 lg:pt-44">
        <div className="min-w-0">
          <SplitText
            text="I’m Ajay Darisi. I design and build product web apps, commerce experiences, and internal tools for founders and growing teams."
            className="max-w-[44rem] text-[clamp(1.15rem,2.25vw,1.9rem)] font-medium leading-[1.4] -tracking-[0.02em] text-[var(--text-body)]"
          />
          <h1 className="mt-6 flex items-end">
            <span className="sr-only">Ajay Darisi — Software Engineer</span>
            <BrandMark variant="wordmark" alt="" className="w-full max-w-[43rem]" />
          </h1>
          <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-10">
            <a
              href="#work"
              onClick={() => trackEvent(ANALYTICS_EVENTS.heroPrimaryCtaClick, { location: "hero", target: "work" })}
              className="inline-flex min-h-13 items-center gap-3 rounded-full bg-fill px-5 text-[0.9375rem] font-semibold text-on-fill shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-up)] lg:min-h-15 lg:px-7 lg:text-base"
            >
              See my work <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#connect"
              onClick={() => trackEvent(ANALYTICS_EVENTS.heroSecondaryCtaClick, { location: "hero", target: "connect" })}
              className="inline-flex min-h-13 items-center rounded-full border-[1.5px] border-line px-5 text-[0.9375rem] font-semibold text-foreground transition-colors hover:border-accent hover:bg-card lg:min-h-15 lg:px-7 lg:text-base"
            >Start a conversation</a>
          </div>
          <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-soft">
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-accent" />
            <span>Open to new work · Bengaluru <LocalTime /></span>
          </p>
          <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-soft md:mt-10">
            <span><strong className="font-semibold text-foreground">{projects.length}</strong> shipped projects</span>
            <span aria-hidden="true">·</span>
            <span><strong className="font-semibold text-foreground">{projects.filter(project => project.action).length}</strong> public products</span>
          </p>
        </div>

        <div className="hidden min-w-0 md:block" aria-label="Explore selected projects">
          <div className="flex flex-col gap-5">
            {projects.map((project, index) => (
              <div key={project.id} className={`relative focus-within:z-10 ${positions[index] ?? "w-[84%]"}`}>
                <TiltedCard>
                  <a href={`#${project.id}`} className="group block rounded-2xl bg-card shadow-[var(--shadow-up)]">
                    <div className="relative aspect-[2.8/1] overflow-hidden rounded-t-2xl bg-panel2">
                      <Image src={project.image} alt="" fill sizes="(min-width: 100rem) 30rem, 34vw" className="object-cover object-top" />
                    </div>
                    <div className="flex items-center justify-between gap-3 px-4 py-3">
                      <span className="text-sm font-semibold leading-snug text-foreground">{project.title}</span>
                      <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-accent" />
                    </div>
                  </a>
                </TiltedCard>
              </div>
            ))}
          </div>
          <p className="hand mt-6 text-center text-2xl text-soft">shaped from first idea to shipped product</p>
        </div>

        <nav aria-label="Explore selected projects" className="grid grid-cols-3 gap-2 md:hidden">
          {projects.map(project => (
            <a key={project.id} href={`#${project.id}`} aria-label={`Explore ${project.category}: ${project.title}`} className="min-w-0 rounded-xl bg-card shadow-[var(--shadow-soft)]">
              <div className="relative aspect-[1.6/1] overflow-hidden rounded-t-xl bg-panel2">
                <Image src={project.image} alt="" fill sizes="30vw" className="object-cover object-top" />
              </div>
              <span className="block px-2 py-3 text-xs font-semibold leading-snug text-foreground">{project.category}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
