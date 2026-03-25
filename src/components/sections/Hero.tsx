import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      aria-label="Darisi — Hero"
      className="relative min-h-[85vh] flex items-center overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[80px]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-32">
        <div className="animate-hero-rise mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-xs font-medium text-muted tracking-wide uppercase">
            Freelance Developer & Designer
          </span>
        </div>

        <h1
          className="animate-hero-rise text-6xl font-semibold tracking-tight text-gradient-primary md:text-8xl"
          style={{ animationDelay: "150ms" }}
        >
          DARISI
        </h1>

        <p
          className="animate-hero-rise mt-4 text-xl font-medium text-muted md:text-2xl"
          style={{ animationDelay: "150ms" }}
          role="doc-subtitle"
        >
          Your Vision. Precision-Built.
        </p>

        <p
          className="animate-hero-rise mt-6 max-w-xl leading-relaxed text-muted"
          style={{ animationDelay: "300ms" }}
        >
          I help startups and businesses ship products that users love — from
          first wireframe to production deploy. Fast timelines, clean code,
          zero headaches.
        </p>

        <div
          className="animate-hero-rise mt-10 flex flex-col gap-4 sm:flex-row"
          style={{ animationDelay: "450ms" }}
        >
          <Button asChild size="lg">
            <a href="#work" aria-label="Explore my portfolio work">
              Explore My Work
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#contact" aria-label="Start your project with Ajay Darisi">
              Start Your Project
            </a>
          </Button>
        </div>

        <div
          className="animate-hero-rise mt-4 flex items-center gap-1.5"
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
        className="animate-hero-rise absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 group"
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
