"use client";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { BrandMark } from "@/components/ui/brand-mark";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Compass, LayoutTemplate, Workflow } from "lucide-react";

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
      <div className="site-shell grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-3">
          <AnimateOnScroll variant="fade-up">
            <SectionHeading
              eyebrow="How I work"
              titleId="about-heading"
              title="Software engineer in Bengaluru, India."
            />
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={100}>
            <p className="mt-8 text-lg leading-relaxed text-[var(--text-body)]">
              I&apos;m based in Bengaluru and I work on product web apps and
              internal systems. What I enjoy most is the seam where product
              clarity, interface decisions, and implementation meet — the
              place where a vague requirement turns into something people can
              actually use.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll variant="fade-up" delay={200}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              darisi.in is my personal site. It&apos;s where I keep the things
              I&apos;ve designed and built, along with how I think about putting
              software together. Everything here is work I&apos;ve personally
              shaped end to end.
            </p>
          </AnimateOnScroll>

          <div className="mt-10 border-t border-border">
            {values.map((value, index) => (
              <AnimateOnScroll
                key={value.title}
                variant="fade-up"
                delay={300 + index * 100}
              >
                <div className="flex items-start gap-4 border-b border-border py-5">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-control)] bg-primary/10">
                    <value.icon className="h-5 w-5 text-primary-text" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {value.description}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <AnimateOnScroll variant="fade-up" delay={200}>
            <Card
              variant="inset"
              className="relative flex h-full min-h-72 items-center justify-center overflow-hidden p-8 lg:p-10"
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent" />
              <CardContent className="relative p-0 text-center">
                <BrandMark
                  variant="mark"
                  alt=""
                  className="mx-auto h-20 w-20 opacity-30"
                />
                <blockquote className="mt-6 text-lg font-medium italic leading-relaxed text-foreground/85 md:text-xl">
                  &ldquo;The best software usually feels calm: fewer handoffs,
                  clearer decisions, and execution that keeps moving.&rdquo;
                </blockquote>
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
