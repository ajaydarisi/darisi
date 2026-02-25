import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="min-h-[85vh] flex items-center">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-32">
        <h1 className="text-6xl md:text-8xl font-semibold tracking-tight text-foreground">
          DARISI
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-muted font-medium">
          Build. Design. Launch.
        </p>
        <p className="mt-6 max-w-xl text-muted leading-relaxed">
          We craft modern digital experiences — from product design to full-stack
          engineering. Precision-built tools, apps, and platforms that move fast
          and feel right.
        </p>
        <Button asChild size="lg" className="mt-10">
          <a href="#work">Explore Our Work</a>
        </Button>
      </div>
    </section>
  );
}
