# Darisi Repo Context

## Read This First

This file is the source of truth for high-level repo context in new chats. Read this first, then inspect only task-relevant files instead of re-exploring the whole repo.

## Repo Summary

- Single-page personal portfolio for `darisi.in`
- Next.js App Router project with static export enabled in `next.config.ts`
- No backend, database, CMS, or API routes in this repo
- Homepage content is rendered by section components and shared site content in `src/lib/site-content.ts`

## Entrypoints And Render Tree

- `src/app/blog/page.tsx` and `src/app/blog/<slug>/page.tsx`
  - Blog index and five posts; post metadata/JSON-LD come from the registry in `src/lib/blog.ts`, article shell is `src/components/blog/post-layout.tsx`, article typography is the `.blog-prose` block in `globals.css`
  - `PostLayout` owns the reading-progress bar, the brief card, the sticky contents/CTA sidebar, related notes, and the closing contact band
  - The contents list is derived on the server by `withHeadingIds` in `src/components/blog/post-toc.tsx`, which reads the post's own `h2`s and stamps their ids — no per-post heading metadata to maintain
  - Post bodies stay plain `p`/`h2`/`ul`/`ol`/`blockquote` markup; `.blog-prose` turns those into the warm treatments (accent-dot bullets, numbered decision cards for `ol`, a panel callout for `blockquote`, and an opt-in `ul.card-grid`)
  - To add a post: add its entry to `blogPosts` in `src/lib/blog.ts`, then create `src/app/blog/<slug>/page.tsx` using `PostLayout` (sitemap and index pick it up automatically)
- `src/app/layout.tsx`
  - Owns root layout, local Inter font setup, metadata, OpenGraph/Twitter tags, icons, manifest, and theme color
- `src/app/page.tsx`
  - Owns homepage composition and injects JSON-LD built from shared site content
- Actual render order in `src/app/page.tsx`
  - `Navbar -> Hero -> Work -> Story -> Notes -> Contact -> Footer`
  - Homepage section ids are `hey`, `work`, `story`, `notes`, `chat`; the navbar links to `/#<id>` so the same nav works from `/blog`
  - There is no standalone `/work` route — selected work only ever lives on the homepage's `#work` section (`Work.tsx`)

## Content Ownership

- Visible homepage content lives in `src/components/sections/`
  - `Hero.tsx`: personal intro copy, primary CTAs, proof pills, and the screenshot collage
  - `Work.tsx`: mini case studies for featured projects
  - `Story.tsx`: personal intro, values, and skill areas (replaced the former `About.tsx` + `Skills.tsx`)
  - `Notes.tsx`: recent blog posts, linking to `/blog/<slug>` and `/blog`
  - `Contact.tsx`: the `#chat` closing section — email CTA and prompt chips, no form
  - `Navbar.tsx` and `Footer.tsx`: navigation, links, brand, and social/contact links
- Shared content and provider config live in `src/lib/site-content.ts`
  - Owns project entries, skill areas, contact email, and JSON-LD builders
  - When updating public-facing work/skills/contact copy, update this module so the UI and structured data stay aligned

## Shared Primitives And Patterns

- `src/components/ui/brand-mark.tsx`
  - Owns the compact D mark and full wordmark placements without changing source assets or their colours
- `src/components/ui/AnimatedContent.tsx`
  - Shared GSAP + ScrollTrigger reveal wrapper used by every scroll-triggered section (Work, Story, Notes); site defaults for distance/duration/ease live here, not at call sites
- `src/components/ui/sheet.tsx`
  - Radix Dialog-based sheet; backs the mobile nav menu in `Navbar.tsx`
- `src/components/ui/theme-toggle.tsx`
  - Light/dark toggle button; theme state lives in `document.documentElement.dataset.theme` plus `localStorage`, read via `useSyncExternalStore`
- `src/components/ui/local-time.tsx`
  - Client-only Bengaluru wall clock used by the hero and the mobile menu
- `src/components/blog/post-toc.tsx`
  - `withHeadingIds` reads a post's own `h2`s server-side and stamps their ids; `PostToc` renders the resulting contents list — no per-post heading metadata to maintain
- `src/components/blog/reading-progress.tsx`
  - Fixed top-of-viewport scroll-progress bar for post pages
- No `button.tsx`/`card.tsx`/`select.tsx`/`evidence-ledger.tsx`/`section-heading.tsx`/`badge.tsx` — these were removed as dead code once the "Darisi Warm" redesign replaced every consumer; recreate deliberately if a future design needs them rather than assuming they still exist
- `src/components/sections/Hero.tsx`
  - Renders the full wordmark and primary portfolio introduction without client-only content gating
- `src/app/globals.css`
  - Tailwind v4 imports, semantic dark/light theme tokens, layout/type/motion scales, shared system patterns, reduced-motion handling, and select styling
  - `--page-gutter` is `clamp(1.25rem, 4vw, 3rem)`: `.site-shell`'s side inset scales continuously with viewport width (no breakpoint jump) up to a 48px cap, then centres within `--content-wide`.
  - Warm homepage surfaces live alongside the base roles: `--panel2`, `--fill`/`--on-fill`, `--feature`/`--on-feature`, `--nav-bg`, `--soft`, `--line`, `--wash1`/`--wash2`, `--shadow-soft`/`--shadow-up`, exposed as Tailwind colours (`bg-fill`, `text-soft`, `border-line`, …)
  - `rise`/`fadein`/`breathe`/`floaty`/`pulsedot` keyframes are applied through arbitrary `animate-[…]` utilities so per-element delays stay at the call site
- `src/lib/utils.ts`
  - `cn()` helper for class merging
- `src/lib/analytics.ts`
  - Plausible script config and custom event helper
- `DESIGN_SYSTEM.md`
  - The documented "Darisi Warm" design system, token roles, component contracts, palette approval, and QA checklist
- `USER_RESEARCH.md`
  - Content-led audience synthesis and a lean validation study for the portfolio

## Build And Deploy

- `npm run dev`
  - Starts the local dev server
- `npm run lint`
  - Runs ESLint
- `npm run build`
  - Builds the static export
- Static output is written to `out/`
- Static export config lives in `next.config.ts`
  - `output: "export"`
  - `images.unoptimized: true`

## Static Assets And SEO

- `public/`
  - Contains icons, manifest, logo, Open Graph image, sitemap, and robots file
- `src/app/layout.tsx`
  - Owns metadata and icon/manifest declarations
- `src/app/page.tsx`
  - Owns inline JSON-LD structured data

## Known Caveats

- `src/app/layout.tsx`
  - Loads Plausible only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set
