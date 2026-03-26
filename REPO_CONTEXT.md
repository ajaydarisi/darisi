# Darisi Repo Context

## Read This First

This file is the source of truth for high-level repo context in new chats. Read this first, then inspect only task-relevant files instead of re-exploring the whole repo.

## Repo Summary

- Single-page lead-generation portfolio for `darisi.in`
- Next.js App Router project with static export enabled in `next.config.ts`
- No backend, database, CMS, or API routes in this repo
- Homepage content is rendered by section components and shared site content in `src/lib/site-content.ts`

## Entrypoints And Render Tree

- `src/app/layout.tsx`
  - Owns root layout, `next/font/google` font setup, metadata, OpenGraph/Twitter tags, icons, manifest, and theme color
- `src/app/page.tsx`
  - Owns homepage composition and injects JSON-LD built from shared site content
- Actual render order in `src/app/page.tsx`
  - `Navbar -> Hero -> Work -> Trust -> Services -> Process -> About -> BestFit -> FAQ -> Contact -> Footer`

## Content Ownership

- Visible homepage content lives in `src/components/sections/`
  - `Hero.tsx`: lead-generation hero copy and primary CTAs
  - `Work.tsx`: mini case studies for featured projects
  - `Trust.tsx`: delivery commitments and trust-building proof
  - `Services.tsx`: proof-backed service focus
  - `Process.tsx`: delivery process steps
  - `About.tsx`: personal intro and values
  - `BestFit.tsx`: ideal engagement types and boundaries
  - `FAQ.tsx`: objection-handling questions and answers
  - `Contact.tsx`: contact CTA and Formspark-backed form
  - `Navbar.tsx` and `Footer.tsx`: navigation, links, brand, and social/contact links
- Shared content and provider config live in `src/lib/site-content.ts`
  - Owns portfolio entries, service/trust/fit copy, FAQ entries, contact copy, Formspark endpoint config, and JSON-LD builders
  - When updating public-facing work/FAQ/contact/trust copy, update this module so the UI and structured data stay aligned

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

- `src/components/sections/Contact.tsx`
  - Uses Formspark via `NEXT_PUBLIC_FORMSPARK_ENDPOINT`; when the env var is unset, the form is intentionally disabled and the email fallback is shown
- `src/app/layout.tsx`
  - Loads Plausible only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set
