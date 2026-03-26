"use client";

import { BriefcaseBusiness, ShoppingBag, Store, Wrench } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  bestFitBoundary,
  bestFitEngagements,
} from "@/lib/site-content";

const icons = [BriefcaseBusiness, ShoppingBag, Store, Wrench];

export function BestFit() {
  return (
    <section id="fit" aria-labelledby="fit-heading" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up">
          <div className="text-center">
            <Badge
              variant="default"
              className="text-[10px] uppercase tracking-[0.2em]"
            >
              Best-Fit Engagements
            </Badge>
            <h2
              id="fit-heading"
              className="mt-4 text-2xl md:text-3xl font-medium text-foreground"
            >
              The projects where I create the most leverage.
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-muted leading-relaxed">
              If your team needs both product thinking and reliable execution,
              this is the kind of work I am built for.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {bestFitEngagements.map((entry, index) => {
            const Icon = icons[index] ?? BriefcaseBusiness;

            return (
              <AnimateOnScroll
                key={entry.title}
                variant="fade-up"
                delay={index * 100}
              >
                <Card asChild className="h-full">
                  <article>
                    <CardContent className="px-8 pb-8 pt-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="mt-5 text-xl font-medium text-foreground">
                        {entry.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {entry.description}
                      </p>
                  </CardContent>
                  </article>
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>

        <AnimateOnScroll variant="fade-up" delay={450}>
          <Alert className="mt-8 bg-background/60">
            <AlertDescription>{bestFitBoundary}</AlertDescription>
          </Alert>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
