"use client";

import { ChevronDown } from "lucide-react";
import { Accordion } from "radix-ui";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { faqEntries } from "@/lib/site-content";

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll variant="fade-up">
          <div className="text-center mb-16">
            <h2
              id="faq-heading"
              className="text-2xl md:text-3xl font-medium text-foreground"
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted">
              Answers to the questions I hear most.
            </p>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fade-up" delay={100}>
          <Accordion.Root
            type="single"
            collapsible
            className="divide-y divide-border"
          >
            {faqEntries.map((faq, index) => (
              <Accordion.Item
                key={faq.question}
                value={`faq-${index}`}
                className="py-6"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="faq-trigger flex w-full items-center justify-between gap-4 text-left">
                    <span className="text-base font-medium text-foreground">
                      {faq.question}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className="faq-icon w-5 h-5 shrink-0 text-muted transition-transform duration-300"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="pt-3">
                    <p className="text-sm leading-relaxed text-muted">
                      {faq.answer}
                    </p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
