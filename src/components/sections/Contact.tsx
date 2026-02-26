"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        {/* Decorative glow */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <AnimateOnScroll variant="scale-in">
          <div className="relative bg-surface border border-border rounded-3xl p-10 md:p-16 text-center">
            <h2
              id="contact-heading"
              className="text-2xl md:text-4xl font-medium text-foreground"
            >
              Let&apos;s Build Something Great
            </h2>
            <p className="mt-4 text-muted max-w-lg mx-auto leading-relaxed">
              Have a project in mind? We&apos;d love to hear about it. Reach out
              and let&apos;s turn your ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg">
                <a href="mailto:ajaydarisi5@gmail.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Get in Touch
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#work">View Our Work</a>
              </Button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
