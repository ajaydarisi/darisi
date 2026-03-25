import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      aria-label="Darisi — Hero"
      className="relative flex min-h-[calc(100svh-4rem-1px)] items-center overflow-hidden md:min-h-[85vh]"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[80px]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 sm:py-20 lg:px-8 lg:py-32">
        <div className="animate-hero-rise mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 sm:mb-8 sm:px-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-xs font-medium text-muted tracking-wide uppercase">
            Freelance Developer & Designer
          </span>
        </div>

        <h1
          className="animate-hero-rise text-5xl font-semibold tracking-tight text-gradient-primary sm:text-6xl md:text-8xl"
          style={{ animationDelay: "150ms" }}
        >
          DARISI
        </h1>

        <p
          className="animate-hero-rise mt-3 text-lg font-medium text-muted sm:mt-4 sm:text-xl md:text-2xl"
          style={{ animationDelay: "150ms" }}
          role="doc-subtitle"
        >
          Your Vision. Precision-Built.
        </p>

        <p
          className="animate-hero-rise mt-5 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg"
          style={{ animationDelay: "300ms" }}
        >
          I help startups and businesses ship products that users love — from
          first wireframe to production deploy. Fast timelines, clean code,
          zero headaches.
        </p>

        <div
          className="animate-hero-rise mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
          style={{ animationDelay: "450ms" }}
        >
          <Button asChild size="default" className="sm:h-12 sm:px-8 sm:text-base">
            <a href="#work" aria-label="Explore my portfolio work">
              Explore My Work
            </a>
          </Button>
          <Button
            asChild
            size="default"
            variant="outline"
            className="sm:h-12 sm:px-8 sm:text-base"
          >
            <a href="#contact" aria-label="Start your project with Ajay Darisi">
              Start Your Project
            </a>
          </Button>
        </div>

        <div
          className="animate-hero-rise mt-4 hidden items-center gap-1.5 sm:flex"
          style={{ animationDelay: "600ms" }}
        >
          <svg
            className="w-3.5 h-3.5 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-xs text-muted">
            Available around the clock
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="group absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex animate-hero-rise"
        style={{ animationDelay: "750ms" }}
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted/60 group-hover:text-primary/60 transition-colors duration-300">
          Scroll down
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-muted/30 group-hover:border-primary/40 transition-colors duration-300 pt-2">
          <div className="w-1 h-2.5 rounded-full bg-primary animate-scroll-dot mx-auto block" />
        </div>
      </a>
    </section>
  );
}
