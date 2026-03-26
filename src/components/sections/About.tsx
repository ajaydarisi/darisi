"use client";

import Image from "next/image";
import { Compass, LayoutTemplate, Workflow } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Card, CardContent } from "@/components/ui/card";

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
              <h2
                id="about-heading"
                className="text-2xl md:text-3xl font-medium text-foreground mb-8"
              >
                About Me
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fade-up" delay={100}>
              <p className="text-muted leading-relaxed text-lg">
                I&apos;m{" "}
                <strong className="text-foreground">Ajay Darisi</strong>, a
                freelance product engineer and designer. Clients bring me in
                when they need someone who can shape the product, design the
                experience, and ship the build without splitting ownership
                across multiple people.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fade-up" delay={200}>
              <p className="text-muted leading-relaxed text-lg mt-6">
                Darisi is the brand around that way of working: calm
                communication, clean execution, and digital products that feel
                considered instead of overbuilt. The strongest projects usually
                sit in web apps, e-commerce, marketplaces, and internal tools.
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
                    &ldquo;The best work happens when product thinking and
                    implementation stay in the same conversation.&rdquo;
                  </blockquote>
                  <p className="mt-4 text-sm text-muted">— Ajay Darisi</p>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
