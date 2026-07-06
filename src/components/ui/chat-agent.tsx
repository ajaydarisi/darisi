"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CHATBOT_URL } from "@/lib/site-content";

export function ChatAgent() {
  // Hide the floating button while the contact section is on screen: that
  // section already carries the primary CTAs, and hiding avoids the FAB
  // overlapping the form submit on small viewports.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      href={CHATBOT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with the Darisi assistant (opens in a new tab)"
      title="Chat with the Darisi assistant"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      onClick={() =>
        trackEvent(ANALYTICS_EVENTS.chatbotClick, {
          location: "floating_agent",
        })
      }
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        hidden
          ? "pointer-events-none translate-y-4 opacity-0"
          : "opacity-100"
      }`}
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
