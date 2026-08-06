import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
          className="section-space--compact"
        >
          <div className="reading-shell">
            <Badge variant="eyebrow">Blog</Badge>
            <h1 id="blog-heading" className="page-title">
              Notes from client work.
            </h1>
            <p className="page-description">
              Practical writing on product web apps, internal systems,
              payments, and async delivery — drawn from real product work.
            </p>

            <ul className="mt-12 space-y-5">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <Card asChild variant="interactive">
                    <Link href={`/blog/${post.slug}`} className="group block">
                      <CardContent className="p-6 md:p-8">
                        <article>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-subtle">
                            <Badge variant="tag">{post.tag}</Badge>
                            <time dateTime={post.datePublished}>
                              {formatPostDate(post.datePublished)}
                            </time>
                            <span aria-hidden="true">·</span>
                            <span>{post.readingTime}</span>
                          </div>
                          <h2 className="mt-4 text-xl font-medium tracking-[-0.025em] text-foreground">
                            {post.title}
                          </h2>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {post.description}
                          </p>
                          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-primary-text">
                            Read post
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </article>
                      </CardContent>
                    </Link>
                  </Card>
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
