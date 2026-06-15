"use client";

import { MessageCircle } from "lucide-react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { CHATBOT_URL } from "@/lib/site-content";

export function ChatAgent() {
  return (
    <a
      href={CHATBOT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open chat with us in a new tab"
      onClick={() =>
        trackEvent(ANALYTICS_EVENTS.chatbotClick, {
          location: "floating_agent",
        })
      }
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  );
}
