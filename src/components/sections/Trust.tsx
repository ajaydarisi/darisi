"use client";

import { MessageSquareText, Rocket, ShieldCheck } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { trustPoints } from "@/lib/site-content";

const icons = [ShieldCheck, MessageSquareText, Rocket];

export function Trust() {
  return (
    <section aria-labelledby="trust-heading" className="pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up">
          <Card className="rounded-3xl p-8 md:p-10">
            <div className="max-w-2xl">
              <Badge
                variant="default"
                className="text-[10px] uppercase tracking-[0.2em]"
              >
                Why Clients Hire Me
              </Badge>
              <h2
                id="trust-heading"
                className="mt-4 text-2xl md:text-3xl font-medium text-foreground"
              >
                Product-minded execution without the usual handoff friction.
              </h2>
              <p className="mt-4 text-muted leading-relaxed">
                The portfolio shows the work. These are the commitments that make
                the process easier for the people hiring me.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {trustPoints.map((point, index) => {
                const Icon = icons[index] ?? ShieldCheck;

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
          </Card>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
