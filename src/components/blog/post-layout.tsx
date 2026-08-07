import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { EvidenceLedger } from "@/components/ui/evidence-ledger";
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
        <article className="pt-[9.5rem] pb-[5.3125rem]">
          <div className="site-shell">
            <div className="mx-auto max-w-[60rem]">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                All posts
              </Link>

              <header className="mt-8">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-accent" aria-hidden="true" />
                  <p className="font-utility text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-primary-text">
                    {post.tag}
                  </p>
                </div>
                <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.045em] text-foreground">
                  {post.title}
                </h1>
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-utility text-[0.625rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  <span>Ajay Darisi</span>
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
              </header>

              <EvidenceLedger
                className="mt-10"
                items={post.brief.map((item) => ({
                  label: item.label,
                  content: item.text,
                }))}
              />

              <div className="blog-prose mt-12">{children}</div>

              <div className="mt-16 border-t border-border-subtle pt-10">
                <h2 className="font-display text-2xl font-medium tracking-[-0.03em] text-foreground">
                  Have a question or an interesting problem?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Feel free to send a note. Email is the fastest way to reach
                  me.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    className="h-[2.875rem] rounded-none px-6 text-sm shadow-none hover:translate-y-0 hover:shadow-none"
                  >
                    <Link href="/#contact">
                      Get in Touch
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    or email {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
