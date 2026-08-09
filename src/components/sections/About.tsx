"use client";

import AnimatedContent from "@/components/ui/AnimatedContent";

const values = [
  "I like untangling messy requirements until the next right product decision is obvious.",
  "Interfaces should feel intentional, reduce friction, and make the product easier to trust.",
  "I build for real usage, operational edge cases, and the people who have to maintain the product later.",
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="min-h-[46.625rem] py-[4.5rem]"
    >
      <div className="site-shell grid gap-12 lg:grid-cols-[26rem_minmax(0,1fr)] lg:gap-[5.875rem]">
        <AnimatedContent>
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            <p className="font-utility text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary-text">
              About · working notes
            </p>
          </div>
          <h2
            id="about-heading"
            className="mt-[5.625rem] max-w-sm font-display text-[2.25rem] font-medium leading-[1.02] tracking-[-0.045em] text-foreground lg:text-[2.75rem]"
          >
            Software engineer in Bengaluru, India.
          </h2>
        </AnimatedContent>

        <AnimatedContent
          delay={0.1}
          className="lg:pt-[4.0625rem]"
        >
          <div className="max-w-[43.25rem] space-y-4">
            <p className="text-[1.2rem] leading-[1.75] text-[var(--text-body)]">
              I&apos;m based in Bengaluru and I work on product web apps and
              internal systems. What I enjoy most is the seam where product
              clarity, interface decisions, and implementation meet — the
              place where a vague requirement turns into something people can
              actually use.
            </p>
            <p className="text-[0.9375rem] leading-[1.75] text-muted-foreground">
              darisi.in is my personal site. It&apos;s where I keep the things
              I&apos;ve designed and built, along with how I think about putting
              software together. Everything here is work I&apos;ve personally
              shaped end to end.
            </p>
          </div>

          <div className="mt-[7.9375rem] grid gap-6 border-t border-border-subtle pt-8 sm:grid-cols-3 sm:gap-8">
            {values.map((value) => (
              <p key={value} className="text-[0.8125rem] leading-[1.6] text-muted-foreground">
                {value}
              </p>
            ))}
          </div>

          <blockquote className="mt-10 max-w-[36rem] border-l border-accent pl-5 font-display text-xl italic leading-snug tracking-[-0.02em] text-muted-foreground">
            &ldquo;The best software usually feels calm: fewer handoffs,
            clearer decisions, and execution that keeps moving.&rdquo;
          </blockquote>
        </AnimatedContent>
      </div>
    </section>
  );
}
