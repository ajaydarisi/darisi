import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ogImage, seoConfig } from "@/lib/seo";
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
    // A child route's `alternates` replaces the parent's, so the feed link
    // has to be repeated here or /blog silently loses it.
    types: { "application/rss+xml": `${seoConfig.siteUrl}/feed.xml` },
  },
  openGraph: {
    type: "website",
    locale: seoConfig.locale,
    url: `${seoConfig.siteUrl}/blog`,
    siteName: seoConfig.siteName,
    title: blogIndexTitle,
    description: blogIndexDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: blogIndexTitle,
    description: blogIndexDescription,
    images: [ogImage.url],
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
      <main id="main-content" tabIndex={-1} className="overflow-x-clip">
        <section
          aria-labelledby="blog-heading"
          className="relative -mt-[4.625rem] pb-10 pt-[clamp(7.375rem,12vw,9.375rem)]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[20rem] left-1/2 h-[50rem] w-[87.5rem] animate-[breathe_13s_ease-in-out_infinite] bg-[radial-gradient(closest-side,var(--wash1),var(--wash2))] [translate:-50%]"
          />

          <div className="site-shell relative">
            <p className="hand mb-1.5 rotate-[-2deg] text-[1.75rem] text-soft">
              decisions, not tutorials
            </p>
            <h1
              id="blog-heading"
              className="text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.94] -tracking-[0.05em] text-foreground"
            >
              Notes
            </h1>
            <p className="mt-6 max-w-[38rem] text-[clamp(1.1rem,1.9vw,1.45rem)] font-medium leading-[1.45] -tracking-[0.02em] text-[var(--text-body)]">
              Practical writing on product web apps, internal systems, payments,
              and async delivery — drawn from real product work.
            </p>

            <ul className="mt-14 flex flex-col gap-3.5" aria-label="Blog posts">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block rounded-3xl bg-card px-[clamp(1.5rem,3vw,2rem)] py-7 shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-standard)] hover:-translate-y-1 hover:shadow-[var(--shadow-up)]"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex h-8 items-center rounded-full bg-background px-3.5 text-[0.8125rem] font-semibold text-[var(--text-body)]">
                        {post.tag}
                      </span>
                      <time
                        dateTime={post.datePublished}
                        className="text-sm font-medium text-soft"
                      >
                        {formatPostDate(post.datePublished)}
                      </time>
                      <span
                        aria-hidden="true"
                        className="size-[5px] rounded-full bg-[#DDA082]"
                      />
                      <span className="text-sm font-medium text-soft">
                        {post.readingTime}
                      </span>
                    </div>
                    <h2 className="mt-4 text-[clamp(1.3rem,2.4vw,1.75rem)] font-bold leading-[1.15] -tracking-[0.035em] text-foreground">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-[44rem] text-[1.0625rem] leading-[1.6] text-[var(--text-body)]">
                      {post.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-foreground">
                      Read note
                      <ArrowRight className="size-[1.0625rem] text-accent" aria-hidden="true" />
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
