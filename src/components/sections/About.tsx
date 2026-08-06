"use client";

import { Compass, LayoutTemplate, Workflow } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { BrandMark } from "@/components/ui/brand-mark";
import { SectionHeading } from "@/components/ui/section-heading";

const values = [
  {
    icon: Compass,
    title: "Product clarity first",
    description:
      "I like untangling messy requirements until the next right product decision is obvious.",
  },
  {
    icon: LayoutTemplate,
    title: "Design that earns its keep",
    description:
      "Interfaces should feel intentional, reduce friction, and make the product easier to trust.",
  },
  {
    icon: Workflow,
    title: "Systems that survive launch",
    description:
      "I build for real usage, operational edge cases, and the people who have to maintain the product later.",
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-space">
      <div className="site-shell grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:gap-20">
        <div>
          <AnimateOnScroll variant="fade-up">
            <SectionHeading
              eyebrow="How I work"
              titleId="about-heading"
              title="Software engineer in Bengaluru, India."
            />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={100}>
            <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-[var(--text-body)]">
              <p>
                I&apos;m based in Bengaluru and I work on product web apps and
                internal systems. What I enjoy most is the seam where product
                clarity, interface decisions, and implementation meet — the
                place where a vague requirement turns into something people can
                actually use.
              </p>
              <p>
                darisi.in is my personal site. It&apos;s where I keep the things
                I&apos;ve designed and built, along with how I think about putting
                software together. Everything here is work I&apos;ve personally
                shaped end to end.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="mt-12 border-t border-border-subtle">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <AnimateOnScroll
                  key={value.title}
                  variant="fade-up"
                  delay={200 + index * 100}
                >
                  <article className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border-subtle py-6">
                    <div className="flex h-9 w-9 items-center justify-center border border-border-subtle text-primary-text">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-utility text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted-subtle">
                        Principle 0{index + 1}
                      </p>
                      <h3 className="mt-2 text-base font-medium text-foreground">
                        {value.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </article>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>

        <AnimateOnScroll variant="fade-up" delay={200} className="lg:pt-20">
          <aside className="border-y border-border-subtle py-8 lg:sticky lg:top-28">
            <BrandMark
              variant="mark"
              alt=""
              className="h-12 w-12 opacity-50"
            />
            <blockquote className="mt-8 font-display text-2xl leading-snug tracking-[-0.025em] text-foreground sm:text-3xl">
              &ldquo;The best software usually feels calm: fewer handoffs,
              clearer decisions, and execution that keeps moving.&rdquo;
            </blockquote>
            <p className="mt-6 font-utility text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted-subtle">
              A working principle
            </p>
          </aside>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
