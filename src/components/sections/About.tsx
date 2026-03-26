"use client";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, LayoutTemplate, Workflow } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";

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
    <section id="about" aria-labelledby="about-heading" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Content column */}
          <div className="lg:col-span-3">
            <AnimateOnScroll variant="fade-up">
              <Badge
                variant="default"
                className="text-[10px] uppercase tracking-[0.2em]"
              >
                How I work
              </Badge>
              <h2
                id="about-heading"
                className="mt-4 text-2xl md:text-3xl font-medium text-foreground"
              >
                Freelance product engineering from Bengaluru for global teams.
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fade-up" delay={100}>
              <p className="mt-8 text-lg leading-relaxed text-muted">
                I&apos;m based in Bengaluru, India, and through Darisi I take on
                independent product work for teams that want one steady owner
                across product clarity, interface direction, and implementation.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fade-up" delay={200}>
              <p className="text-muted leading-relaxed text-lg mt-6">
                Darisi is not a studio with layers around it. It is my personal
                freelance brand for web apps, internal systems, and platform
                features that need calm collaboration, strong technical
                judgment, and delivery that does not lose coherence halfway
                through the build.
              </p>
            </AnimateOnScroll>

            <div className="mt-10 space-y-6">
              {values.map((value, index) => (
                <AnimateOnScroll key={value.title} variant="fade-up" delay={300 + index * 100}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-foreground">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted mt-1">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* Decorative column */}
          <div className="lg:col-span-2">
            <AnimateOnScroll variant="fade-left" delay={200}>
              <Card className="relative flex h-full items-center justify-center overflow-hidden p-8 lg:p-10">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent" />
                <CardContent className="relative p-0 text-center">
                  <Image
                    src="/logo.svg"
                    alt=""
                    width={80}
                    height={80}
                    className="w-20 h-20 mx-auto opacity-20"
                    aria-hidden="true"
                  />
                  <blockquote className="mt-6 text-lg md:text-xl font-medium text-foreground/80 italic leading-relaxed">
                    &ldquo;The strongest freelance work usually feels calm:
                    fewer handoffs, clearer decisions, and execution that keeps
                    moving.&rdquo;
                  </blockquote>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
