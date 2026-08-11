"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedContent from "@/components/ui/AnimatedContent";
import { blogPosts } from "@/lib/blog";

export function Notes() {
  return (
    <section id="notes" aria-labelledby="notes-heading" className="pb-10 pt-30">
      <div className="site-shell">
        <p className="hand mb-1.5 rotate-[-2deg] text-[1.75rem] text-soft">
          decisions, not tutorials
        </p>
        <AnimatedContent>
          <h2
            id="notes-heading"
            className="text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.94] -tracking-[0.05em] text-foreground"
          >
            Notes
          </h2>
        </AnimatedContent>

        <div className="mt-12 flex flex-col gap-3.5">
          {blogPosts.map((post, index) => (
            <AnimatedContent key={post.slug} delay={index * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex flex-wrap items-center gap-7 rounded-3xl bg-card px-8 py-6.5 shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-standard)] hover:-translate-y-1 hover:shadow-[var(--shadow-up)]"
              >
                <span className="shrink-0 rounded-full bg-background px-3.5 py-[0.4375rem] text-[0.8125rem] font-semibold text-[var(--text-body)]">
                  {post.tag}
                </span>
                <span className="min-w-0 flex-[1_1_20rem] text-[clamp(1.1rem,1.7vw,1.4rem)] font-semibold -tracking-[0.025em] text-foreground">
                  {post.title}
                </span>
                <span className="shrink-0 text-sm font-medium text-soft">
                  {post.readingTime}
                </span>
                <ArrowRight className="size-5 shrink-0 text-accent" aria-hidden="true" />
              </Link>
            </AnimatedContent>
          ))}
        </div>

        {/* The design stops at the five cards; /blog is a real route and would be
            unreachable from the homepage without this. */}
        <Link
          href="/blog"
          className="hand mt-6 inline-flex items-center gap-2 rotate-[-2deg] text-[1.5rem] text-soft transition-colors hover:text-accent"
        >
          all the notes
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
