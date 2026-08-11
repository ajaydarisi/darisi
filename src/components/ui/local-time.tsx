"use client";

import { useEffect, useState } from "react";

const IST_OFFSET_MINUTES = 5.5 * 60;

function bengaluruTime(): string {
  const now = new Date();
  const ist = new Date(
    now.getTime() + (now.getTimezoneOffset() + IST_OFFSET_MINUTES) * 60_000
  );
  const hours = ist.getHours();
  const minutes = String(ist.getMinutes()).padStart(2, "0");

  return `${((hours + 11) % 12) + 1}:${minutes}${hours >= 12 ? "pm" : "am"}`;
}

/**
 * Bengaluru wall clock, rendered client-side only. Server output would be the
 * build-time clock and would mismatch on hydration, so the first paint is empty
 * and the time fills in on mount.
 */
export function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(bengaluruTime());

    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return <time suppressHydrationWarning>{time}</time>;
}
