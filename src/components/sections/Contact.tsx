"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import {
  CONTACT_EMAIL,
  FORMSPARK_ENDPOINT,
  contactContent,
  hasContactForm,
} from "@/lib/site-content";

type FormStatus = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-border bg-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted/50 outline-none transition-colors duration-200 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!hasContactForm) {
      return;
    }

    setStatus("submitting");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(FORMSPARK_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

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
          <div className="relative bg-surface border border-border rounded-3xl p-10 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left — Text */}
              <div>
                <h2
                  id="contact-heading"
                  className="text-2xl md:text-4xl font-medium text-foreground"
                >
                  Let&apos;s Build Something Great
                </h2>
                <p className="mt-4 text-muted leading-relaxed">
                  {contactContent.intro}
                </p>
                <div className="mt-8 flex items-center gap-3 text-sm text-muted">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>
                    Or email me directly at{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-foreground hover:text-primary transition-colors duration-200"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </span>
                </div>
              </div>

              {/* Right — Form */}
              <div>
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                    <CheckCircle className="w-12 h-12 text-primary" />
                    <p className="text-lg font-medium text-foreground">
                      Message sent!
                    </p>
                    <p className="text-sm text-muted">
                      I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="text-sm text-primary hover:text-primary-hover transition-colors duration-200 mt-2"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {!hasContactForm && (
                      <div
                        id="contact-unavailable"
                        className="rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3"
                      >
                        <p className="text-sm font-medium text-foreground">
                          {contactContent.formUnavailableTitle}
                        </p>
                        <p className="mt-1 text-sm text-muted">
                          {contactContent.formUnavailableMessage}
                        </p>
                      </div>
                    )}

                    <fieldset
                      disabled={!hasContactForm || status === "submitting"}
                      className="space-y-5"
                    >
                      <div
                        aria-hidden="true"
                        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                      >
                        <label htmlFor="formspark-honeypot">Leave blank</label>
                        <input
                          type="text"
                          id="formspark-honeypot"
                          name="_honeypot"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-foreground"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className={inputClasses}
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-foreground"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className={inputClasses}
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="projectType"
                            className="mb-2 block text-sm font-medium text-foreground"
                          >
                            Project Type
                          </label>
                          <select
                            id="projectType"
                            name="projectType"
                            required
                            className={`${inputClasses} appearance-none`}
                          >
                            <option value="">Select a type</option>
                            <option value="Web Application">
                              Web Application
                            </option>
                            <option value="Mobile App">Mobile App</option>
                            <option value="Design System">Design System</option>
                            <option value="Product Design">Product Design</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="budget"
                            className="mb-2 block text-sm font-medium text-foreground"
                          >
                            Budget Range{" "}
                            <span className="font-normal text-muted">
                              (optional)
                            </span>
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            className={`${inputClasses} appearance-none`}
                          >
                            <option value="">Select a range</option>
                            <option value="Under ₹50,000">Under ₹50,000</option>
                            <option value="₹50,000 - ₹2,00,000">
                              ₹50,000 - ₹2,00,000
                            </option>
                            <option value="₹2,00,000 - ₹10,00,000">
                              ₹2,00,000 - ₹10,00,000
                            </option>
                            <option value="₹10,00,000+">₹10,00,000+</option>
                            <option value="Let's discuss">
                              Let&apos;s discuss
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block text-sm font-medium text-foreground"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          required
                          className={`${inputClasses} resize-none`}
                          placeholder="Tell me about your project..."
                        />
                      </div>
                    </fieldset>

                    {status === "error" && (
                      <p id="contact-error" className="text-sm text-red-400">
                        Something went wrong. Please try again or email me
                        directly.
                      </p>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={!hasContactForm || status === "submitting"}
                      className="w-full sm:w-auto"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {!hasContactForm
                        ? "Form Unavailable"
                        : status === "submitting"
                        ? "Sending..."
                        : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
