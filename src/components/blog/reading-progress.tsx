"use client";

import { useEffect, useRef } from "react";

/** Accent hairline across the top of the viewport tracking how far through the
 *  article the reader is. Writes the width straight to the node — driving it
 *  through state would re-render the whole article on every scroll frame. */
export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let queued = false;

    const update = () => {
      queued = false;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent =
        scrollable > 0
          ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100))
          : 0;

      if (bar.current) bar.current.style.width = `${percent.toFixed(1)}%`;
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[95] h-[3px] bg-transparent"
    >
      <div
        ref={bar}
        className="h-full w-0 bg-accent transition-[width] duration-[120ms] ease-linear"
      />
    </div>
  );
}
