"use client";

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// React Bits AnimatedContent, adapted for progressive enhancement.
// See REACT_BITS_LICENSE.md. All content ships visible; only entering content moves.
interface AnimatedContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  distance?: number;
  duration?: number;
  ease?: string;
  delay?: number;
}

export default function AnimatedContent({
  children, distance = 24, duration = 0.5, ease = "power3.out", delay = 0,
  className, ...props
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const completed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", (context) => {
      if (completed.current) return;
      // Don't replay entrances over restored scroll positions or direct anchors.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        completed.current = true;
        return;
      }
      let tween: gsap.core.Tween | undefined;
      context.add("enter", () => {
        completed.current = true;
        tween = gsap.fromTo(el, { y: distance }, {
          y: 0, duration, delay, ease, clearProps: "transform",
        });
      });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => context.enter(),
      });
      const focus = () => {
        trigger.kill();
        tween?.progress(1);
        completed.current = true;
      };
      el.addEventListener("focusin", focus);
      return () => el.removeEventListener("focusin", focus);
    }, el);
    return () => media.revert();
  }, [distance, duration, delay, ease]);

  return <div ref={ref} data-reveal="" className={className} {...props}>{children}</div>;
}
