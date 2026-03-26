type EventProps = Record<string, string | number | boolean>;

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

export function trackEvent(eventName: string, props?: EventProps) {
  if (typeof window === "undefined" || typeof window.plausible !== "function") {
    return;
  }

  window.plausible(eventName, props ? { props } : undefined);
}
