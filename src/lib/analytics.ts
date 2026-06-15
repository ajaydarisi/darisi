type EventProps = Record<string, string | number | boolean>;

export const ANALYTICS_EVENTS = {
  heroPrimaryCtaClick: "hero_primary_cta_click",
  heroSecondaryCtaClick: "hero_secondary_cta_click",
  navPrimaryCtaClick: "nav_primary_cta_click",
  navMobileCtaClick: "nav_mobile_cta_click",
  workProjectClick: "work_project_click",
  contactFormStart: "contact_form_start",
  contactFormSubmit: "contact_form_submit",
  contactFormError: "contact_form_error",
  fallbackEmailClick: "fallback_email_click",
  faqOpen: "faq_open",
  chatbotClick: "chatbot_click",
} as const;

type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: {
        props?: EventProps;
      }
    ) => void;
  }
}

export const PLAUSIBLE_DOMAIN =
  process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim() ?? "";
export const PLAUSIBLE_API_HOST = (
  process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST?.trim() || "https://plausible.io"
).replace(/\/$/, "");
export const hasPlausibleAnalytics = PLAUSIBLE_DOMAIN.length > 0;

export function trackEvent(eventName: AnalyticsEventName, props?: EventProps) {
  if (typeof window === "undefined" || typeof window.plausible !== "function") {
    return;
  }

  window.plausible(eventName, props ? { props } : undefined);
}
