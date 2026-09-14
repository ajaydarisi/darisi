"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Adapted from React Bits SpotlightCard. See REACT_BITS_LICENSE.md.
// Pointer position is decoration only; links retain a conventional focus ring.
export function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };
    const sync = () => {
      el.removeEventListener("pointermove", move);
      el.style.removeProperty("--spot-x");
      el.style.removeProperty("--spot-y");
      if (query.matches) el.addEventListener("pointermove", move);
    };
    sync();
    query.addEventListener("change", sync);
    return () => {
      query.removeEventListener("change", sync);
      el.removeEventListener("pointermove", move);
    };
  }, []);

  return <div ref={ref} className={`spotlight-card ${className}`}>{children}</div>;
}
