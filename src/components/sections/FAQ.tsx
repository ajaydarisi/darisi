"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Badge } from "@/components/ui/badge";
import { faqEntries } from "@/lib/site-content";

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up">
          <div className="mb-16 text-center">
            <Badge
              variant="default"
              className="text-[10px] uppercase tracking-[0.2em]"
            >
              FAQ
            </Badge>
            <h2
              id="faq-heading"
              className="mt-4 text-2xl font-medium text-foreground md:text-3xl"
            >
              Questions buyers usually ask before reaching out
            </h2>
            <p className="mt-4 text-muted">
              The practical stuff: fit, timelines, pricing approach, and what
              working together looks like.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up" delay={100}>
          <Accordion type="single" collapsible className="divide-y divide-border">
            {faqEntries.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
