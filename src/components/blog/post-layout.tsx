import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL } from "@/lib/site-content";
import {
  buildPostJsonLd,
  formatPostDate,
  type BlogPostMeta,
} from "@/lib/blog";

interface PostLayoutProps {
  post: BlogPostMeta;
  children: React.ReactNode;
}

export function PostLayout({ post, children }: PostLayoutProps) {
  const jsonLd = buildPostJsonLd(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <article className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              All posts
            </Link>

            <header className="mt-8">
              <Badge
                variant="default"
                className="text-[11px] uppercase tracking-[0.2em]"
              >
                {post.tag}
              </Badge>
              <h1 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl md:leading-[1.15]">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-subtle">
                <span className="text-muted">Ajay Darisi</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.datePublished}>
                  {formatPostDate(post.datePublished)}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
              </div>
            </header>

            <dl className="mt-10 space-y-4 rounded-2xl border border-border bg-surface p-6 text-sm md:p-8">
              {post.brief.map((item) => (
                <div key={item.label}>
                  <dt className="font-medium text-foreground">{item.label}</dt>
                  <dd className="mt-1 leading-relaxed text-muted">
                    {item.text}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="blog-prose mt-12">{children}</div>

            <aside
              aria-label="Get in touch"
              className="mt-16 rounded-2xl border border-border bg-surface p-6 md:p-8"
            >
              <h2 className="text-xl font-medium text-foreground">
                Have a question or an interesting problem?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Feel free to send a note. Email is the fastest way to reach
                me.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button asChild>
                  <Link href="/#contact">
                    Get in Touch
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
                >
                  or email {CONTACT_EMAIL}
                </a>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
