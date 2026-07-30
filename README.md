# Darisi

Personal portfolio website for Ajay Darisi at `darisi.in`.

This repo is a single-page Next.js App Router site exported as static files. It showcases selected work, skills, background, and contact details with no backend, database, CMS, or API routes.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript with strict mode
- Tailwind CSS v4
- shadcn/ui styling patterns and Radix primitives
- Lucide React icons

## Local Development

Install dependencies:

```bash
npm install
```

Run the main commands:

```bash
npm run dev
npm run lint
npm run build
```

Notes:

- `npm run dev` starts the local development server
- `npm run build` creates the static export in `out/`
- Static export is configured in `next.config.ts`

## Project Structure

```text
src/
  app/
    layout.tsx      Root layout, metadata, icons, manifest, OG/Twitter tags
    page.tsx        Homepage composition and JSON-LD structured data
    globals.css     Theme tokens, animations, patterns, shared global styles
  components/
    sections/       Homepage sections
    ui/             Shared UI primitives
  hooks/
    use-in-view.ts  IntersectionObserver hook for scroll reveals
  lib/
    utils.ts        cn() helper
public/
  Icons, logo, manifest, og-image, sitemap, robots
```

Homepage section order:

```text
Navbar -> Hero -> Work -> Skills -> About -> Contact -> Footer
```

## Content Ownership

- Most visible site content lives in `src/components/sections/`
- SEO and structured data live in `src/app/layout.tsx` and `src/app/page.tsx`
- `src/app/page.tsx` contains inline JSON-LD for person, website, and portfolio data
- `src/lib/site-content.ts` owns project entries, skill areas, contact email, and JSON-LD builders

If you update public-facing copy in the sections, also check whether the shared content and structured data should be updated to match.

## Shared Patterns

- `src/components/ui/button.tsx` provides the shared button variants
- `src/components/ui/animate-on-scroll.tsx` and `src/hooks/use-in-view.ts` power the scroll-based reveal animations
- `src/components/sections/Hero.tsx` uses its own mount animation instead of `AnimateOnScroll`
- `src/app/globals.css` defines the color system, patterns, keyframes, and reduced-motion handling
- `src/lib/analytics.ts` provides Plausible script config and event helpers

## Environment Variables

Copy `.env.example` to `.env` and set the values you need:

- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` enables Plausible pageviews and custom events
- `NEXT_PUBLIC_PLAUSIBLE_API_HOST` optionally points to a custom/self-hosted Plausible instance
