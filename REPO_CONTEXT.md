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
  - To add a post: add its entry to `blogPosts` in `src/lib/blog.ts`, then create `src/app/blog/<slug>/page.tsx` using `PostLayout` (sitemap and index pick it up automatically)
- `src/app/layout.tsx`
  - Owns root layout, `next/font/google` font setup, metadata, OpenGraph/Twitter tags, icons, manifest, and theme color
- `src/app/page.tsx`
  - Owns homepage composition and injects JSON-LD built from shared site content
- Actual render order in `src/app/page.tsx`
  - `Navbar -> Hero -> Work -> Skills -> About -> Contact -> Footer`

## Content Ownership

- Visible homepage content lives in `src/components/sections/`
  - `Hero.tsx`: personal intro copy and primary CTAs
  - `Work.tsx`: mini case studies for featured projects
  - `Skills.tsx`: skill areas and tools
  - `About.tsx`: personal intro and values
  - `Contact.tsx`: contact heading plus email / GitHub / LinkedIn links, no form
  - `Navbar.tsx` and `Footer.tsx`: navigation, links, brand, and social/contact links
- Shared content and provider config live in `src/lib/site-content.ts`
  - Owns project entries, skill areas, contact email, and JSON-LD builders
  - When updating public-facing work/skills/contact copy, update this module so the UI and structured data stay aligned

## Shared Primitives And Patterns

- `src/components/ui/button.tsx`
  - Shared CVA-based button variants
- `src/components/ui/animate-on-scroll.tsx`
  - Shared reveal wrapper for scroll-triggered transitions
- `src/hooks/use-in-view.ts`
  - `IntersectionObserver` hook used by `AnimateOnScroll`
- `src/components/sections/Hero.tsx`
  - Uses its own mount animation instead of `AnimateOnScroll`
- `src/app/globals.css`
  - Tailwind v4 imports, theme tokens, custom background patterns, keyframes, reduced-motion handling, and select styling
- `src/lib/utils.ts`
  - `cn()` helper for class merging
- `src/lib/analytics.ts`
  - Plausible script config and custom event helper

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
