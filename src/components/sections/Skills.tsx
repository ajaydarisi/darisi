"use client";

import AnimatedContent from "@/components/ui/AnimatedContent";
import { skillAreas } from "@/lib/site-content";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="min-h-[52.5625rem] bg-[#0F2724] py-[4.5rem] text-[#F6F2EA]"
    >
      <div className="site-shell">
        <AnimatedContent>
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-[#DDA082]" aria-hidden="true" />
            <p className="font-utility text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[#C8DAD6]">
              Capabilities · the throughline
            </p>
          </div>
          <h2
            id="skills-heading"
            className="mt-[6.0625rem] max-w-[40rem] font-display text-[clamp(3.25rem,6vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.055em]"
          >
            From first sketch to{" "}
            <span className="italic text-[#DDA082]">dependable system.</span>
          </h2>
        </AnimatedContent>

        <div className="mt-[8.875rem] grid border-y border-[#2A4A47] lg:grid-cols-3 lg:divide-x lg:divide-[#2A4A47]">
          {skillAreas.map((skill, index) => (
            <AnimatedContent
              key={skill.title}
              delay={index * 0.1}
              className="border-b border-[#2A4A47] py-8 last:border-b-0 lg:border-b-0 lg:py-3 lg:px-9 lg:first:pl-0"
            >
              <article className="flex h-full flex-col">
                <p className="font-utility text-[0.6875rem] font-medium tracking-[0.14em] text-[#C8DAD6]">
                  0{index + 1}
                </p>
                <h3 className="mt-5 font-display text-[1.75rem] font-medium leading-tight tracking-[-0.03em] text-[#F6F2EA]">
                  {skill.title}
                </h3>
                <p className="mt-3 text-sm leading-5 text-[#C8DAD6]">
                  {skill.description}
                </p>
                <p className="mt-auto border-t border-[#2A4A47] pt-3 text-sm leading-5 text-[#8AA8A3]">
                  <span className="mr-2 font-utility text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[#C8DAD6]">
                    Tools
                  </span>
                  {skill.tools}
                </p>
              </article>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
