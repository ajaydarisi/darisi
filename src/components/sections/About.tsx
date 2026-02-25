export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 id="about-heading" className="text-2xl font-medium text-foreground mb-8">
          About Darisi
        </h2>
        <div className="bg-surface border border-border rounded-2xl p-6 lg:p-10">
          <p className="text-muted leading-relaxed text-lg">
            <strong>Darisi</strong> is a modern digital brand building apps,
            design systems, and curated online experiences. We believe in quiet
            power — where clean code meets purposeful design. Every product we
            ship is built with precision, minimal aesthetics, and long-term
            thinking.
          </p>
          <p className="text-muted leading-relaxed text-lg mt-6">
            From early-stage concepts to production-ready platforms,{" "}
            <strong>Darisi</strong> operates at the intersection of engineering
            and design — creating tools and experiences that feel effortless.
          </p>
        </div>
      </div>
    </section>
  );
}
