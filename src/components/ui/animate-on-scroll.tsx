"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type AnimationVariant =
  | "fade-up"
  | "fade-in"
  | "fade-left"
  | "fade-right"
  | "scale-in";

const variantStyles: Record<
  AnimationVariant,
  { initial: string; animate: string }
> = {
  "fade-up": {
    initial: "opacity-0 translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-in": {
    initial: "opacity-0",
    animate: "opacity-100",
  },
  "fade-left": {
    initial: "opacity-0 translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 -translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  "scale-in": {
    initial: "opacity-0 scale-95",
    animate: "opacity-100 scale-100",
  },
};

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
}

export function AnimateOnScroll({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 700,
}: AnimateOnScrollProps) {
  const { ref, hasEnteredView, hasMeasured, isInView } = useInView();
  const styles = variantStyles[variant];
  const shouldHide = hasMeasured && !isInView && !hasEnteredView;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out will-change-transform",
        shouldHide ? styles.initial : styles.animate,
        className
      )}
      style={{
        transitionDelay: shouldHide ? "0ms" : `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
