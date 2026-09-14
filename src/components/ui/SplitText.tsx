"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Adapted from React Bits SplitText. See REACT_BITS_LICENSE.md.
// React owns the word spans; no font-dependent DOM splitting or duplicate copy.
export function SplitText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const completed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (completed.current) return;
      const words = el.querySelectorAll("span");
      gsap.fromTo(words, { y: 12 }, {
        y: 0,
        duration: 0.45,
        stagger: { amount: 0.25 },
        ease: "power3.out",
        onComplete: () => { completed.current = true; },
        clearProps: "transform",
      });
    }, el);
    return () => media.revert();
  }, [text]);

  return (
    <p ref={ref} className={className}>
      {text.split(/(\s+)/).map((word, index) => /\s/.test(word)
        ? word
        : <span key={index} className="inline-block">{word}</span>)}
    </p>
  );
}
