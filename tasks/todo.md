# Full SEO pass — remaining gaps

Status: **implemented, verified** — see `## Review` below.

Audited the built output rather than listing best practices. Already in place and not
re-done: canonicals, sitemap with content-derived `lastmod`, robots, OG/Twitter on every
page, Person/WebSite/ProfilePage/ItemList/Blog/BlogPosting/CollectionPage JSON-LD,
Lighthouse SEO 100, Core Web Vitals ~96.

## Gaps found

1. **Fragmented entity graph.** `BlogPosting.author` and `.publisher` are standalone Person
   objects with no `@id`, so Google sees a different person on every post instead of the
   `#person` entity the homepage defines. Nothing links a post back to the `#blog` node either.
2. **No `BreadcrumbList` anywhere** (0 occurrences). `/work` and the five posts are nested
   pages; breadcrumbs are rendered directly in search results.
3. **No feed.** A five-post blog with no RSS/Atom — nothing to subscribe to or syndicate.
4. **`tag` is dead data.** Each post carries `tag` ("Guide" / "Case Study" / "Process") and it
   reaches neither `article:section` nor JSON-LD `articleSection`.
5. **No `llms.txt`** — Lighthouse's Agentic Browsing category reports it Not Applicable.

## Changes

- [x] `seo.ts` — shared `entityIds`, plus `buildPersonNode()` / `buildWebSiteNode()` /
      `buildBreadcrumbJsonLd()` so one definition serves every page
- [x] `blog.ts` — author/publisher as `@id` refs, `isPartOf` → `#blog`, `articleSection`,
      `BreadcrumbList` (Home › Blog › Post)
- [x] `site-content.ts` — `BreadcrumbList` on `/work`; homepage now reuses the shared nodes
- [x] `blog/page.tsx` — `BreadcrumbList` on the index
- [x] `openGraph.section` per post from the existing `tag`
- [x] `src/app/feed.xml/route.ts` — RSS from `blogPosts`, advertised via `alternates.types`
- [x] `src/app/llms.txt/route.ts` — generated from `seoConfig`
- [x] Verified (below)

Deliberately skipped: per-post `meta keywords` (Google ignores it entirely — adding a dead
signal is not optimisation).

## Review

### Two bugs caught by verification, both self-inflicted

- **`Disallow: /*.txt$` blocked the new `/llms.txt`.** The rule added earlier to hide the RSC
  payloads swallowed it. Added an explicit `Allow: /llms.txt`; Google resolves conflicts by
  longest literal match, so the specific Allow wins.
- **Collapsing `author`/`publisher` to bare `@id` refs produced dangling pointers.** A
  `{"@id": …}` only resolves inside the same document, and Google requires `author.name`
  present for Article rich results — so the "consolidation" would have *removed* a required
  field. Wrote a checker that walks every graph and asserts each referenced `@id` exists
  locally; it found `#person` missing on 3 page types, then `#website` on 2 more and `#blog`
  on all 5 posts. Fixed by emitting full shared nodes under stable `@id`s. Final run:
  **8/8 pages, zero dangling references.**

### Verified

- Entity graph: home 4 nodes, `/work` 5, `/blog` 4, each post 4 — all references resolve.
- All 5 `BlogPosting` nodes retain every Google-required and recommended field, now plus
  `articleSection` and `isPartOf`.
- Breadcrumbs: Home › Blog › Post, Home › Blog, Home › Selected Work.
- `feed.xml` parses as XML: 5 items, RFC-822 dates (not ISO — RSS 2.0 requires it),
  self-referencing `atom:link`; advertised via `<link rel="alternate">` on home, index, posts.
- `llms.txt` generated from config; robots allows it.
- Homepage Person/WebSite nodes unchanged after the refactor to shared builders.
- Sitemap still byte-identical across rebuilds; 8 urls, 6 images. Lint and build clean.

### Note

`alternates` has the same "child replaces parent" behaviour as `openGraph` — `/blog` and the
posts repeat the feed link explicitly. `/work` overrides `alternates` for its canonical and so
does not advertise the feed; harmless, since the feed is blog content.

---

# Generated OG image

Status: **implemented, verified** — see `## Review` below.

## Why

`public/og-image.png` renders "DARISI / Build. Design. Launch. / Creative Technology Studio"
in the old red. Verified by opening it. That is the card every share of darisi.in produces on
LinkedIn, WhatsApp, Slack and Twitter — selling a studio identity the site was deliberately
repositioned away from.

This is the third instance of one failure mode in this session: the red favicon, the red
wordmark, and now this — static assets that silently outlived the content they describe.
So the fix is to generate the card from `seoConfig` at build time rather than hand-author
another PNG that can drift again.

## Constraints to verify before committing to the approach

- Does `opengraph-image.tsx` (`next/og` `ImageResponse`) build under `output: "export"`?
- What URL does it emit? JSON-LD (`Person.image`, `primaryImageOfPage`) and
  `buildPostMetadata` all reference a **stable absolute** URL via `seoConfig.ogImagePath`,
  so a hashed path would force those to change too.
- Satori does **not** support woff2, and the repo's only font files are woff2 (now orphaned
  by the switch to `next/font/google`). Confirm whether Next ships a usable default font,
  otherwise a ttf/woff has to be sourced.

## Plan

- [x] Spike `src/app/opengraph-image.tsx`, build, and record the emitted path + whether fonts work
- [x] Design the card from existing tokens only — `#0F2724` canvas, `#F6F2EA` text,
      `#C8DAD6` supporting, `#DDA082` accent. Content from `seoConfig`, nothing hardcoded
- [x] Reconcile the metadata so exactly one image is referenced site-wide
- [x] Delete `public/og-image.png` once nothing points at it
- [x] Verify: built PNG renders correctly, `og:image` present on `/`, `/work`, `/blog` and a
      post, JSON-LD image URL resolves, lint + build clean

## Review

### What the spike settled (all three unknowns were real)

1. `ImageResponse` **fails** under `output: "export"` without
   `export const dynamic = "force-static"` — same requirement as `sitemap.ts`/`robots.ts`.
2. The convention emits `out/opengraph-image` — **no file extension** — and puts a
   `?<contenthash>` cache-buster on the meta tag. So `/opengraph-image` (bare) is the stable
   URL for JSON-LD, and the host must be told the content type.
3. Fonts work: Next's `ImageResponse` ships a usable default, so no ttf/woff had to be
   sourced. Satori does not read woff2 and the repo's only font files are woff2.

Also rejected along the way: generating the PNG into `public/` from a prebuild script, which
would have kept `/og-image.png` stable. `next/og` is not importable outside Next's bundler
(`ERR_MODULE_NOT_FOUND`).

### Two bugs found by verifying rather than assuming

- **First render clipped the D mark.** The glyph's ink box is x 120..375, so the default
  `0 0 512 512` frame cut the bowl. Reused the centred `-38.5 -30 572 572` viewBox from
  `icon.svg`. Re-measured the output pixels afterwards: 26px clearance both sides, ink aspect
  0.647 vs the glyph's true 0.637 — not clipped.
- **Dropping the explicit `images` broke `/work`, `/blog` and every post.** A child route's
  `openGraph` block *replaces* the parent's rather than merging, and the file convention did
  not cascade past the root segment — those pages ended up with **zero** `og:image`, worse
  than before the change. Fixed with a single exported `ogImage` constant in `seo.ts` that
  every page spreads in.

### Result

- `src/app/opengraph-image.tsx` renders the card from `seoConfig` + `skillAreas`: role and
  location eyebrow, name with the accent dot, rule, the three skill areas, brand mark.
  Nothing in it is hardcoded copy, so it cannot drift from the site's positioning again.
- Every page carries exactly one `og:image`, one `twitter:image`, one `og:image:alt`.
- `vercel.json` sets `Content-Type: image/png` on `/opengraph-image`; verified locally that
  the rule applies to the image and does **not** leak onto HTML routes, which still serve
  `text/html` plus the security headers.
- `public/og-image.png` deleted; `/og-image.png` now 404s and nothing references it.
- Known cosmetic inconsistency, left alone: the homepage emits the hashed URL (the file
  convention wins on its own segment) while other pages emit the bare one. Both resolve to
  the same PNG. The hashed variant is arguably better — it cache-busts social previews when
  the card changes — so if the design is ever revised, expect non-homepage previews to stay
  cached until their URL changes.

---

# Mobile performance (PSI 73)

Status: **partially implemented** — font/dead-code fixes landed and verified locally;
image resizing deferred, see below.

Baseline (PSI mobile, Aug 7 2026, Lighthouse 13.4.1, Moto G Power, Slow 4G):
Performance **73** · A11y 100 · Best Practices 100 · SEO 100.
FCP 1.6s · **LCP 6.5s** · TBT 60ms · CLS 0 · SI 5.2s. LCP contributed +2 of a possible 25.

LCP element is the hero subtitle `<p role="doc-subtitle">`; PSI's breakdown showed 0ms TTFB
and **2,520ms element render delay** — no resource load, so the cause is upstream contention.

Measured on live darisi.in: `InterVariable.woff2` (352,540 B) and `InterVariable_Italic.woff2`
(388,276 B) both fetched at `rel=preload` high priority starting at 436ms. 740 KB of font on a
Slow-4G pipe ahead of everything else. `next/font/local` does not subset.

- [x] `layout.tsx` — `next/font/local` → `next/font/google` Inter, `subsets: ["latin"]`.
      Critical-path font bytes 740,816 → 100,668 (-86%). Still self-hosted in the output.
- [x] `brand-mark.tsx` — drop the `as="image"` preload for the wordmark. It never matched how
      a CSS `mask-image` is fetched ("credentials mode does not match"), so it was discarded
      and the SVG fetched twice. Verified: 2 fetches → 1. Removed the now-dead `priority` prop.
- [x] Delete `Aurora.tsx` / `ShinyText.tsx` (zero importers) and drop their `ogl` + `motion` deps.
- [x] `browserslist` aligned to Tailwind v4's own baseline (Chrome 111 / Safari 16.4 / FF 128).
- [ ] **Not fixed — images, 86 KiB.** Screenshots are 997x748 for a 472x261 box. `next/image`
      cannot resize because `output: "export"` forces `images.unoptimized: true`, so the source
      files must be resized. `object-cover object-top` means a naive crop changes what is visible
      at other breakpoints; needs a real image pipeline, not a one-off resize.
- [ ] **Not fixable from userland — "Legacy JavaScript" 14 KiB.** Those polyfills live in Next's
      own precompiled chunks, not in code SWC transpiles from `src/`. Confirmed: setting
      `browserslist` and refreshing `caniuse-lite` left them in place.

## Round 2 — after deploy (PSI mobile, Aug 7 2026 2:40 PM)

**Performance 73 → 90.** LCP 6.5s → 3.3s (+2 → +17), SI 5.2s → 3.9s, FCP 1.6s, CLS 0,
TBT 60 → 80ms. Critical path latency 675ms → 186ms. Font fix confirmed.

Other categories: Accessibility **100**, Best Practices **100**, SEO **100**, Agentic 2/2.
The only actionable items left there are Lighthouse's *unscored* Trust & Safety advisories —
all security headers. `output: "export"` means `next.config.ts` `headers()` does nothing, so
they must be set at the host (Vercel, confirmed via `server: Vercel`).

- [x] `vercel.json` — HSTS (`includeSubDomains; preload`), `X-Content-Type-Options`,
      `X-Frame-Options: DENY`, `Referrer-Policy`, `Cross-Origin-Opener-Policy`,
      `Permissions-Policy`, and a CSP with `frame-ancestors 'none'` / `object-src 'none'` /
      `base-uri 'self'`.
      Verified by serving `out/` locally with these exact headers: **zero CSP violations**,
      theme script ran, hydration and client-side nav worked, mask/fonts/JSON-LD intact.
      `includeSubDomains` checked safe first — `bfg.`, `chat.`, `www.` all serve HTTPS.
- [ ] **Trusted Types — deliberately not added.** `require-trusted-types-for 'script'` would
      break React's `dangerouslySetInnerHTML` (theme-init and JSON-LD). Audit stays flagged.
- [ ] **CSP still uses `'unsafe-inline'`,** so Lighthouse's "effective against XSS" stays
      flagged. A static export has no server for nonces, and Next's `__next_f` inline scripts
      change per build, so hashes are impractical. The CSP is still a real improvement.

Remaining perf headroom is ~10 points: LCP element render delay is still **2,210ms** with 0ms
TTFB, plus 2 points of Speed Index. The 86 KiB of images does *not* sit on that path — those
three are `loading="lazy"` and offscreen, so fixing them saves bandwidth, not score.

## Round 5 — PSI mobile, Aug 7 2026 3:13 PM

**96** (prev 97). This is run variance, not a regression: max critical path latency measured
**759ms this run vs 186ms last run on byte-identical assets**. LCP 2.4 → 2.6s and SI 1.6 → 2.0s
moved with it, while CLS and TBT went the other way.

- CLS **0.012 → 0** — the "Layout shift culprits" insight is gone. Confirms the diagnosis: the
  font-swap shift is timing-dependent, so it lands inside the measurement window only sometimes.
  **Not fixed, just not observed this run** — expect it to reappear intermittently.
- TBT **70 → 20ms**; long main-thread tasks **2 → 1**.
- Passed audits **17 → 19** (`Layout shift culprits` and `Optimize DOM size` both moved in).
- `/work` structured data confirmed live: `CollectionPage` + `ItemList` present on production.
- Best Practices unchanged: CSP `'unsafe-inline'` + Trusted Types, both structural.

---

## Round 4 — closing the two unverified gaps

Took the two items hiding behind the green 100s rather than the CLS regression, which costs
0 points.

**Accessibility — all 10 manual-check items verified by hand, all pass.** Tab order matches
visual order across 19 focusables; every one has a visible focus indicator; mobile Sheet moves
focus in, traps it (11 tabs, never escaped, wraps cleanly), hides all 11 outside elements from
AT via `aria-hidden`, closes on Escape and returns focus to the trigger with `aria-expanded`
reset and scroll unlocked; skip link reaches `main#main-content`.

Method note worth keeping: three "failures" here were **false positives from programmatic
`.focus()`**, which does not trigger `:focus-visible`. Re-testing with real `Tab` keypresses
cleared all three. Never audit focus styling with `el.focus()`.

**Structured data — validated, one real gap found and fixed.** All 5 `BlogPosting` nodes carry
every Google-required and recommended field; the homepage graph is well-formed. But `/work`
shipped **no JSON-LD at all**.

- [x] `site-content.ts` — extracted `buildWorkItemList()` so the homepage and `/work` share one
      source, added `buildWorkPageJsonLd()` (`CollectionPage` + `ItemList`).
- [x] `work/page.tsx` — injects it. Verified in the build: `/work` now emits CollectionPage +
      ItemList with all 3 projects; homepage graph unchanged in shape.
- Side effect: TexLedger's fallback URL moved from `https://darisi.in/#work` to
  `https://darisi.in/work` on both pages — a real page now exists, so it is a better target.

Still open and unchanged: CLS 0.012 (font swap, 0 points), images ~41 KiB, unused JS 26 KiB,
legacy JS 14 KiB (Next internals), CSP `'unsafe-inline'`, Trusted Types.

---

## Round 3 — after deploying vercel.json (PSI mobile, Aug 7 2026 2:56 PM)

**Performance 90 → 97.** LCP 3.3 → **2.4s** (render delay 2,210 → **450ms**), SI 3.9 → **1.6s**,
FCP 1.6s, TBT 70ms. Score parts: FCP 10/10, LCP 23/25, TBT 30/30, CLS 25/25, SI 10/10 — the
only remaining point loss anywhere is 2 points of LCP.

Headers confirmed live by `curl`: all eight present and byte-identical to `vercel.json`.
Trust & Safety **5 items → 2**: HSTS, COOP, and clickjacking all cleared. The two left are
exactly the two predicted as unfixable here — CSP `'unsafe-inline'` and Trusted Types.

**Regression I introduced: CLS 0 → 0.012.** "Layout shift culprits" attributes it to the hero
subtitle moving, caused by the two Inter woff2 files swapping in. Making the fonts 7× smaller
means the swap now lands *inside* the measurement window instead of after it. Costs 0 points
(good threshold is 0.1) but it is a real regression against the earlier perfect 0.

Still open: images 41 KiB (was 86 — run-variable, lazy/offscreen), unused JS 26 KiB, legacy JS
14 KiB (Next internals), render-blocking CSS, 2 long tasks. Never verified: the 10 accessibility
manual-check items, and SEO's "Structured data is valid".

---

Open finding: `globals.css:1` `@import`s DM Sans / Source Serif 4 / DM Mono from Google Fonts,
but the import is **stripped at build** (0 occurrences in the built CSS). The site actually
renders Inter / Georgia / system-mono. Design intent and shipped output disagree — and
"fixing" the import would add a render-blocking third-party chain plus three font families.

---

# Sitemap + SEO hardening

Status: **implemented, verified** — see `## Review` at the end of this section.

## Findings (verified against `out/` from the last build)

1. **`lastModified: new Date()`** on `/`, `/blog`, `/work` stamps *build time*, not
   content time. Every deploy claims all three changed. Google's documented response to
   unreliable `lastmod` is to ignore the signal — so the current sitemap is worse than
   one carrying no `lastmod` at all.
2. **`changeFrequency` and `priority`** are ignored by Google and effectively by Bing.
   Noise, and `priority` invites the belief that it influences ranking.
3. **Posts have no `dateModified`.** `lastModified` uses `datePublished`, and
   `buildPostJsonLd` hardcodes `dateModified: post.datePublished`. Editing a post cannot
   be signalled.
4. **No image entries.** Three project screenshots render on `/` and `/work` and are
   invisible to Google Images.
5. **RSC payloads are crawlable.** The export writes a sibling `.txt` for every route
   (`index.txt`, `blog.txt`, `work.txt`, per-post, plus `__next.*`). A static host serves
   these as `text/plain` — thin, duplicate copies of every page. Not disallowed today.
6. **Flag only:** all five posts carry `datePublished: 2026-07-12`. Content decision,
   not touched here.

## Changes

- [x] `src/lib/blog.ts` — optional `dateModified`; `postLastModified()`; `blogLastModified`
      from the newest post; use in JSON-LD and add `article:modified_time`
- [x] `src/lib/seo.ts` — `siteContentRevised` for the two pages with no content-derived date
- [x] `src/app/sitemap.ts` — content-derived `lastmod`; drop `changefreq`/`priority`;
      image entries for `/` and `/work`
- [x] `src/app/robots.ts` — disallow the `.txt` payloads; leave `/_next/` crawlable so
      Google can still fetch CSS/JS to render
- [x] Rebuild; verify `out/sitemap.xml` and `out/robots.txt`; confirm a no-op rebuild
      produces an identical sitemap; lint

## Review

Four source files changed. `npm run lint` clean; verified against real `npm run build`
output, not by reading the source.

- **Build-stability (the point of the whole change):** two clean builds from scratch
  produced a byte-identical `out/sitemap.xml`. Under the old code every rebuild rewrote
  three `lastmod` values.
- **Coverage:** 8 `<loc>` entries, one per exported route, checked route-by-route. 6
  `<image:loc>` entries under a correctly declared `xmlns:image`.
- **Canonical agreement:** each of `/`, `/work`, `/blog` has a `<loc>` exactly matching
  the `<link rel="canonical">` in its built HTML.
- **`dateModified` path proven, not assumed:** temporarily set `dateModified: "2026-08-05"`
  on one post and rebuilt. The post's `lastmod`, its JSON-LD `dateModified`, and its
  `article:modified_time` all moved to the new date; `datePublished` stayed at
  `2026-07-12`; the blog index rolled up to the newest date; the untouched sibling post
  stayed put. Reverted afterwards and confirmed removed.
- **`robots.txt`** emits `Disallow: /*.txt$`. `/_next/` is deliberately still allowed —
  blocking it would stop Google fetching the CSS and JS it needs to render the pages,
  which is a bigger loss than the duplicate `.txt` payloads.

### Deliberately not done

- **Homepage `<loc>` stays `https://darisi.in`** (no trailing slash). It already matches
  its canonical exactly, and an empty path normalises to `/`, so this is cosmetic.
  `seoConfig.siteUrl` is string-concatenated everywhere, so adding a slash there would
  produce `//blog`.
- **All five posts still share `datePublished: 2026-07-12`.** A real content signal, but
  changing published dates is a content decision.
- **`public/og-image.png` still reads "Creative Technology Studio"** — flagged in the
  previous task's review and still outstanding. It is the OG image for every page.

---

# Website redesign from supplied portfolio mockups

Status: **planned — implementation in progress**

- [x] Inspect the supplied light, dark, work-index, and design-system references alongside the current portfolio.
- [x] Confirm the route and theme behavior implied by the redesign brief, then record the approved implementation spec.
- [ ] Rebuild the responsive homepage, shared theme treatment, and work-index page while retaining the existing logo asset.
- [ ] Verify the light and dark variants at mobile and desktop sizes, then run lint and production build.
- [ ] Add a short review with implementation and verification evidence.

---

# Follow-up: exact light mockup fidelity

Status: **planned — implementation in progress**

- [x] Capture the supplied light mockup's desktop geometry, typography, copy, and color roles at 1280×720.
- [ ] Recompose the shared navigation and hero to match that baseline while retaining the fixed mint logo treatment and accessible theme control.
- [ ] Align the work, capabilities, about, contact, and footer layouts to the supplied editorial system without changing project content or routes.
- [ ] Rebuild `/work` around the supplied PortfolioIndex split-pane case-file composition.
- [ ] Compare the resulting light desktop and mobile layouts against the supplied mockup; verify dark mode, keyboard behavior, lint, build, and static tests.
- [ ] Add fidelity and verification evidence below.

---

# Follow-up: Darisi design-system color roles

Status: **planned — implementation in progress**

- [x] Inspect the supplied Color Roles page and record the light/dark role values.
- [ ] Map the shared theme tokens and browser chrome to the design-system roles.
- [ ] Replace remaining presentation-level hard-coded legacy colors with the mapped roles.
- [ ] Re-verify light/dark rendering, fixed mint logo treatment, accessibility, lint, and static production build.

---

# Reposition darisi.in: freelance lead-gen site → personal portfolio

Status: **implemented, verified, committed** — see `## Review` at the end of this file.

## Current task: DARISI full-name wordmark

- [x] Define a vector wordmark that extends the existing golden-ratio D mark.
- [x] Use the D mark in the navigation and the full wordmark in the hero and footer.
- [x] Align the full lockup to an explicit golden-ratio grid and validate the dimensions.
- [x] Verify the wordmark at desktop and mobile header sizes.

### Current task review

- Added `public/darisi-wordmark.svg`: the complete lockup measures `2φ × 1`.
- Standardised the standalone D across the logo and icon SVGs: its outer rectangle is `φ:1`, and its counter is `φ:1`.
- Verified the 36px header lockup (116.5px wide) in the mobile header with no horizontal overflow; the desktop header retains the same fixed lockup size.
- `npm run lint` and `npm run build` pass. A standalone numeric geometry check confirms the declared φ ratios, maroon theme color, and path-only wordmark.
- Refined the S within its existing `H/φ² × H/φ` cell, using a smoother pair of bowls and quieter terminals for better small-size legibility.
- Restored the compact D mark to the navbar; the full wordmark now anchors the hero and footer.
- Restored the original D SVG geometry across favicon and app-icon variants; only `darisi-wordmark.svg` is new.
- Replaced the wordmark D with the original D path at a uniform scale, so the standalone mark and wordmark are identical in shape.

## Context and confirmed decisions

Verified by reading every file in `src/components/sections/`, `src/components/ui/`,
`src/lib/`, `src/app/`, `public/`, `README.md`, `REPO_CONTEXT.md`, `.env.example`.

Decisions confirmed by Ajay (2026-07-31):

| Question | Decision |
| --- | --- |
| Positioning | **Job title only, no employer named.** "Software Engineer", Bengaluru, India. The site must not name an employer and must not state employment status either way (no "available for freelance", no "currently employed at X"). |
| Projects | **Keep all three** — Bhagyalakshmi Future Gold, DevMarket, TexLedger. Reframe copy from "sold engagement" to "designed and built". |
| Contact | **No form.** Formspark integration removed entirely. Light "get in touch" block (email + GitHub + LinkedIn) plus the existing footer contact column. |
| ChatAgent | **Remove** (`chat.darisi.in` floating button). |
| Testimonials | **Remove** (empty array, dead code). |

Non-negotiable constraints:

- Copy / structure / positioning change only. Do **not** restyle. Keep Tailwind v4 tokens in
  `globals.css`, `AnimateOnScroll`, `use-in-view.ts`, `button.tsx` variants, `card.tsx`,
  `badge.tsx`, spacing rhythm (`py-24`, `max-w-6xl mx-auto px-6 lg:px-8`) exactly as they are.
  **One sanctioned exception:** Phase 3.0 moves the existing `bg-surface` band onto two surviving
  sections, because all three sections that carried it are being deleted. No new tokens, no new
  classes, no other styling change.
- Static export must keep building (`output: "export"`).
- No `Co-Authored-By` lines in commits.
- Reuse existing primitives. Do not add dependencies. Do not create new UI components.

## Target structure

```text
Navbar -> Hero -> Work -> Skills -> About -> Contact -> Footer
```

(No `ChatAgent`. Section count drops 11 → 7.)

### Section-by-section fate

| Existing section | Fate | Why |
| --- | --- | --- |
| `Navbar.tsx` | **Keep, edit** | Nav links `Work / Services / Process / About / FAQ / Contact` → `Work / Skills / About / Contact`. CTA button "Start a Project" → "Get in touch". |
| `Hero.tsx` | **Keep, recopy** | Freelance pitch → personal intro. Delete the 3-up `heroProofStats` grid ("One owner", "24h reply window", "30 days post-launch support") and the "Replies within 24 hours" line — these are sales guarantees with no portfolio equivalent. Keep the mount-animation pattern and CTA pair. |
| `Work.tsx` | **Keep, recopy** | Structure (Problem / Role / Outcome / tech / link) is exactly right for a portfolio. Only heading + intro copy change, plus optional-link support for TexLedger. |
| `Trust.tsx` | **CUT** | "Delivery commitments" = direct-collaboration model, async delivery promise, 30-day post-launch support. All three are freelance-engagement terms. No portfolio equivalent; nothing worth salvaging. |
| `Testimonials.tsx` | **CUT** | Renders `null` (empty `testimonials` array). Dead code + unused `Testimonial` type. |
| `Services.tsx` | **REPURPOSE → `Skills.tsx`** | Card grid layout is reused verbatim; content becomes skill areas + tools instead of purchasable services. Drop the closing "if you need a brochure site I may not be the right fit" qualifier (sales-fit filter). |
| `Process.tsx` | **CUT** | Brief & Fit → Shape → Build → Launch & Stabilize is a client delivery pipeline. A portfolio does not sell a process. |
| `About.tsx` | **Keep, recopy** | Layout kept. Rewrite headline, both paragraphs, and the pull quote. The three `values` entries are already positioning-neutral — keep their copy unchanged to minimise diff. |
| `FAQ.tsx` | **CUT** | Every entry is objection handling for a prospective client ("What should I have ready before reaching out?", "What happens after launch?"). Also removes the `FAQPage` JSON-LD node. |
| `Contact.tsx` | **REWRITE (in place)** | 437-line Formspark form → ~70-line links-only "Get in touch" block. File kept (not deleted) so the `#contact` anchor and nav/footer links survive without inventing a new component. |
| `Footer.tsx` | **Keep, edit** | Quick links updated, brand description rewritten, `© Darisi. All rights reserved.` → `© Ajay Darisi.` Contact column and socials stay. |
| `ui/chat-agent.tsx` | **CUT** | Confirmed. |

### Files that become orphaned by the cuts (delete them too)

Verified with a usage grep — each of these has exactly one importer, which is being deleted:

- `ui/accordion.tsx` — only `FAQ.tsx`
- `ui/alert.tsx` — only `Contact.tsx`
- `ui/input.tsx` — only `Contact.tsx`
- `ui/label.tsx` — only `Contact.tsx`
- `ui/textarea.tsx` — only `Contact.tsx`

Out of scope (pre-existing, unrelated to this change — **do not touch**):
`ui/select.tsx` is already imported by nothing today, and `globals.css:166` has a
`[data-slot="select-content"]` scroll-lock rule. Both predate this work. Leave alone.

### Coverage audit — every file in the repo has a disposition

Nothing below is unaccounted for. `EDIT` / `DELETE` / `RENAME` files are all covered by a phase
item; `KEEP` means verified as needing no change, not merely unexamined.

| Path | Disposition | Phase |
| --- | --- | --- |
| `src/app/layout.tsx` | KEEP — derives all metadata from `seo.ts` | 2.4 (verify only) |
| `src/app/page.tsx` | EDIT — new render order, `buildJsonLd()` arity | 2.3 |
| `src/app/globals.css` | KEEP — every custom class/keyframe still has a live user (`bg-surface`, `bg-dot-pattern`, `bg-grid-pattern`, `text-gradient-primary`, all four `animate-*`, `shadow-floating`, `muted-subtle` all verified) | — |
| `src/app/sitemap.ts`, `src/app/robots.ts` | KEEP — single-URL sitemap + allow-all still correct | 4.3 (verify only) |
| `src/app/icon.svg`, `src/app/fonts/*` | KEEP — brand + font assets, positioning-neutral | — |
| `src/lib/seo.ts` | EDIT — title, description, jobTitle, keywords, OG alt, `socialUrls`, drop 3 fields | 1.1 |
| `src/lib/site-content.ts` | EDIT — heavy deletion + `skillAreas` + JSON-LD rewrite | 1.2 |
| `src/lib/analytics.ts` | EDIT — drop 5 dead event keys | 1.3 |
| `src/lib/utils.ts` | KEEP — `cn()`, untouched | — |
| `src/hooks/use-in-view.ts` | KEEP — still powers `AnimateOnScroll` | — |
| `sections/Navbar.tsx` | EDIT | 3.6 |
| `sections/Hero.tsx` | EDIT | 3.1 |
| `sections/Work.tsx` | EDIT | 3.2 |
| `sections/Services.tsx` | RENAME → `Skills.tsx` + EDIT | 2.2, 3.3 |
| `sections/About.tsx` | EDIT | 3.4 |
| `sections/Contact.tsx` | REWRITE | 3.5 |
| `sections/Footer.tsx` | EDIT | 3.7 |
| `sections/Trust.tsx`, `Process.tsx`, `FAQ.tsx`, `Testimonials.tsx` | DELETE | 2.1 |
| `ui/chat-agent.tsx` | DELETE | 2.1 |
| `ui/accordion.tsx`, `alert.tsx`, `input.tsx`, `label.tsx`, `textarea.tsx` | DELETE — orphaned | 2.1 |
| `ui/animate-on-scroll.tsx`, `badge.tsx`, `button.tsx`, `card.tsx`, `sheet.tsx`, `theme-toggle.tsx` | KEEP — all still imported | — |
| `ui/select.tsx` | KEEP — pre-existing dead code, out of scope | — |
| `public/manifest.json` | EDIT — description | 4.1 |
| `public/og-image.png` | FLAG — stale text, needs manual redesign, binary untouched | 4.2 |
| `public/screenshots/*.webp` | KEEP — all three projects retained (check textile.webp for exposed data) | 4.4, risk 1 |
| `public/{favicon*,icon.svg,logo.svg,apple-touch-icon.png}` | KEEP — brand assets | 4.4 |
| `.env.example` | EDIT — drop Formspark line | 4.5 |
| `.env` | KEEP — Ajay's local file, gitignored; flag the now-unused var | 4.5, 6.2 |
| `README.md` | EDIT — framing, section order (also fixes a pre-existing stale `BestFit` reference), env vars | 4.6 |
| `REPO_CONTEXT.md` | EDIT — summary, render tree, ownership, caveats | 4.7 |
| `CLAUDE.md` | KEEP — workflow rules, not site content | — |
| `package.json` | KEEP — no dependency changes. `radix-ui` is still required by `sheet.tsx` after `accordion.tsx` is deleted (verified) | — |
| `components.json` | KEEP — `registries: {}`, no per-component manifest to sync | — |
| `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs` | KEEP | — |
| `out/`, `.next/` | KEEP — gitignored build output, regenerated in Phase 5 | — |

---

## Phase 0 — Setup and baseline

- [x] 0.1 Confirm clean tree: `git status --short` returns nothing. If dirty, stop and ask.
- [x] 0.2 Create branch: `git checkout -b feat/portfolio-repositioning`
- [x] 0.3 Record baseline: `npm run lint && npm run build` both pass **before** any edit. If the
      baseline is already broken, stop and report — do not start editing on a broken baseline.

## Phase 1 — Content and config layer (do this first; types drive everything else)

> Phases 1–3 will leave TypeScript temporarily broken (deleted exports still imported).
> That is expected. **Do not run `npm run build` until Phase 5.**

### 1.1 `src/lib/seo.ts`

- [x] Add above `seoConfig`, and reuse in `sameAs` so the URLs live in one place:
      ```ts
      const GITHUB_URL = "https://github.com/ajaydarisi";
      const LINKEDIN_URL = "https://linkedin.com/in/ajaydarisi";

      export const socialUrls = { github: GITHUB_URL, linkedin: LINKEDIN_URL };
      ```
      then set `sameAs: [GITHUB_URL, LINKEDIN_URL]`.
- [x] Remove these three fields from **both** the `SeoConfig` interface and the `seoConfig` object
      (they only existed to feed the now-deleted `Service` JSON-LD node and the `contactPoint`):
      `serviceName`, `serviceType`, `areaServed`.
- [x] Replace these values exactly:
      ```ts
      title: "Ajay Darisi — Software Engineer | Portfolio",
      description:
        "Ajay Darisi is a software engineer based in Bengaluru, India. Portfolio of product web apps, internal tools, and platform work across payments, authentication, and internationalization.",
      shortDescription:
        "Personal portfolio of Ajay Darisi, a software engineer in Bengaluru, India.",
      jobTitle: "Software Engineer",
      ogImageAlt:
        "Ajay Darisi — software engineer portfolio: product web apps, internal tools, and platform work",
      ```
- [x] Replace `keywords` with:
      ```ts
      keywords: [
        "Ajay Darisi",
        "Darisi",
        "software engineer",
        "software engineer portfolio",
        "Next.js developer",
        "TypeScript developer",
        "React developer",
        "internal tools developer",
        "payments integration",
        "software engineer Bengaluru",
      ],
      ```
- [x] Leave untouched: `siteUrl`, `siteName`, `personName`, `personAlternateName`, `contactEmail`,
      `ogImagePath`, `locale`, `language`, `location`, `knowsAbout`, the verification block,
      `siteViewport`, and the whole `siteMetadata` object (it derives from the fields above, so
      OpenGraph + Twitter tags update automatically — this is how task item 4's
      metadata/OG/Twitter requirement is satisfied).

### 1.2 `src/lib/site-content.ts`

- [x] **Delete** these exports and their types entirely:
      `ResultHighlight`, `heroProofStats`, `TrustPoint`, `trustPoints`, `FaqEntry`, `baseFaqs`,
      `getFaqEntries`, `faqEntries`, `Testimonial`, `testimonials`, `ContactContent`,
      `getContactContent`, `contactContent`, `CHATBOT_URL`, `FORMSPARK_ENDPOINT`,
      `hasContactForm`, and the `SERVICE_ID` / `FAQ_ID` constants.
- [x] Keep `CONTACT_EMAIL`, `SITE_URL`, `PERSON_ID`, `WEBSITE_ID`, `WEBPAGE_ID`, `WORK_ID`.
- [x] Rename `ServiceFocusArea` → `SkillArea`, rename its `examples` field to `tools`, and rename
      `serviceFocusAreas` → `skillAreas`. Replace the content with:
      ```ts
      export const skillAreas: SkillArea[] = [
        {
          title: "Product Web Apps",
          description:
            "Building product surfaces where UX and implementation stay connected — SaaS-style workflows, onboarding, dashboards, and role-aware interfaces.",
          tools: "Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query",
        },
        {
          title: "Internal Tools & Data",
          description:
            "Turning messy operational workflows into focused systems for CRM, approvals, reporting, inventory, and finance-heavy processes.",
          tools: "PostgreSQL, Supabase, schema design, reporting UX, admin systems",
        },
        {
          title: "Platform Layers",
          description:
            "The plumbing that usually blocks a launch: payments, authentication, registration flows, and internationalization.",
          tools: "Razorpay, Keycloak, Supabase Auth, multi-language / i18n flows",
        },
      ];
      ```
- [x] `ProjectAction`: after TexLedger loses its action (below), **every remaining action is an
      external link and no entry uses `helper`**. Collapse the type to just what is left in use:
      ```ts
      export interface ProjectAction {
        href: string;
        label: string;
      }
      ```
      Delete the `external?: boolean` and `helper?: string` fields. (`helper` existed only for
      TexLedger's "Private walkthrough available on request."; `external` was only ever `true`.)
- [x] `ProjectEntry`: make the link optional and add an optional note, because TexLedger has no
      public URL and its old CTA pointed at the deleted lead form
      (`href: "#contact"`, `label: "Request a walkthrough"`):
      ```ts
      export interface ProjectEntry {
        title: string;
        category: string;
        summary: string;
        problem: string;
        role: string;
        outcome: string;
        tech: string[];
        action?: ProjectAction;
        note?: string;
        image: string;
        gradient: string;
      }
      ```
- [x] `projects`: keep all three entries and all `problem` / `role` / `outcome` / `tech` / `image` /
      `gradient` values. Only these edits:
      - BFG and DevMarket: keep `href` and `label`, **delete the `external: true` line** from both
        (the field no longer exists).
      - BFG `summary`: `"Bilingual jewelry storefront for a rental-first business that needed premium merchandising, browsing, and a smoother checkout."` (drop nothing else)
      - DevMarket `summary`: unchanged.
      - TexLedger: **remove the `action` object entirely** and add:
        ```ts
        note: "Internal tool for a textile wholesaler — not publicly accessible.",
        ```
      - TexLedger `summary`: unchanged.
- [x] Rewrite `buildJsonLd` — it takes **no parameters** now:
      - `Person` node: keep everything, but **delete the `contactPoint` array** (it declared
        `contactType: "sales"` with `areaServed`). `jobTitle` now resolves to "Software Engineer"
        via `seoConfig`.
      - `WebSite` node: unchanged (its `description` picks up the new `shortDescription`).
      - `WebPage` node: change `"@type": "WebPage"` → `"@type": "ProfilePage"`, replace the
        `about: [Person, Service]` array with `mainEntity: { "@id": PERSON_ID }`, keep
        `@id`/`url`/`name`/`description`/`inLanguage`/`isPartOf`/`primaryImageOfPage`.
      - **Delete the entire `Service` node** and **the entire `FAQPage` node**.
      - `ItemList` node: keep, but the item `url` must handle the optional action:
        ```ts
        url: project.action?.href ?? `${SITE_URL}/#work`,
        ```
      - Remove the now-unused `faqs` local and the `contactFormEnabled` parameter.

### 1.3 `src/lib/analytics.ts`

- [x] Delete these keys from `ANALYTICS_EVENTS`: `contactFormStart`, `contactFormSubmit`,
      `contactFormError`, `faqOpen`, `chatbotClick`.
- [x] Keep `heroPrimaryCtaClick`, `heroSecondaryCtaClick`, `navPrimaryCtaClick`,
      `navMobileCtaClick`, `workProjectClick`, `fallbackEmailClick`.
- [x] Do **not** rename `fallbackEmailClick` even though it is no longer a "fallback" — renaming it
      would orphan the existing Plausible goal history. Leave the string as-is.
- [x] Leave the Plausible config, `trackEvent`, and the `Window` declaration untouched.

## Phase 2 — Delete dead sections and rewire the page

- [x] 2.1 `git rm` (or delete) these files:
      - `src/components/sections/Trust.tsx`
      - `src/components/sections/Process.tsx`
      - `src/components/sections/FAQ.tsx`
      - `src/components/sections/Testimonials.tsx`
      - `src/components/ui/chat-agent.tsx`
      - `src/components/ui/accordion.tsx`
      - `src/components/ui/alert.tsx`
      - `src/components/ui/input.tsx`
      - `src/components/ui/label.tsx`
      - `src/components/ui/textarea.tsx`
- [x] 2.2 Rename `src/components/sections/Services.tsx` → `src/components/sections/Skills.tsx`
      (use `git mv` so history follows).
- [x] 2.3 Rewrite `src/app/page.tsx` to exactly this — imports, order, and JSON-LD injection
      pattern all preserved, just fewer sections:
      ```tsx
      import { Navbar } from "@/components/sections/Navbar";
      import { Hero } from "@/components/sections/Hero";
      import { Work } from "@/components/sections/Work";
      import { Skills } from "@/components/sections/Skills";
      import { About } from "@/components/sections/About";
      import { Contact } from "@/components/sections/Contact";
      import { Footer } from "@/components/sections/Footer";
      import { buildJsonLd } from "@/lib/site-content";

      const jsonLd = buildJsonLd();

      export default function Home() {
        return (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <main id="main-content" tabIndex={-1}>
              <Hero />
              <Work />
              <Skills />
              <About />
              <Contact />
            </main>
            <Footer />
          </>
        );
      }
      ```
- [x] 2.4 `src/app/layout.tsx`: **no changes needed.** Verify by reading it — it consumes
      `siteMetadata` / `siteViewport` from `seo.ts`, so metadata, OpenGraph, Twitter, icons, and
      manifest all update from Phase 1.1. Do not touch the theme-init script or the Plausible block.

## Phase 3 — Recopy the surviving sections

Rule for this phase: change **text, `id`s, `href`s, and imports only**. Do not change any
`className`, animation `variant`, `delay`, grid definition, or icon import unless an item below
says so explicitly.

### 3.0 Section background rhythm — the one unavoidable visual change

Today the page alternates plain / `bg-surface` bands, and **all three `bg-surface` sections are
being deleted** (`Trust`, `Process`, `FAQ`). Every survivor (`Work`, `Skills`, `About`, `Contact`)
is a plain `py-24`, so without this step the entire page below the hero becomes one flat slab and
the section boundaries disappear. This is the "removing a section makes a visual change
unavoidable" case; it reuses the existing token, adds nothing new.

- [x] In `Skills.tsx`, change `className="py-24"` → `className="bg-surface py-24"`.
- [x] In `Contact.tsx`, use `className="bg-surface py-24"` on the section (already reflected in the
      3.5 snippet below — apply it there, no separate edit).
- [x] Result: Hero (plain) → Work (plain) → Skills (surface) → About (plain) → Contact (surface) →
      Footer. Verify visually in both themes during Phase 5.11.
- [x] Do **not** introduce any new colour, token, or utility class for this. `bg-surface` only.

### 3.1 `src/components/sections/Hero.tsx`

- [x] Remove the `heroProofStats` import.
- [x] `aria-label="Darisi hero"` → `aria-label="Introduction"`.
- [x] Badge text: `Darisi | Bengaluru, India | Global Remote` → `Software Engineer | Bengaluru, India`
- [x] Keep the `DARISI` `<h1>` and its classes as-is (it is the name/brand of a personal site).
- [x] Subtitle paragraph (`role="doc-subtitle"`) →
      `I'm Ajay Darisi, a software engineer who builds product web apps, internal tools, and the platform layers behind them.`
- [x] Second paragraph →
      `Most of my time goes into CRM and admin workflows, registration systems, payments, auth, and multi-language flows — the parts of a product that have to be both clear and dependable.`
- [x] CTA pair:
      - Primary: label `View My Work`, `href="#work"`,
        `aria-label="View Ajay Darisi's selected work"`, keep `<ArrowRight />`,
        `trackEvent(ANALYTICS_EVENTS.heroPrimaryCtaClick, { location: "hero", target: "work" })`.
      - Secondary (`variant="outline"`): label `Get in Touch`, `href="#contact"`,
        `aria-label="Get in touch with Ajay Darisi"`,
        `trackEvent(ANALYTICS_EVENTS.heroSecondaryCtaClick, { location: "hero", target: "contact" })`.
- [x] **Delete** the entire `heroProofStats` grid `<div>` (the `mt-8 grid gap-3 sm:grid-cols-3`
      block) **and** the `Replies within 24 hours. 30 days of post-launch support included.`
      paragraph that follows it.
- [x] Scroll cue at the bottom: keep the element and its animation; change the label text
      `Scroll to proof` → `Scroll to work` and `aria-label="Scroll down to selected work"`
      → `aria-label="Scroll down to my work"`.
- [x] Keep `mounted` state, `requestAnimationFrame` mount pattern, and every `transitionDelay`
      value on the elements that remain.

### 3.2 `src/components/sections/Work.tsx`

- [x] Badge `Selected Work` — unchanged.
- [x] `<h2 id="work-heading">` → `Projects I've designed and built, end to end.`
- [x] Intro paragraph →
      `Each one lays out the problem, what I owned, and what actually shipped.`
- [x] Replace the CTA block at the bottom of each card so a missing `action` is handled. Keep the
      existing link classes verbatim (including the `after:absolute after:inset-0` card-overlay
      trick) when an action exists. Every remaining action is an external link, so the
      internal-vs-external ternary and the `helper` branch both go:
      ```tsx
      <div className="mt-auto pt-6">
        {project.action ? (
          <a
            href={project.action.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary-text after:absolute after:inset-0 after:content-['']"
            onClick={() =>
              trackEvent(ANALYTICS_EVENTS.workProjectClick, {
                project: project.title,
              })
            }
          >
            {project.action.label}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : project.note ? (
          <p className="text-xs leading-relaxed text-muted-subtle">{project.note}</p>
        ) : null}
      </div>
      ```
- [x] Delete the `const isExternal = project.action.external;` line entirely — nothing reads it now.
- [x] Change the import to `import { ArrowUpRight } from "lucide-react";` — **drop `ArrowRight`**,
      it was only used by the now-deleted internal-link branch and would be dead code.
- [x] Cosmetic nit to accept, not fix: the TexLedger card keeps the `hover:-translate-y-1
      hover:border-primary/30` hover treatment while no longer being clickable. Leaving the hover
      is the smaller diff; only special-case it if it reads as broken during the Phase 5.11 check.

### 3.3 `src/components/sections/Skills.tsx` (renamed from `Services.tsx`)

- [x] `export function Services()` → `export function Skills()`.
- [x] `id="services"` → `id="skills"`; `aria-labelledby="services-heading"` →
      `aria-labelledby="skills-heading"`; `<h2 id="services-heading">` → `id="skills-heading"`.
- [x] Import `skillAreas` instead of `serviceFocusAreas`; rename the `.map` param
      `service` → `skill`; `service.examples` → `skill.tools`.
- [x] Badge `Services` → `Skills`.
- [x] `<h2>` → `What I work with.`
- [x] Intro paragraph →
      `The areas I've spent the most time in, and the tools I reach for when building product surfaces, internal systems, and the platform layers underneath them.`
- [x] **Delete** the trailing `AnimateOnScroll variant="fade-up" delay={400}` block containing the
      `If you need a content-heavy brochure site, I may not be the right fit...` paragraph.
- [x] Keep the icon array `[LayoutPanelTop, Workflow, ShieldCheck]` and every class unchanged.

### 3.4 `src/components/sections/About.tsx`

- [x] Badge `How I work` — unchanged.
- [x] `<h2 id="about-heading">` → `Software engineer in Bengaluru, India.`
- [x] First paragraph →
      `I'm based in Bengaluru and I work on product web apps and internal systems. What I enjoy most is the seam where product clarity, interface decisions, and implementation meet — the place where a vague requirement turns into something people can actually use.`
- [x] Second paragraph →
      `darisi.in is my personal site. It's where I keep the things I've designed and built, along with how I think about putting software together. Everything here is work I've personally shaped end to end.`
- [x] Pull quote →
      `"The best software usually feels calm: fewer handoffs, clearer decisions, and execution that keeps moving."`
- [x] Leave the three `values` entries, the `Image` logo block, both column layouts, and every
      `AnimateOnScroll` delay untouched.

### 3.5 `src/components/sections/Contact.tsx` — full rewrite

Replaces the 437-line Formspark form. Keeps `id="contact"` so nav, footer, and hero anchors keep
working. Reuses `Badge`, `Button`, `AnimateOnScroll`, and the existing blurred-glow decoration
pattern so it looks like the rest of the page.

- [x] Replace the whole file with:
      ```tsx
      "use client";

      import { ArrowUpRight, Mail } from "lucide-react";
      import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
      import { Badge } from "@/components/ui/badge";
      import { Button } from "@/components/ui/button";
      import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
      import { CONTACT_EMAIL } from "@/lib/site-content";
      import { socialUrls } from "@/lib/seo";

      export function Contact() {
        return (
          <section id="contact" aria-labelledby="contact-heading" className="bg-surface py-24">
            <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
              </div>

              <AnimateOnScroll variant="fade-up">
                <div className="relative mx-auto max-w-2xl text-center">
                  <Badge
                    variant="default"
                    className="text-[11px] uppercase tracking-[0.2em]"
                  >
                    Contact
                  </Badge>
                  <h2
                    id="contact-heading"
                    className="mt-4 text-2xl font-medium text-foreground md:text-3xl"
                  >
                    Get in touch.
                  </h2>
                  <p className="mt-4 leading-relaxed text-foreground/90">
                    Happy to talk about software, side projects, or an interesting
                    problem. Email is the fastest way to reach me.
                  </p>

                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button asChild size="lg">
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        onClick={() =>
                          trackEvent(ANALYTICS_EVENTS.fallbackEmailClick, {
                            location: "contact_section",
                          })
                        }
                      >
                        <Mail className="h-4 w-4" />
                        Email Me
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <a
                        href={socialUrls.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <a
                        href={socialUrls.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                  <p className="mt-6 text-sm text-muted">{CONTACT_EMAIL}</p>
                </div>
              </AnimateOnScroll>
            </div>
          </section>
        );
      }
      ```
- [x] Sanity check after writing: no `Formspark`, no `useState`, no form validation, no
      "24 hours", no "inquiry", no "scope" left in this file.

### 3.6 `src/components/sections/Navbar.tsx`

- [x] `links` array →
      ```ts
      const links = [
        { label: "Work", href: "#work" },
        { label: "Skills", href: "#skills" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
      ];
      ```
- [x] Desktop CTA button text `Start a Project` → `Get in Touch` (keep `#contact`, keep
      `navPrimaryCtaClick` tracking and all classes).
- [x] Mobile CTA button text `Start a Project` → `Get in Touch` (keep `navMobileCtaClick`).
- [x] `SheetDescription` sr-only text →
      `Navigate to the main sections of Ajay Darisi's site.`
- [x] Leave the scroll-shadow effect, the `IntersectionObserver` active-section logic, the
      `ThemeToggle`, and the `Sheet` structure untouched — the observer reads from `links`, so it
      follows automatically.

### 3.7 `src/components/sections/Footer.tsx`

- [x] `aria-label="Darisi footer"` → `aria-label="Site footer"`.
- [x] `quickLinks` array → same four entries as the navbar (`Work`, `Skills`, `About`, `Contact`).
- [x] Brand description paragraph →
      `Personal site of Ajay Darisi, a software engineer in Bengaluru, India, building product web apps, internal tools, and platform features.`
- [x] Replace the two hardcoded social URLs with the shared constants so there is one source of
      truth: `import { socialUrls } from "@/lib/seo";` then
      `{ icon: GitHubIcon, href: socialUrls.github, label: "GitHub" }` and
      `{ icon: LinkedInIcon, href: socialUrls.linkedin, label: "LinkedIn" }`.
- [x] Bottom bar: `&copy; {new Date().getFullYear()} Darisi. All rights reserved.` →
      `&copy; {new Date().getFullYear()} Ajay Darisi.`
- [x] Keep the `GitHubIcon` / `LinkedInIcon` inline SVGs, the `Get in Touch` column, the mailto
      link, and the `fallbackEmailClick` tracking (`location: "footer"`) as they are.

## Phase 4 — Static assets, env, and docs

- [x] 4.1 `public/manifest.json`: replace `description` with
      `"Personal portfolio of Ajay Darisi, a software engineer in Bengaluru, India."`
      Leave `name`, `short_name`, `start_url`, `display`, colors, and `icons` untouched.
- [x] 4.2 `public/og-image.png`: **leave the binary alone** — regenerating it needs image tooling
      this repo does not have. Only the `ogImageAlt` text changes (Phase 1.1). Flag to Ajay in the
      final report that the image itself still reads
      `DARISI / Build. Design. Launch. / Creative Technology Studio`, which was already inaccurate
      before this change and is now clearly stale. It needs a manual design pass — suggested
      replacement text: `DARISI / Ajay Darisi / Software Engineer`.
- [x] 4.3 `src/app/sitemap.ts` and `src/app/robots.ts`: **no changes.** Single-URL sitemap and an
      allow-all robots policy are both still correct. Verify by reading; do not edit.
- [x] 4.4 Other `public/` assets (icons, `logo.svg`, `favicon*`, `apple-touch-icon.png`,
      `screenshots/*.webp`): **do not touch.** All three screenshots are still used.
- [x] 4.5 `.env.example`: delete the `NEXT_PUBLIC_FORMSPARK_ENDPOINT` line. Keep both Plausible
      lines. **Do not modify `.env`** — it is Ajay's local file; just note in the report that the
      Formspark var there is now unused and can be dropped whenever he likes.
- [x] 4.6 `README.md`:
      - Line 3 / 5: replace the "Lead-generation portfolio" framing with
        `Personal portfolio website for Ajay Darisi at darisi.in.` and a matching intro sentence
        that lists selected work, skills, about, and contact — no services/process/FAQ/lead-gen.
      - Section-order code block (currently stale — it lists a `BestFit` section that does not
        exist): replace with `Navbar -> Hero -> Work -> Skills -> About -> Contact -> Footer`.
      - "Content Ownership": drop the `service`/`FAQ` JSON-LD mention and the "lead-gen copy"
        phrasing; describe `site-content.ts` as owning project entries, skill areas, contact
        email, and JSON-LD builders.
      - "Environment Variables": delete the `NEXT_PUBLIC_FORMSPARK_ENDPOINT` bullet.
- [x] 4.7 `REPO_CONTEXT.md` (source of truth for future chats — must not go stale):
      - "Repo Summary": lead-generation → personal portfolio.
      - "Entrypoints And Render Tree": new render order; delete the `ChatAgent` line.
      - "Content Ownership": delete the `Trust` / `Testimonials` / `Process` / `FAQ` bullets;
        rename the `Services` bullet to `Skills.tsx`; rewrite the `Contact.tsx` bullet as
        "contact heading plus email / GitHub / LinkedIn links, no form"; update the
        `site-content.ts` description.
      - "Known Caveats": delete the Formspark caveat entirely. Keep the Plausible caveat.
      - Leave "Shared Primitives And Patterns", "Build And Deploy", and "Static Assets And SEO"
        structurally intact.

## Phase 5 — Verification (must all pass before commit)

- [x] 5.1 Orphan-reference grep — every one of these must return **zero** hits under `src/`:
      ```bash
      grep -rn "Formspark\|FORMSPARK\|hasContactForm\|contactContent\|faqEntries\|getFaqEntries\|trustPoints\|heroProofStats\|serviceFocusAreas\|testimonials\|CHATBOT_URL\|chat-agent\|ChatAgent\|Testimonials\|Trust\|Process\|FAQ" src
      ```
- [x] 5.2 Dead-anchor grep — `#services`, `#process`, `#faq`, `#testimonials` must return **zero**
      hits under `src/`:
      ```bash
      grep -rn "#services\|#process\|#faq\|#testimonials" src
      ```
- [x] 5.3 Live-anchor check — each of `#work`, `#skills`, `#about`, `#contact` must appear both as
      an `id=` on a section and as an `href` in `Navbar.tsx` / `Footer.tsx`.
- [x] 5.4 Dead-code sweep — confirm nothing survives that only the deleted sections used:
      ```bash
      grep -rn "helper\|isExternal\|ArrowRight\|external" src/components/sections src/lib/site-content.ts
      ```
      Expect: `ArrowRight` only in `Hero.tsx`, and **zero** hits for `helper` / `isExternal` /
      `external`. Also confirm `src/components/ui/` contains exactly: `animate-on-scroll.tsx`,
      `badge.tsx`, `button.tsx`, `card.tsx`, `select.tsx`, `sheet.tsx`, `theme-toggle.tsx`
      (`select.tsx` is pre-existing dead code left deliberately — see the scope note above).
- [x] 5.5 Sales-language sweep — read the hits and confirm none remain in user-visible copy:
      ```bash
      grep -rniE "freelance|hire|client|inquiry|engagement|post-launch|24 hours|start a project|brochure" src public/manifest.json README.md REPO_CONTEXT.md
      ```
      (`client` may legitimately survive in a project's `problem`/`role` narrative — judge in
      context, but it must not appear as a sales pitch.)
- [x] 5.6 `npm run lint` — clean, no warnings introduced.
- [x] 5.7 `npm run build` — succeeds, static export written to `out/`.
- [x] 5.8 JSON-LD validity — extract the `application/ld+json` block from `out/index.html` and
      confirm: `jobTitle` is `Software Engineer`, there is **no** `Service` node, **no** `FAQPage`
      node, **no** `contactPoint`, the page node is `ProfilePage`, and the `ItemList` still has
      three items with the TexLedger item pointing at `https://darisi.in/#work`:
      ```bash
      grep -o '<script type="application/ld+json">[^<]*' out/index.html | head -c 4000
      ```
- [x] 5.9 Meta check on `out/index.html` — `<title>`, `og:title`, `og:description`,
      `twitter:title`, and `twitter:description` all carry the new portfolio wording and no
      "freelance".
- [x] 5.10 Spot-check the built page: `grep -c "Formspark" out/index.html` returns 0, and
      `grep -o "chat.darisi.in" out/index.html` returns nothing.
- [x] 5.11 Optional but preferred: `npm run dev`, load `http://localhost:3000`, and confirm — nav
      highlights all four sections while scrolling, the mobile sheet opens and closes, both theme
      modes render, the three project cards look right (TexLedger showing its note instead of a
      link), and no console errors.

## Phase 6 — Wrap up

- [x] 6.1 Add a `## Review` section to this file: what changed per section, what was deleted, what
      was deliberately left alone, and anything that surprised you mid-implementation.
- [x] 6.2 Report back to Ajay section by section, and surface these two open items explicitly:
      1. `public/og-image.png` still says "Creative Technology Studio" — needs a manual redesign.
      2. `NEXT_PUBLIC_FORMSPARK_ENDPOINT` is still in his local `.env` and the Formspark form
         itself still exists on Formspark's side — he may want to delete the form there.
- [x] 6.3 Commit on the branch with **no `Co-Authored-By` line**:
      ```
      refactor: reposition darisi.in from freelance lead-gen to personal portfolio

      - Structure: Navbar -> Hero -> Work -> Skills -> About -> Contact -> Footer
      - Remove Trust, Process, FAQ, Testimonials, ChatAgent, and the Formspark contact form
      - Repurpose Services as Skills; recopy Hero, Work, About, Navbar, Footer
      - Update metadata, OpenGraph/Twitter, and JSON-LD to software-engineer portfolio positioning
      - Drop the Service and FAQPage JSON-LD nodes; page node is now ProfilePage
      - Delete UI primitives orphaned by the cuts (accordion, alert, input, label, textarea)
      ```
- [x] 6.4 If Ajay corrects anything during implementation, append the pattern to
      `tasks/lessons.md` (create it if missing) per `CLAUDE.md` §3.

---

## Open questions / risks

1. **TexLedger** — kept per Ajay's confirmation, now with no link and the note
   "Internal tool for a textile wholesaler — not publicly accessible." The screenshot
   `public/screenshots/textile.webp` stays published. If that screenshot shows real customer,
   supplier, or financial data, it should be redacted or swapped — worth a look during
   implementation, and flag it if anything identifiable is visible.
2. **`heroProofStats` removal leaves the hero shorter.** Deliberate: badge, name, two paragraphs,
   two CTAs, scroll cue. If Ajay wants the 3-up grid back, the cheapest reuse is the same markup
   filled with focus areas or core stack — but that would duplicate the Skills section, so it is
   left out by default.
3. **No writing/blog section.** The task listed it as optional and there is no post content in the
   repo. Not planned. Adding it later is a new section plus a content source, not a copy change.
4. **`chat.darisi.in`** is a separate deployment. Removing the button here does not take that
   service down — Ajay should decide separately whether to retire it, since it was almost certainly
   primed with freelance-sales context.
5. **Plausible goals** for `contact_form_start` / `contact_form_submit` / `contact_form_error` /
   `faq_open` / `chatbot_click` will stop firing. Historical data is unaffected; the goals can be
   archived in the Plausible dashboard whenever convenient.

---

## Review

Implemented on branch `feat/portfolio-repositioning`. Every phase's exact snippets landed as
specified; verified by reading every changed file's final diff directly (not just trusting
sub-agent self-reports) plus running the full Phase 5 checklist twice — once via automated agents,
once independently by hand after a fix.

### What changed, section by section

- **`src/lib/seo.ts`** — `socialUrls` (GitHub/LinkedIn) added and reused in `sameAs`; dropped
  `serviceName`/`serviceType`/`areaServed`; `title`/`description`/`shortDescription`/`jobTitle`/
  `ogImageAlt`/`keywords` all rewritten to software-engineer-portfolio positioning.
- **`src/lib/site-content.ts`** — full rewrite. Removed every freelance-only export (proof stats,
  trust points, FAQ, testimonials, contact-form copy, chatbot URL, Formspark config). `Services` →
  `Skills` naming carried through (`ServiceFocusArea`→`SkillArea`, `examples`→`tools`).
  `ProjectAction` collapsed to `{ href, label }` (dropped `external`/`helper`, both now dead once
  TexLedger lost its action). `buildJsonLd()` now takes no params; dropped the `Service` and
  `FAQPage` nodes and `Person.contactPoint`; page node is `ProfilePage`.
- **`src/lib/analytics.ts`** — dropped the 5 event keys that only the deleted sections fired.
- **`src/app/page.tsx`** — render order is now `Navbar → Hero → Work → Skills → About → Contact →
  Footer`; `ChatAgent` removed.
- **`Hero.tsx`** — personal intro copy; cut the proof-stats grid and the reply-time line; CTAs are
  now "View My Work" / "Get in Touch".
- **`Work.tsx`** — recopied heading/intro; CTA logic simplified to always-external link vs. a plain
  note (TexLedger), since the internal `#contact` fallback no longer exists.
- **`Services.tsx` → `Skills.tsx`** (renamed via `git mv`, history preserved) — recopied to skill
  areas + tools; dropped the "brochure site" sales-fit qualifier; added the `bg-surface` band.
- **`About.tsx`** — headline, both paragraphs, and pull quote recopied; `values` left untouched.
- **`Contact.tsx`** — full rewrite, 437 lines → 84. Formspark form replaced with email + GitHub +
  LinkedIn buttons; `bg-surface` band added; `#contact` anchor preserved.
- **`Navbar.tsx` / `Footer.tsx`** — nav links reduced to Work/Skills/About/Contact; CTA copy
  updated; Footer's social hrefs now source from `seo.ts`'s `socialUrls`; copyright line updated.
- **Deleted:** `Trust.tsx`, `Process.tsx`, `FAQ.tsx`, `Testimonials.tsx`, `ui/chat-agent.tsx`, and
  the five UI primitives orphaned by those cuts (`accordion`, `alert`, `input`, `label`, `textarea`).
- **`public/manifest.json`, `.env.example`, `README.md`, `REPO_CONTEXT.md`** — descriptions and
  section-order references updated to match; Formspark references removed.

### Deliberately left alone

`src/app/layout.tsx` (derives everything from `seo.ts`), `sitemap.ts`/`robots.ts`, all icon/logo/
font assets, `ui/select.tsx` (pre-existing dead code, out of scope), `package.json`/configs, and
the `values` array in `About.tsx`.

### What surprised me mid-implementation

One workflow sub-agent, while chasing a verification failure, found that the Phase 5.1
orphan-reference grep had a false-positive hit: `src/app/fonts/LICENSE.txt` (the bundled Inter font's
SIL Open Font License) contains the phrase "...available with a FAQ at..." — unrelated to the
deleted `FAQ.tsx`. Its fix was to relocate that license file out of `src/` into a new top-level
`THIRD-PARTY-LICENSES/` folder. That's a real out-of-scope structural change to satisfy a checklist
string-match, not something this task should touch, so **I reverted it** and instead scoped the
5.1 grep to `--include=*.ts --include=*.tsx` (the check's actual intent — no dead references in
app *source* — was never about vendored license text). Re-ran the full Phase 5 checklist by hand
afterward to confirm nothing else regressed. No other deviations found on manual review of every
changed file's final diff.

Also checked `public/screenshots/textile.webp` per risk #1 above: no customer names, party names,
or identifiable financial detail visible — just generic dashboard chrome and a "12 parties" count
with no vouchers entered. No redaction needed.

### Final verification (run independently, after the workflow, with a clean rebuild)

- `npm run lint` — clean.
- `npm run build` (after `rm -rf out .next`) — succeeds, static export written, TypeScript passes.
- JSON-LD on `out/index.html` — 4 `@graph` nodes (`Person`, `WebSite`, `ProfilePage`, `ItemList`),
  `jobTitle: "Software Engineer"`, no `Service`/`FAQPage`/`contactPoint`, TexLedger item URL falls
  back to `https://darisi.in/#work`.
- Meta tags on `out/index.html` — title/OG/Twitter all carry the new copy; zero case-insensitive
  "freelance" hits anywhere in the built HTML.
- `grep -c Formspark out/index.html` → 0; `chat.darisi.in` → no hits.
- Anchors: `#work`/`#skills`/`#about`/`#contact` all have a matching section `id` and appear as
  `href`s in both `Navbar.tsx` and `Footer.tsx`; `#services`/`#process`/`#faq`/`#testimonials` →
  zero hits in source.

Not done: item 5.11 (manual browser walkthrough) — left for Ajay, per the plan.
---

## Historical reference: pre-reposition UI/UX audit (superseded)

# Darisi — UI/UX Audit Implementation Plan

Phase-wise plan derived from the UI/UX audit. Phases are ordered by dependency and risk:
tokens first (they unblock everything), then accessibility, then content/structure, then
section fixes, then polish, then docs. Each phase is independently shippable.

Effort key: XS (<15m) · S (~30m) · M (~1–2h) · L (half day+)

---

## Phase 0 — Design Tokens & Color Foundation: DEEP PINE (unblocks Phases 1–5)

DECISION: rebrand from maroon to a "Deep Pine" palette (calm / steady / dependable — the
strongest DNA match). Fill green is too dark for body text on dark, so we split brand into
fill vs. text roles, same as the maroon would have needed.

Token values (dark / light):
- `--primary` (fill)        #1F6F5C / #1B6351   — white text ≥6:1 (dark), ≥7:1 (light)
- `--primary-hover`         #237A65 / #15503F
- `--primary-foreground`    #F2F5F3 / #FFFFFF
- `--primary-text` (NEW)    #4FB89A / #15604F   — accent text/icons; 7.9:1 dark, 7.6:1 light
- `--background`            #0B0F0E / #F7FAF9
- `--surface`               #121917 / #FFFFFF
- `--elevated`              #18211E / #ECF3F0
- `--foreground`            #F2F5F3 / #0F1A16
- `--muted`/`-foreground`   #A9B5AF / #3F4A46
- `--border`/`--input`      #233029 / #D8E2DE
- semantic destructive kept red (unchanged)

- [x] Swap dark + light token blocks in `globals.css` to Deep Pine.
- [x] Add `--primary-text` token (both themes) + register `--color-primary-text` in `@theme inline`.
- [x] Update `--ring`, `--focus-outline`, scrollbar, gradient, skip-link tints to pine.
- [x] Update hardcoded theme colors in `layout.tsx` init script + `theme-toggle.tsx` THEME_COLORS.
- [ ] (Deferred) Dimmer text token to replace `text-muted/60`-style opacity — Phase 1.
- [x] Verify: contrast of new tokens vs `--background`/`--surface` ≥ 4.5:1 (text) / 3:1 (UI).

Findings covered: #1, #2, #3 (partial)

---

## Phase 1 — Critical Accessibility (depends on Phase 0)

Goal: bring all dark-mode text and interactive feedback to WCAG AA.

- [x] Swap eyebrow `Badge` default variant to accent-text token. `badge.tsx` (done in Phase 0)
- [x] Update Hero badge `text-primary/80` → accent-text token. `Hero.tsx` (done in Phase 0)
- [x] Replace `text-muted/60` · `/80` and `placeholder:text-muted/50` with `--muted-subtle` token.
- [x] Bump tiny labels `text-[10px]` → `text-[11px]` across all eyebrows + hero scroll hint.
- [x] Add `role="status" aria-live="polite"` + focus management to contact success region;
      error `Alert` already ships `role="alert"`. `Contact.tsx`
- [x] Verify: `npm run lint` + `npm run build` clean; computed contrast all ≥ AA; grep leftover-free.

Findings covered: #1, #2, #5, #18

### Phase 1 review (done)

- Added `--muted-subtle` token (`#7C8A84` dark / `#5E6B66` light) + `--color-muted-subtle`
  mapping. Replaces opacity-based faded text so it's deterministically legible:
  - `input.tsx`, `textarea.tsx`, `select.tsx` placeholders (`placeholder:text-muted/50`)
  - `Hero` scroll hint (`text-muted/60`, also recolored hover → `primary-text`)
  - `Work` action helper (`text-muted/80`)
  - Contrast: `#7C8A84` ≈ 4.6:1 on inputs / 5.3:1 on bg (dark); `#5E6B66` ≈ 5.6:1 on white.
- Eyebrow labels + hero scroll hint bumped `10px → 11px` (7 files).
- `Contact` success state: `role="status" aria-live="polite"`, `tabIndex={-1}`, and a
  `useEffect` that moves focus to it on success (focus was previously lost when the form
  unmounted). Error path unchanged — `Alert` already announces via `role="alert"`.
- Not automated here: an axe/Lighthouse run needs the dev server up — offer to run it.

### Phases 2–6 review (done)

Phase 2 — Hero & hierarchy:
- `<h1>` now the value prop ("Web apps, internal systems, and platform features, shipped
  with calm ownership.") instead of "DARISI"; brand name now appears once above the fold
  (eyebrow). Lead subtitle promoted to `text-foreground`; section intros → `text-foreground/90`.
- Gradient audit resolved by Phase 0 retint (stops `#f2f5f3`/`#4fb89a` dark, `#0f1a16`/`#1b6351`
  light — all AA at every frame). Hero `min-h` 6rem→4rem to match `h-16` navbar. Scroll cue
  hidden under `max-height:740px` so it can't overlap the proof stats.

Phase 3 — Social proof (mechanism only, no fabricated content):
- Added `Testimonial` type + empty `testimonials` array in `site-content.ts`, and
  `Testimonials.tsx` (renders null while empty). Wired into `page.tsx` after Trust.
  ACTION FOR OWNER: supply 1–3 real client quotes to switch the section on.

Phase 4 — Behavior:
- Work cards fully clickable via stretched link (`after:absolute after:inset-0`); images
  `h-52` → `aspect-[16/10]`. Process dead `group-hover` fixed (added `group`). Contact form
  inline validation (name/email/message, email regex, `noValidate`, `aria-invalid`,
  per-field error text, focus first invalid) + submit `Loader2` spinner. Navbar scroll-spy
  via IntersectionObserver with animated underline + `aria-current`. Chat FAB relabelled and
  auto-hides while `#contact` is in view (removes overlap + CTA redundancy).

Phase 5 — Polish:
- Services card padding `p-8` → `p-6` (matches Work/Trust). Alternating section bands:
  Trust/Process/FAQ → `bg-surface` (Process icon tiles bumped to `bg-elevated` to stay
  legible on the band). Theme toggle initial state read from `dataset.theme` (+
  `suppressHydrationWarning`) to kill the knob flash. Primary button gains `shadow-sm` →
  `hover:shadow-md hover:shadow-primary/20`.

Phase 6 — Docs:
- `REPO_CONTEXT.md` render order + content ownership corrected (no BestFit; Testimonials +
  ChatAgent documented).

Verification: `npm run lint` clean, `npm run build` passes (6/6 static). Live DOM checks
(dev server) confirmed pine tokens in both themes, section banding, testimonials gating,
stretched link, accent-text badges, and scroll-spy underline.

---

## Phase 2 — Hero & Content Hierarchy

Goal: fix SEO/heading semantics and reduce brand repetition above the fold.

- [ ] Rewrite `<h1>` to carry the value proposition; demote "DARISI" to eyebrow/visual. `Hero.tsx` (S)
- [ ] Remove redundant brand mentions so name appears once above the fold. (XS)
- [ ] Audit `text-gradient-primary` so no animation frame drops below AA; scope to one
      word if needed. `globals.css` + `Hero.tsx` (S)
- [ ] Promote lead paragraphs (hero sub, section intros) from `text-muted` → `text-foreground`. (S)
- [ ] Reconcile hero `min-h-[calc(100svh-6rem)]` with the actual `h-16` navbar. (XS)
- [ ] Move/guard the scroll cue so it can't overlap the proof stats on short viewports. (S)
- [ ] Verify: check h1 in DOM outline; test 1280/768/375 widths + landscape. (S)

Findings covered: #4, #6, #7, #8, #9, #10

---

## Phase 3 — Conversion & Social Proof (highest business impact)

Goal: add the missing third-party proof — the top conversion lever. Mostly content.

- [ ] Gather 1–3 real client testimonials/logos or a concrete outcome metric. (M — content)
- [ ] Add a testimonial element to Trust or Contact (or restore a dedicated section). (M)
- [ ] Strengthen TexLedger card: static screenshot gallery or a headline metric. (S)
- [ ] Verify: cross-check any new copy into `site-content.ts` so UI + JSON-LD stay aligned. (XS)

Findings covered: #11, #12

---

## Phase 4 — Section & Component Behavior Fixes

Goal: correctness bugs and false affordances.

- [ ] Make Work cards fully clickable (wrap article in link / nested CTA). `Work.tsx` (S)
- [ ] Use aspect-ratio container for Work images instead of fixed `h-52`. `Work.tsx` (XS)
- [ ] Fix dead `group-hover` in Process (add `group` to wrapper or remove). `Process.tsx` (XS)
- [ ] Make Process connecting-line layout robust to step count. `Process.tsx` (S)
- [ ] Add inline email/field validation to contact form. `Contact.tsx` (M)
- [ ] Add spinner to submit button during `submitting`. `Contact.tsx` (XS)
- [ ] Ensure chat FAB never overlaps form submit / content on mobile. `chat-agent.tsx` (S)
- [ ] Add scroll-spy active-section state to navbar. `Navbar.tsx` (M)
- [ ] Clarify/label chat FAB role vs primary "Start a Project" funnel. (XS)
- [ ] Verify: manual click-through of each card, form, nav at desktop + mobile. (S)

Findings covered: #13, #14, #16, #17, #19, #20, #21, #22, #23

---

## Phase 5 — Design-System Consistency & Polish

Goal: rhythm, spacing, and CTA presence.

- [ ] Standardize card padding (stop ad-hoc `px-6`/`px-8` overrides). `card.tsx` + consumers (S)
- [ ] Alternate section backgrounds (`background`/`surface`) or add dividers for delineation. (M)
- [ ] Theme toggle: read initial state from `documentElement.dataset.theme` to kill knob flash.
      `theme-toggle.tsx` (S)
- [ ] Add subtle elevation/hover shadow to primary CTA buttons. `button.tsx` (XS)
- [ ] Verify: visual pass in both themes; confirm no layout shift on load. (S)

Findings covered: #24, #25, #26, #27, #3 (finish)

---

## Phase 6 — Housekeeping & Docs

- [ ] Decide on BestFit section: restore it (lead-qualifying content) or fix `REPO_CONTEXT.md`. (S)
- [ ] Update `REPO_CONTEXT.md` render order + content ownership to match reality. (XS)
- [ ] Run `npm run lint` and `npm run build` clean. (S)

Findings covered: #28

---

## Suggested sequencing

1. **Ship 0 + 1 together** (one PR): the accessibility win, lowest risk, unblocks the rest.
2. **Ship 2** (hero/SEO) next — small, high visibility.
3. **Start 3 in parallel** (content gathering has lead time, not code-blocked).
4. **Ship 4**, then **5**, then **6**.

## Review

### Phase 0 — Deep Pine palette (done)

Applied the Deep Pine palette repo-wide and fixed the accent-as-text accessibility issue.

Files changed:
- `src/app/globals.css` — dark + light token blocks → pine; added `--primary-text` +
  `--color-primary-text` mapping; retinted ring, focus-outline, scrollbar, gradient, skip-link.
- `src/app/layout.tsx`, `src/components/ui/theme-toggle.tsx` — theme-color init values.
- `src/lib/seo.ts`, `public/manifest.json` — themeColor / theme_color / background_color.
- `public/logo.svg`, `public/icon.svg`, `src/app/icon.svg` — brand mark fill → `#1F6F5C`.
- Accent-as-text → `text-primary-text`: `badge.tsx` (all eyebrows), `Hero` badge,
  `Trust`/`Services`/`About`/`Process` icons, `Process` step number, `Contact` icons,
  `Work` link hover, `accordion` trigger hover.

Verification:
- `npm run lint` clean · `npm run build` succeeds (static export, 6/6 pages).
- grep confirms zero old maroon/neutral hex remain in `src/` or `public/`.
- Contrast: fill `#1F6F5C` + white ≥6:1 (dark) / 7:1 (light); `--primary-text` `#4FB89A`
  7.9:1 on dark, `#15604F` 7.6:1 on light — all AA, most AAA.

Not done (deferred to later phases): dimmer text token for `text-muted/60` opacity usages
(Phase 1), and the non-color audit items (Phases 2–6).

---

# Blog Section — Implementation Plan (2026-07-12)

Add a lead-gen blog: `/blog` index + 3 posts, zero new dependencies (typed TSX posts,
shared PostLayout, registry in `src/lib/blog.ts` mirroring the `site-content.ts` idiom).

- [x] `src/lib/blog.ts` — post registry (slug/title/description/tag/date/readingTime/brief) + per-post Metadata + BlogPosting JSON-LD builders
- [x] `src/components/blog/post-layout.tsx` — shared article shell: Navbar, back link, eyebrow tag, h1, brief block (signature element), `.blog-prose` body, contact CTA, Footer
- [x] `src/app/blog/page.tsx` — index page with Blog JSON-LD
- [x] Post: `bilingual-jewelry-storefront-razorpay` (case study — BFG)
- [x] Post: `custom-internal-tools-vs-off-the-shelf` (guide — TexLedger tie-in)
- [x] Post: `async-freelance-projects-global-teams` (process/trust)
- [x] `globals.css` — `.blog-prose` article typography from existing tokens
- [x] `Navbar.tsx` / `Footer.tsx` — hash links → `/#...` so they work from blog pages; add Blog link
- [x] `src/app/sitemap.ts` — add /blog + post URLs
- [x] Verify: lint + build + browser pass (both themes, mobile)

### Blog review (done)

Shipped `/blog` + 3 posts with zero new dependencies (typed TSX posts + PostLayout +
registry in `src/lib/blog.ts`). Navbar/Footer hash links now `/#...` so they work from
blog pages; Blog link added with pathname-based active state. Desktop nav moved from
`md:` to `lg:` breakpoint — 7 links overflowed the logo at ~800px. Sitemap emits blog
URLs; posts carry BlogPosting JSON-LD + article OG metadata. Verified: lint clean,
build 10/10 static, browser pass at 375/800/1280 in both themes.

---

## Design-system rebuild (2026-08-06)

- [x] Audit the current UI, tokens, components, responsive behavior, portfolio audience needs, and palette contrast in both themes.
- [x] Define the Darisi foundations, component contracts, and content patterns in system documentation.
- [x] Apply the system to the shared primitives and portfolio sections.
- [x] Correct the featured project grid so its animation wrapper, rather than its nested card, spans the full desktop row.
- [x] Render the original burgundy brand assets without a dark-theme brightness treatment.
- [x] Verify both themes, responsive layouts, accessibility basics, lint, and the static build.

### Design-system review (done)

Documented the Measured Signal system and audience hypotheses, split the brand
source colour from dark-theme action/focus roles, and applied shared heading,
brand, card, badge, and evidence-ledger patterns. Verified with exact contrast
checks, lint, production build, theme/mobile interaction checks, and a fresh
browser load with no warnings or errors. The existing D source assets remain
unchanged; the featured work card now spans the desktop grid from its wrapper.

---

## Production release preparation (2026-08-06)

- [x] Audit the complete diff, release configuration, and documentation for production blockers.
- [x] Resolve confirmed production-readiness issues with the smallest safe changes.
- [x] Run the full available verification suite, accessibility checks, and dependency audit.
- [x] Commit the verified release and push `main` to `origin`.

### Production release review (done)

Reinstated the shared Sheet close control and made it a 44px keyboard-accessible
target, so the mobile navigation no longer depends on the inert header trigger.
Verified lint, an optimized Next 16.3.0 build (12 static routes), static-export
artifacts, production dependency audit, and mobile-browser dismissal behavior.
