"use client";

import { Clock3, MessageSquareText, Rocket } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { trustPoints } from "@/lib/site-content";

const icons = [MessageSquareText, Clock3, Rocket];

export function Trust() {
  return (
    <section aria-labelledby="trust-heading" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up">
          <div className="text-center">
            <Badge
              variant="default"
              className="text-[10px] uppercase tracking-[0.2em]"
            >
              Working With Darisi
            </Badge>
            <h2
              id="trust-heading"
              className="mt-4 text-2xl md:text-3xl font-medium text-foreground"
            >
              A direct freelance model for product work that needs to ship.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted">
              Darisi is meant to feel personal, focused, and easy to work with
              for teams hiring help on web apps, internal systems, and
              platform-heavy builds. The goal is fewer handoffs, clearer
              decisions, and delivery that stays steady from first scope to
              launch.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {trustPoints.map((point, index) => {
            const Icon = icons[index] ?? MessageSquareText;

            return (
              <AnimateOnScroll
                key={point.title}
                variant="fade-up"
                delay={index * 100}
              >
                <Card className="h-full bg-background/60">
                  <CardContent className="px-6 pb-6 pt-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-5 text-lg font-medium text-foreground">
                      {point.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
