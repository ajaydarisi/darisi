import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { seoConfig } from "@/lib/seo";
import {
  blogIndexDescription,
  blogIndexTitle,
  blogPosts,
  buildBlogIndexJsonLd,
  formatPostDate,
} from "@/lib/blog";

export const metadata: Metadata = {
  title: blogIndexTitle,
  description: blogIndexDescription,
  alternates: {
    canonical: `${seoConfig.siteUrl}/blog`,
  },
  openGraph: {
    type: "website",
    url: `${seoConfig.siteUrl}/blog`,
    siteName: seoConfig.siteName,
    title: blogIndexTitle,
    description: blogIndexDescription,
  },
};

const jsonLd = buildBlogIndexJsonLd();

export default function BlogIndex() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section
          aria-labelledby="blog-heading"
          className="border-b border-border-subtle pt-[9.5rem] pb-[5.3125rem]"
        >
          <div className="site-shell">
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              <p className="font-utility text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary-text">
                Blog
              </p>
            </div>
            <h1
              id="blog-heading"
              className="mt-4 max-w-[40rem] font-display text-[clamp(3.25rem,6vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.055em] text-foreground"
            >
              Notes from <span className="italic text-accent">client work.</span>
            </h1>
            <p className="mt-6 max-w-[38rem] text-[1.0625rem] leading-[1.7] text-[var(--text-body)]">
              Practical writing on product web apps, internal systems,
              payments, and async delivery — drawn from real product work.
            </p>

            <ul
              className="mt-14 divide-y divide-border-subtle border-y border-border-subtle"
              aria-label="Blog posts"
            >
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-3 py-8 transition-colors sm:flex-row sm:items-start sm:justify-between sm:gap-8"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-utility text-[0.625rem] font-medium uppercase tracking-[0.12em] text-primary-text">
                        <span>{post.tag}</span>
                        <span aria-hidden="true" className="text-border">
                          ·
                        </span>
                        <time dateTime={post.datePublished}>
                          {formatPostDate(post.datePublished)}
                        </time>
                        <span aria-hidden="true" className="text-border">
                          ·
                        </span>
                        <span>{post.readingTime}</span>
                      </div>
                      <h2 className="mt-4 font-display text-2xl font-medium tracking-[-0.03em] text-foreground">
                        {post.title}
                      </h2>
                      <p className="mt-3 max-w-[38rem] text-sm leading-relaxed text-muted-foreground">
                        {post.description}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground transition-colors group-hover:text-primary-text">
                      Read post
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
