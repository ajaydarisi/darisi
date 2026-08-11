"use client";

import { ArrowDownToLine } from "lucide-react";
import AnimatedContent from "@/components/ui/AnimatedContent";
import { BrandMark } from "@/components/ui/brand-mark";
import { CONTACT_EMAIL, skillAreas } from "@/lib/site-content";

const values = [
  "I like untangling messy requirements until the next right product decision is obvious.",
  "Interfaces should feel intentional, reduce friction, and make the product easier to trust.",
  "I build for real usage, operational edge cases, and the people who have to maintain the product later.",
];

export function Story() {
  return (
    <section id="story" aria-labelledby="story-heading" className="pb-10 pt-30">
      <div className="site-shell">
        <p className="hand mb-1.5 rotate-[-2deg] text-[1.75rem] text-soft">
          the short version
        </p>
        <AnimatedContent>
          <h2
            id="story-heading"
            className="text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.94] -tracking-[0.05em] text-foreground"
          >
            My story
          </h2>
        </AnimatedContent>

        <div className="mt-14 grid gap-7 [grid-template-columns:repeat(auto-fit,minmax(min(100%,21.25rem),1fr))]">
          <AnimatedContent className="flex">
            <div className="story-feature flex flex-col gap-8 rounded-[clamp(1.5rem,3vw,2.25rem)] bg-feature px-[clamp(1.5rem,3.4vw,2.75rem)] py-[clamp(1.75rem,4vw,3rem)] text-on-feature shadow-[var(--shadow-soft)]">
              <p className="text-[clamp(1.35rem,2.2vw,1.85rem)] font-medium leading-[1.35] -tracking-[0.025em]">
                I&apos;m Ajay Darisi, based in Bengaluru, and I work on product
                web apps and internal systems. What I enjoy most is the seam where
                product clarity, interface decisions, and implementation meet —
                the place where a vague requirement turns into something people
                can actually use.
              </p>
              <div>
                <BrandMark
                  variant="wordmark"
                  alt="Darisi"
                  className="w-[11.875rem] text-feature-mark!"
                />
                <p className="mt-[1.125rem] text-[0.9375rem] leading-[1.7] text-feature-body">
                  darisi.in is my personal site. It&apos;s where I keep the things
                  I&apos;ve designed and built, along with how I think about
                  putting software together. Everything here is work I&apos;ve
                  personally shaped end to end.
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=CV%20request`}
                  className="mt-6.5 inline-flex h-13 items-center gap-3 rounded-full border-[1.5px] border-[color:var(--feature-action-border)] bg-[var(--feature-action-bg)] px-6 text-[0.9375rem] font-semibold text-on-feature transition-[background-color,transform] duration-[var(--motion-base)] hover:-translate-y-0.5 hover:bg-[var(--feature-action-hover)]"
                >
                  <ArrowDownToLine
                    className="size-[1.0625rem]"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  Ask for my CV
                </a>
              </div>
            </div>
          </AnimatedContent>

          <div className="flex flex-col gap-7">
            {values.map((value, index) => (
              <AnimatedContent key={value} delay={index * 0.1}>
                <div className="flex items-baseline gap-5 rounded-[1.75rem] bg-card px-8 pb-7.5 pt-7 shadow-[var(--shadow-soft)] transition-transform duration-300 ease-[var(--ease-standard)] hover:translate-x-2">
                  <span className="text-[0.8125rem] font-bold tracking-[0.08em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[1.0625rem] leading-[1.6] text-[var(--text-body)]">
                    {value}
                  </p>
                </div>
              </AnimatedContent>
            ))}
            <blockquote className="rounded-[1.75rem] bg-panel2 p-8 shadow-[var(--shadow-soft)]">
              <p className="hand text-[1.875rem] leading-[1.25] text-foreground">
                &ldquo;The best software usually feels calm: fewer handoffs,
                clearer decisions, and execution that keeps moving.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        <div className="mt-7 grid gap-7 [grid-template-columns:repeat(auto-fit,minmax(16.25rem,1fr))]">
          {skillAreas.map((skill, index) => (
            <AnimatedContent key={skill.title} delay={index * 0.1} className="flex">
              <article className="flex w-full flex-col rounded-[2rem] bg-card px-8 pb-8.5 pt-9 shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-standard)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-up)]">
                <h3 className="text-[1.625rem] font-bold leading-[1.1] -tracking-[0.03em] text-foreground">
                  {skill.title}
                </h3>
                <p className="mt-3.5 text-[0.9375rem] leading-[1.65] text-[var(--text-body)]">
                  {skill.description}
                </p>
                <p className="mt-auto border-t-[1.5px] border-line pt-4.5 text-sm leading-[1.6] text-soft">
                  {skill.tools}
                </p>
              </article>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
