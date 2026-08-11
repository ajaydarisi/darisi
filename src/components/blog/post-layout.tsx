import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BrandMark } from "@/components/ui/brand-mark";
import { PostToc, withHeadingIds } from "@/components/blog/post-toc";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { CONTACT_EMAIL } from "@/lib/site-content";
import {
  blogPosts,
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
  const related = blogPosts.filter((entry) => entry.slug !== post.slug).slice(0, 3);
  const { headings, content } = withHeadingIds(children);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="overflow-x-clip">
        <article className="relative -mt-[4.625rem] pt-[clamp(7.375rem,12vw,9.375rem)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[20rem] left-1/2 h-[50rem] w-[87.5rem] animate-[breathe_13s_ease-in-out_infinite] bg-[radial-gradient(closest-side,var(--wash1),var(--wash2))] [translate:-50%]"
          />

          <header className="site-shell relative">
            <Link
              href="/blog"
              className="inline-flex h-[2.625rem] items-center gap-2.5 rounded-full bg-card pl-4 pr-5 text-sm font-semibold text-[var(--text-body)] shadow-[var(--shadow-soft)] transition-[transform,color] duration-200 hover:-translate-x-1 hover:text-foreground"
            >
              <ArrowLeft className="size-[1.0625rem]" aria-hidden="true" />
              All notes
            </Link>

            <div className="mt-7.5 flex flex-wrap items-center gap-3">
              <span className="inline-flex h-8 items-center rounded-full bg-card px-[0.9375rem] text-[0.8125rem] font-semibold text-[var(--text-body)]">
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

            <h1 className="mt-[1.375rem] max-w-[24ch] text-[clamp(2.5rem,6.2vw,5rem)] font-bold leading-[0.96] -tracking-[0.05em] text-foreground">
              {post.title}
            </h1>

            <p className="mt-6.5 max-w-[46rem] text-[clamp(1.1rem,1.9vw,1.45rem)] font-medium leading-[1.45] -tracking-[0.02em] text-[var(--text-body)]">
              {post.description}
            </p>

            <div className="mt-8.5 flex flex-wrap items-center gap-3.5">
              <span
                aria-hidden="true"
                className="brand-feature grid size-[2.875rem] shrink-0 place-items-center rounded-full bg-feature"
              >
                <BrandMark
                  variant="mark"
                  alt=""
                  className="h-[1.625rem] w-[1.904296875rem] text-feature-mark!"
                />
              </span>
              <span className="text-base font-semibold text-foreground">
                Ajay Darisi
              </span>
              <span className="text-[0.9375rem] text-soft">
                Software engineer, Bengaluru
              </span>
            </div>
          </header>

          <div className="site-shell mt-14 grid items-start gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,21.25rem)]">
            <div className="min-w-0">
              <div className="rounded-[2rem] bg-card px-[clamp(1.5rem,3vw,2.375rem)] py-[2.125rem] shadow-[var(--shadow-soft)]">
                <p className="hand mb-[1.375rem] text-[1.625rem] text-soft">
                  the brief, before the long version
                </p>
                {post.brief.map((item) => (
                  <div
                    key={item.label}
                    className="border-t-[1.5px] border-line py-5"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.09em] text-accent">
                      {item.label}
                    </p>
                    <p className="mt-2.5 text-base leading-[1.65] text-[var(--text-body)]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="blog-prose mt-12">{content}</div>
            </div>

            <aside className="lg:sticky lg:top-[6.875rem]">
              <PostToc headings={headings} />

              <div className="mt-5 rounded-[1.75rem] bg-feature p-7 text-on-feature shadow-[var(--shadow-soft)]">
                <p className="text-[1.1875rem] font-bold leading-[1.25] -tracking-[0.03em]">
                  Working through this decision right now?
                </p>
                <p className="mt-3 text-[0.9375rem] leading-[1.6] text-feature-body">
                  Tell me what you are weighing up and what constraints you are
                  under. That is usually enough to answer it in one reply.
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(post.title)}`}
                  className="mt-5 inline-flex h-12 items-center gap-2.5 rounded-full bg-[#DDA082] px-[1.375rem] text-[0.9375rem] font-bold text-[#0F2724] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Ask me
                  <ArrowRight className="size-[1.0625rem]" aria-hidden="true" />
                </a>
              </div>
            </aside>
          </div>

          <div className="site-shell mt-24">
            <p className="hand mb-3.5 rotate-[-2deg] text-[1.6875rem] leading-[1.2] text-soft">
              keep reading
            </p>
            <h2 className="text-[clamp(2rem,4.4vw,3.2rem)] font-bold leading-[1.04] -tracking-[0.045em] text-foreground">
              More notes
            </h2>
            <div className="mt-8.5 flex flex-col gap-3.5">
              {related.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/blog/${entry.slug}`}
                  className="flex flex-wrap items-center gap-6 rounded-3xl bg-card px-7.5 py-6 shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-standard)] hover:-translate-y-1 hover:shadow-[var(--shadow-up)]"
                >
                  <span className="shrink-0 rounded-full bg-background px-3.5 py-[0.4375rem] text-[0.8125rem] font-semibold text-[var(--text-body)]">
                    {entry.tag}
                  </span>
                  <span className="min-w-0 flex-[1_1_18.75rem] text-[clamp(1.05rem,1.6vw,1.3rem)] font-semibold -tracking-[0.025em] text-foreground">
                    {entry.title}
                  </span>
                  <span className="shrink-0 text-sm font-medium text-soft">
                    {entry.readingTime}
                  </span>
                  <ArrowRight
                    className="size-5 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="site-shell mt-18 flex flex-wrap items-center justify-between gap-8 rounded-[clamp(1.75rem,4vw,2.75rem)] bg-panel2 p-[clamp(2rem,5vw,4rem)]">
            <div className="max-w-[34rem]">
              <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.05] -tracking-[0.04em] text-foreground">
                Have a question or an interesting problem?
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-[1.7] text-[var(--text-body)]">
                Feel free to send a note. Email is the fastest way to reach me.
              </p>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex h-[3.875rem] items-center gap-3.5 rounded-full bg-fill px-8 text-[1.0625rem] font-semibold text-on-fill shadow-[var(--shadow-soft)] transition-[transform,box-shadow] duration-[var(--motion-base)] ease-[var(--ease-standard)] hover:-translate-y-[3px] hover:shadow-[var(--shadow-up)]"
            >
              Get in Touch
              <ArrowRight className="size-[1.1875rem]" aria-hidden="true" />
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
