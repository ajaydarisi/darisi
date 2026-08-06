import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Badge } from "@/components/ui/badge";
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
        <section aria-labelledby="blog-heading" className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <Badge
              variant="default"
              className="text-[11px] uppercase tracking-[0.2em]"
            >
              Blog
            </Badge>
            <h1
              id="blog-heading"
              className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl"
            >
              Notes from client work.
            </h1>
            <p className="mt-4 leading-relaxed text-foreground/90">
              Practical writing on product web apps, internal systems,
              payments, and async delivery — drawn from real product work.
            </p>

            <ul className="mt-12 space-y-6">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 md:p-8"
                  >
                    <article>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-subtle">
                        <Badge
                          variant="secondary"
                          className="text-[11px] uppercase tracking-[0.2em]"
                        >
                          {post.tag}
                        </Badge>
                        <time dateTime={post.datePublished}>
                          {formatPostDate(post.datePublished)}
                        </time>
                        <span aria-hidden="true">·</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <h2 className="mt-4 text-xl font-medium text-foreground">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {post.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-primary-text">
                        Read post
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </article>
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
