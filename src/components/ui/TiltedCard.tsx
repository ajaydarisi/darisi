"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

// React Bits TiltedCard interaction, adapted to GSAP and semantic linked content.
// See REACT_BITS_LICENSE.md. The outer layout owns any resting rotation.
export function TiltedCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const rotateX = gsap.quickTo(el, "rotationX", { duration: 0.35, ease: "power3.out" });
      const rotateY = gsap.quickTo(el, "rotationY", { duration: 0.35, ease: "power3.out" });
      // quickTo/resetTo needs concrete properties, not CSSPlugin's scale alias.
      const scaleX = gsap.quickTo(el, "scaleX", { duration: 0.35, ease: "power3.out" });
      const scaleY = gsap.quickTo(el, "scaleY", { duration: 0.35, ease: "power3.out" });
      gsap.set(el, { transformPerspective: 800 });
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const rect = el.getBoundingClientRect();
        const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
        const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
        rotateX(-y * 5);
        rotateY(x * 5);
        scaleX(1.02);
        scaleY(1.02);
      };
      const reset = () => { rotateX(0); rotateY(0); scaleX(1); scaleY(1); };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
      el.addEventListener("pointercancel", reset);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", reset);
        el.removeEventListener("pointercancel", reset);
      };
    }, el);
    return () => media.revert();
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
