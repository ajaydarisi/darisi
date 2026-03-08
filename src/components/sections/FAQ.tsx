"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What's your typical project timeline?",
    answer:
      "Most projects take 4\u20138 weeks from kickoff to launch, depending on scope. I'll give you a realistic timeline during our discovery call \u2014 no vague estimates.",
  },
  {
    question: "How do you handle revisions?",
    answer:
      "Each project includes two rounds of revisions. I'd rather get it right the first time through clear communication upfront, but the buffer is there if we need it.",
  },
  {
    question: "What's your tech stack?",
    answer:
      "I primarily work with Next.js, React, TypeScript, Supabase, and Tailwind CSS. I choose tools based on what's best for your project, not personal preference.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. I've worked with clients across time zones. I keep communication async-friendly with regular written updates and scheduled check-ins.",
  },
  {
    question: "What happens after launch?",
    answer:
      "I don't disappear after deployment. I offer 30 days of post-launch support included, and ongoing maintenance packages if you need them.",
  },
  {
    question: "How do I get started?",
    answer:
      "Fill out the contact form below or email me directly. I'll respond within 24 hours with next steps.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          <div className="divide-y divide-border">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6">
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between text-left gap-4"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-base font-medium text-foreground">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted shrink-0 transition-transform duration-300",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100 mt-3"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
