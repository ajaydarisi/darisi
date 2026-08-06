"use client";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { skillAreas } from "@/lib/site-content";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-space bg-[#0F2724] text-[#F6F2EA]"
    >
      <div className="site-shell">
        <AnimateOnScroll variant="fade-up">
          <p className="font-utility text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[#7DD3C7]">
            Capabilities
          </p>
          <h2
            id="skills-heading"
            className="mt-4 max-w-2xl font-display text-4xl font-medium leading-[1.08] tracking-[-0.04em] sm:text-5xl"
          >
            The work behind a dependable product.
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-[#EDE9E0]">
            The areas I return to when a customer-facing product, operational
            workflow, or launch-critical platform layer needs to feel clear.
          </p>
        </AnimateOnScroll>

        <div className="mt-12 grid divide-y divide-[#2A4A47] border-y border-[#2A4A47] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {skillAreas.map((skill, index) => (
            <AnimateOnScroll
              key={skill.title}
              variant="fade-up"
              delay={index * 100}
              className="py-8 lg:px-8 lg:py-2 first:lg:pl-0 last:lg:pr-0"
            >
              <article className="h-full py-1">
                <p className="font-utility text-[0.6875rem] font-semibold tracking-[0.14em] text-[#7DD3C7]">
                  0{index + 1}
                </p>
                <h3 className="mt-5 text-xl font-medium tracking-[-0.025em] text-[#F6F2EA]">
                  {skill.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#EDE9E0]">
                  {skill.description}
                </p>
                <p className="mt-6 border-t border-[#2A4A47] pt-4 text-sm leading-relaxed text-[#8AA8A3]">
                  <span className="mb-2 block font-utility text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-[#7DD3C7]">
                    Tools
                  </span>
                  {skill.tools}
                </p>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
