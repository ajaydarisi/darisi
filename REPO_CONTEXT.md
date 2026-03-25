# Darisi Repo Context

## Read This First

This file is the source of truth for high-level repo context in new chats. Read this first, then inspect only task-relevant files instead of re-exploring the whole repo.

## Repo Summary

- Single-page portfolio and freelance studio site for `darisi.in`
- Next.js App Router project with static export enabled in `next.config.ts`
- No backend, database, CMS, or API routes in this repo
- All site content is hardcoded in React components and SEO metadata/JSON-LD

## Entrypoints And Render Tree

- `src/app/layout.tsx`
  - Owns root layout, `next/font/google` font setup, metadata, OpenGraph/Twitter tags, icons, manifest, and theme color
- `src/app/page.tsx`
  - Owns homepage composition and inline JSON-LD
- Actual render order in `src/app/page.tsx`
  - `Navbar -> Hero -> About -> Services -> Process -> Work -> Stats -> FAQ -> Contact -> Footer`

## Content Ownership

- Visible homepage content lives in `src/components/sections/`
  - `Hero.tsx`: hero copy and primary CTAs
  - `About.tsx`: personal intro and values
  - `Services.tsx`: service offerings
  - `Process.tsx`: delivery process steps
  - `Work.tsx`: featured projects
  - `Stats.tsx`: metrics strip
  - `FAQ.tsx`: accordion questions and answers
  - `Contact.tsx`: contact CTA and Formspree-backed form
  - `Navbar.tsx` and `Footer.tsx`: navigation, links, brand, and social/contact links
- SEO and structured-data content is duplicated in `src/app/page.tsx`
  - `jsonLd` includes person, website, service, FAQ, and portfolio data
  - When updating public-facing copy for FAQ/work/about positioning, check whether `jsonLd` should be updated too

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
  - Uses Formspree, but the endpoint is still a placeholder: `https://formspree.io/f/YOUR_FORM_ID`
- `src/components/sections/Work.tsx`
  - References `/screenshots/bfg.png`, `/screenshots/devmarket.png`, and `/screenshots/textile.png`, but there is currently no `public/screenshots/` directory
- `npm run lint`
  - Currently passes with 4 `@next/next/no-img-element` warnings in `About.tsx`, `Footer.tsx`, `Navbar.tsx`, and `Work.tsx`
- `npm run build`
  - Currently succeeds, but Next.js warns that it inferred the workspace root from another lockfile outside this repo
- `README.md`
  - Still contains default create-next-app boilerplate and is not the source of truth for this project
