"use client";

import { useRef, useState } from "react";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle,
  Info,
  Mail,
  Send,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import {
  CONTACT_EMAIL,
  FORMSPARK_ENDPOINT,
  contactContent,
  hasContactForm,
} from "@/lib/site-content";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const hasTrackedFormStart = useRef(false);

  function handleFormStart() {
    if (hasTrackedFormStart.current) {
      return;
    }

    hasTrackedFormStart.current = true;
    trackEvent(ANALYTICS_EVENTS.contactFormStart, {
      source: "contact_form",
    });
  }

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
        trackEvent(ANALYTICS_EVENTS.contactFormSubmit, {
          source: "contact_form",
        });
        setStatus("success");
        form.reset();
      } else {
        trackEvent(ANALYTICS_EVENTS.contactFormError, {
          source: "contact_form",
          reason: "server_response",
        });
        setStatus("error");
      }
    } catch {
      trackEvent(ANALYTICS_EVENTS.contactFormError, {
        source: "contact_form",
        reason: "network_failure",
      });
      setStatus("error");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div className="h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
        </div>

        <AnimateOnScroll variant="scale-in">
          <Card className="relative rounded-3xl p-10 md:p-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <Badge
                  variant="default"
                  className="uppercase tracking-[0.2em] text-[10px]"
                >
                  Start a Project
                </Badge>
                <h2
                  id="contact-heading"
                  className="mt-4 text-2xl md:text-4xl font-medium text-foreground"
                >
                  Tell me what you need to ship next.
                </h2>
                <p className="mt-4 text-muted leading-relaxed">
                  {contactContent.intro}
                </p>

                <Alert className="mt-8 flex gap-3 bg-background/60">
                  <Info className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <AlertTitle>What happens next</AlertTitle>
                    <AlertDescription>
                      I will review the scope, reply with the clearest next step
                      I can offer, and keep the conversation practical. No
                      pressure, no agency-style sales process, and no long
                      delay before you know whether the fit is right.
                    </AlertDescription>
                  </div>
                </Alert>

                <div className="mt-8 rounded-2xl border border-border bg-background/50 p-5">
                  <div className="flex items-center gap-3 text-sm font-medium text-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{contactContent.quickEmailLabel}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {contactContent.quickEmailHelper}
                  </p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button asChild variant="outline">
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        onClick={() =>
                          trackEvent(ANALYTICS_EVENTS.fallbackEmailClick, {
                            location: "contact_panel",
                          })
                        }
                      >
                        Email Me Directly
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <p className="text-sm text-muted">{CONTACT_EMAIL}</p>
                  </div>
                </div>
              </div>

              <div>
                {status === "success" ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                    <CheckCircle className="h-12 w-12 text-primary" />
                    <p className="text-lg font-medium text-foreground">
                      Inquiry sent.
                    </p>
                    <p className="max-w-sm text-sm leading-relaxed text-muted">
                      Thanks for the context. I will reply within 24 hours with
                      next steps or a few clarifying questions.
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        hasTrackedFormStart.current = false;
                        setStatus("idle");
                      }}
                      className="mt-2"
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    onFocusCapture={handleFormStart}
                    className="space-y-5"
                  >
                    {!hasContactForm ? (
                      <Alert
                        id="contact-unavailable"
                        className="flex gap-3 border-primary/20 bg-primary/10"
                      >
                        <Info className="mt-0.5 h-4 w-4 text-primary" />
                        <div>
                          <AlertTitle>
                            {contactContent.formUnavailableTitle}
                          </AlertTitle>
                          <AlertDescription>
                            {contactContent.formUnavailableMessage}
                          </AlertDescription>
                        </div>
                      </Alert>
                    ) : null}

                    <fieldset
                      disabled={!hasContactForm || status === "submitting"}
                      className="space-y-5"
                    >
                      <div
                        aria-hidden="true"
                        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                      >
                        <Label htmlFor="formspark-honeypot">Leave blank</Label>
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
                          <Label htmlFor="name" className="mb-2 block">
                            Name
                          </Label>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="mb-2 block">
                            Email
                          </Label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message" className="mb-2 block">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          className="resize-none"
                          placeholder="What are you building, who is it for, and what do you need help with? If helpful, include timeline, company, or budget context here too."
                        />
                      </div>
                    </fieldset>

                    {status === "error" ? (
                      <Alert
                        id="contact-error"
                        variant="destructive"
                        className="flex gap-3"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 text-red-300" />
                        <div>
                          <AlertTitle>Something went wrong</AlertTitle>
                          <AlertDescription className="text-red-200/90">
                            Please try again or email me directly.
                          </AlertDescription>
                        </div>
                      </Alert>
                    ) : null}

                    <div className="space-y-3">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={!hasContactForm || status === "submitting"}
                        className="w-full sm:w-auto"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        {!hasContactForm
                          ? "Form Unavailable"
                          : status === "submitting"
                            ? "Sending..."
                            : "Send Inquiry"}
                      </Button>
                      <p className="text-sm leading-relaxed text-muted">
                        <span className="font-medium text-foreground">
                          {contactContent.responsePromise}
                        </span>{" "}
                        {contactContent.nextStepNote}
                      </p>
                      <p className="text-sm leading-relaxed text-muted">
                        Rough answers are fine. If the project is early, sharing
                        the audience, blocker, and likely timeline is enough to
                        get the right conversation started.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Card>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
