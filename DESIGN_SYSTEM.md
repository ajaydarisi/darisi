# DARISI Design System

## Darisi Warm

Darisi is a portfolio for teams assessing whether Ajay can turn an ambiguous
product, operational workflow, or platform decision into dependable software.
The system reads as warm and personal rather than corporate: a cream/deep-green
palette, a hand-written Caveat accent alongside the working DM Sans/Source
Serif type, and a rounded, pill-shaped UI vocabulary (navigation, buttons,
cards) instead of hard-edged panels.

The signature pattern is the **labelled brief**: concise `Problem / Role /
Outcome` (or brief-question) rows that make the evidence easy to scan without
reading full paragraphs. Motion is a small set of shared keyframes — `rise`,
`fadein`, `breathe`, `floaty`, `pulsedot` — applied per element via Tailwind's
arbitrary `animate-[…]` syntax rather than bespoke per-component animation.

## Principles

1. Lead with a recognisable business problem before a technology choice.
2. Make proof visible: state the problem, role, and outcome in the same order,
   every time.
3. The hand-written Caveat accents are seasoning, not the message — they carry
   tone (eyebrows, asides, one pull-quote), never load-bearing content.
4. Use the warm terracotta accent for small labels and focus states, never as
   a large fill behind body copy.
5. Preserve enough contrast, focus, and motion restraint for real working
   conditions; respect `prefers-reduced-motion`.

## Foundations

### Color roles

Defined in `src/app/globals.css` as CSS custom properties, themed via
`html[data-theme="light"|"dark"]`, and exposed to Tailwind through `@theme
inline` (`--color-background` → `bg-background`, etc.).

| Role | Token | Dark | Light | Use |
| --- | --- | --- | --- | --- |
| Canvas | `--background` | `#0F2724` | `#F6F2EA` | Page background |
| Ink | `--foreground` | `#F6F2EA` | `#1A2421` | Headings, high-emphasis copy |
| Body | `--text-body` | `#A8BEB9` | `#4A5A55` | Paragraph copy |
| Soft | `--soft` | `#7E9793` | `#586461` | Small metadata: dates, reading time, footer copyright, tool lists |
| Card | `--card` | `#162F2C` | `#EDE9E0` | Elevated panels, list rows |
| Panel 2 | `--panel2` | `#1C3A37` | `#E4DFD4` | Secondary surface (pull-quote, comparison cards) |
| Fill | `--fill` / `--on-fill` | `#F6F2EA` on `#0F2724` | `#0F2724` on `#F6F2EA` | Primary filled buttons |
| Feature | `--feature` / `--on-feature` | `#1C3A37` on `#F6F2EA` | `#0F2724` on `#F6F2EA` | The dark intro/CTA card in Story and post sidebars |
| Feature body | `--feature-body` | `#A8BEB9` (both themes) | — | Body copy inside a `--feature` panel |
| Nav | `--nav-bg` | `#1C3A37` | `#0F2724` | Navbar — always dark, independent of site theme |
| Accent | `--accent` | `#DDA082` | `#914D30` | Small bold labels, focus rings, links, the hero's full stop |
| Line | `--line` | `rgba(246,242,234,0.10)` | `rgba(26,36,33,0.10)` | Hairline borders on warm surfaces |
| Wash 1/2 | `--wash1` / `--wash2` | terracotta → transparent | terracotta → transparent | Ambient radial gradients behind Hero/Contact |

**Rules:**

- `--accent`'s light value is deliberately darker than the raw brand terracotta
  (`#C4714E`) — see Palette approval below. Do not revert it to the lighter hex
  without re-checking contrast; it was changed specifically because the
  lighter value failed AA on the small bold labels it's used for.
- `--nav-bg` is independent of `data-theme`: the navbar is always the dark
  green pill in both themes. `Navbar.tsx` also hardcodes a few literal hex
  values (`#F6F2EA`, `#0F2724`, `#DDA082`) for exactly this reason — they're
  the fixed dark-nav palette, not theme-reactive tokens.
- Brand assets fall into two kinds. Masked assets (`logo.svg`,
  `darisi-wordmark.svg` via `BrandMark`) include the full lockup geometry,
  including its contrast dot, while CSS paints them with the active semantic
  colours. Baked app-icon assets carry `#0F2724` and do not respond to theme.

### Palette approval

Text, focus, and controls are chosen for WCAG 2.2 AA contrast (4.5:1 normal
text, 3:1 large text/non-text) on their intended surfaces. See the [W3C
contrast criterion](https://www.w3.org/TR/WCAG22/#contrast-minimum).

| Pair | Light ratio | Dark ratio | Status |
| --- | ---: | ---: | --- |
| Ink / canvas | 14.27:1 | 14.08:1 | Approved |
| Body / canvas | 6.52:1 | 8.03:1 | Approved |
| Soft / canvas | 5.51:1 | 5.04:1 | Approved |
| Soft / card | 5.08:1 | 4.56:1 | Approved |
| Accent / canvas | 5.69:1 | 7.05:1 | Approved |
| Accent / card | 5.24:1 | 6.38:1 | Approved |
| On-feature / feature | 14.08:1 | 11.00:1 | Approved |
| Feature body / feature | 8.03:1 | 6.28:1 | Approved |
| On-fill / fill | 14.08:1 | 14.08:1 | Approved |

Every pair above is a *minimum* — computed against the two surfaces each role
actually sits on (canvas and card). Re-run the contrast check before changing
`--soft` or `--accent` in either theme; both were tuned specifically to clear
4.5:1 on the smallest, most information-bearing text that uses them (reading
times, dates, `Problem`/`Role`/`Outcome` labels), not just against canvas.

### Typography

Self-hosted via `next/font/google` in `src/app/layout.tsx` (not a `@import` in
CSS — Tailwind v4's CSS bundler doesn't fetch remote `@import` targets, so a
font loaded that way silently never arrives). Only two families are used
anywhere on the site, and both are `preload`d.

| Role | Token | Face | Use |
| --- | --- | --- | --- |
| Sans | `--font-sans` | DM Sans (var. weight) → Inter → Arial | Body text, sitewide default |
| Hand | `--font-hand` | Caveat 500/600 | Eyebrows, asides, one pull-quote per section — never the only copy |

`.hand` applies `font-family: var(--font-hand); font-weight: 500;` — use the
class, not the raw Tailwind font utility, so weight stays consistent.

DM Mono and Source Serif 4 (`--font-utility`/`--font-display`) were only ever
rendered by `/work`, which no longer exists; they were removed from
`layout.tsx` and `globals.css` along with it. Reintroduce a face deliberately
if a future page needs one — don't assume either token still exists.

### Layout and spacing

| Token | Value | Use |
| --- | --- | --- |
| `--content-wide` | 96rem | `.site-shell` max width before it centres |
| `--page-gutter` | `clamp(1.25rem, 4vw, 3rem)` | `.site-shell`'s side inset; scales continuously with viewport width (20px → 48px), no breakpoint jump, so tablet widths get real spacing too |
| `--radius-control` | 12px | Focus-ring/control radius (used by the skip link and the mobile sheet's close button) |

Every other radius is written as a literal Tailwind value at the call site
(`rounded-[1.75rem]`, `rounded-full`) rather than through a shared token.

### Elevation and motion

- **Shadow:** `--shadow-soft` for resting cards, `--shadow-up` on hover/focus
  and for the floating nav pill.
- **Keyframes** (`globals.css`): `rise` (fade + rise-in, section reveals),
  `fadein`, `breathe` (ambient background wash), `floaty` (drifting collage
  cards, respects a `--tilt` custom property per card), `pulsedot` (the
  availability indicator).
- Apply keyframes with Tailwind's arbitrary syntax at the call site —
  `animate-[rise_700ms_var(--ease-standard)_both]` — so each element owns its
  own delay/duration instead of a shared `.animate-*` class. `--ease-standard`
  is `cubic-bezier(0.22, 1, 0.36, 1)`.
- Section-level reveals (headings, cards) go through `AnimatedContent`
  (GSAP + ScrollTrigger), not the raw keyframes — see below.
- Respect `prefers-reduced-motion`: `AnimatedContent` snaps to its final state
  instead of animating; the global media query in `globals.css` collapses all
  other animation/transition durations to near-zero.

## Components

### AnimatedContent (`src/components/ui/AnimatedContent.tsx`)

Shared scroll-triggered reveal wrapper. Site defaults for `distance`,
`duration`, and `ease` live in the component itself, not at call sites — change
the site's reveal timing there. Renders `invisible` until its GSAP timeline
plays, then sets `visibility: visible`; on `prefers-reduced-motion` it snaps to
its final state on mount instead.

### BrandMark (`src/components/ui/brand-mark.tsx`)

| Variant | Use |
| --- | --- |
| `mark` | Compact navigation and small decorative brand moments |
| `wordmark` | Hero, Story panel, Footer |

Paints the source SVG as one CSS mask, so the complete lockup — including the
contrast dot stored in the asset — follows the active theme. Keep
`public/logo.svg` and `public/darisi-wordmark.svg` free of tiles and
backgrounds; only their glyph and dot geometry should reach the mask. Dark
and light surfaces use scoped `--logo-dot` values where necessary so the dot
retains contrast against its immediate background.

### Sheet (`src/components/ui/sheet.tsx`)

Radix `Dialog` wrapper backing the mobile nav menu. Keep
`DialogPrimitive.Close` in `SheetContent` even though the header's own trigger
visually flips to an X — Radix makes the header inert (`aria-hidden`,
`pointer-events: none`) while the dialog is open, so the explicit `Close` is
the only control assistive tech can reach.

### ThemeToggle / LocalTime (`src/components/ui/`)

`ThemeToggle` reads/writes `document.documentElement.dataset.theme` and
`localStorage` via `useSyncExternalStore`. `LocalTime` renders the Bengaluru
wall clock client-only (`suppressHydrationWarning` on the one node whose text
differs between server and client).

### PostToc / ReadingProgress (`src/components/blog/`)

`withHeadingIds` reads a post's own `h2`s server-side, stamps their ids, and
returns both the annotated content and the heading list — no per-post table of
contents to maintain by hand. `ReadingProgress` is a fixed top-of-viewport
scroll bar, independent client component.

## Patterns

### Hero

- The hero fills at least one viewport (`min-h-[100svh]`) so the next section
  never peeks in before the first scroll.
- A short line of context, the name as an oversized display heading with a
  full-stop accent, two CTAs, an availability line, and a row of proof pills.
- A decorative, `aria-hidden` collage of three project screenshots on desktop,
  each drifting independently via `floaty` with its own `--tilt`.
- Do not hide hero content while waiting for client-side animation.

### Work

- Category + index, title, summary, a `Problem / Role / Outcome` brief, tech
  tags, and one explicit live-product action where public.
- The homepage's `#work` section is the only place selected work is
  described — there is no standalone `/work` route. Images there sit below
  the fold (Hero fills the first viewport) and are left to lazy-load.

### Story

- One dark `--feature` panel carries the personal intro + CV ask; numbered
  value statements and skill-area cards sit alongside it.

### Notes / Blog

- Keep the reading width compact (`.blog-prose` caps at 44rem).
- Post bodies stay plain `p`/`h2`/`ul`/`ol`/`blockquote` markup — `.blog-prose`
  supplies the warm treatments (accent-dot bullets, numbered cards for `ol`, a
  panel callout for `blockquote`, an opt-in `ul.card-grid` for comparisons) so
  a new post never has to hand-author them.
- `PostLayout` owns the reading-progress bar, back-to-notes pill, brief card,
  sticky contents + CTA sidebar, related notes, and the closing contact band.

### Contact

Use conversational prompt chips that help a visitor identify a relevant
starting point. The primary action is email; social links remain secondary.

## Accessibility and QA

- Keep normal text at least 4.5:1 and large text/non-text indicators at least
  3:1 against their *actual* rendered surface — check the specific
  background a color sits on, not just canvas (see Palette approval).
- Do not communicate state through color alone; pair it with label, shape, or
  position.
- Retain the skip link, logical heading order (one `h1` per page), visible
  focus rings, and reduced-motion support.
- Check 390px, ~768px (the nav's own mobile/desktop breakpoint), and desktop
  layouts in both themes after system changes.
- Verify theme toggling without hydration warnings or layout shifts.

## App icon

The tile that represents the site *outside* the page: browser tab, bookmark,
home screen, PWA. Unlike `BrandMark` it cannot follow the theme — it sits on
browser chrome we do not control — so the frame and colour are baked in.

`src/app/icon.svg` is the single source. Every raster is generated from it;
none is edited by hand.

| Property | Value | Why |
| --- | --- | --- |
| Tile | 572 × 572, `viewBox="-38.5 -30 572 572"` | Offsets the untouched glyph path so its ink box centres |
| Glyph ink box | x `120`–`375`, y `56`–`456` | The outer curve peaks at `375`; `460` is a control point, not a point on the curve |
| Glyph height | 70% of tile | Legible at 16px without crowding the corners |
| Corner radius | 22% of tile (`rx="126"`) | Rounded-square, close to the iOS mask |
| Ink | `#0F2724` | Brand dark; reads on light and dark chrome |
| Tile fill | `#F6F2EA` | Matches `manifest.json` `background_color` |

| File | Raster | Corners | Surface |
| --- | --- | --- | --- |
| `src/app/icon.svg` | vector | transparent | Source of truth |
| `public/icon.svg` | vector | transparent | Mirror; served for `icons.icon` |
| `public/favicon.ico` | 16 / 32 / 48 PNG-in-ICO | transparent | Browser tab — Chrome prefers this over the SVG because the link carries `sizes="any"` |
| `public/favicon-48x48.png` | 48 | transparent | Metadata and manifest |
| `public/favicon-192x192.png` | 192 | transparent | Manifest, Android home screen |
| `public/apple-touch-icon.png` | 180 | **opaque, unrounded** | iOS home screen; iOS applies its own mask and renders transparent corners black |

**Rules:**

- Change the icon in `src/app/icon.svg`, then regenerate every raster and copy
  it to `public/icon.svg`. A vector-only edit leaves the tab showing the old
  raster, because `favicon.ico` wins there.
- Rasterise with something that preserves alpha. macOS `qlmanage` silently
  flattens transparency onto white, which puts a white square around the tile.
- `apple-touch-icon.png` is the one deliberate exception to the rounded,
  transparent tile. Keep it opaque.

## Implementation map

- Tokens and global composition live in `src/app/globals.css`.
- Shared primitives live in `src/components/ui/`.
- Brand assets live in `public/`, generated from `src/app/icon.svg`.
- Homepage sections live in `src/components/sections/`; blog templates in
  `src/components/blog/`.
- `src/lib/site-content.ts` is the source of truth for public work and
  capability content; `src/lib/blog.ts` for post metadata.
- There is no standalone `/work` route (removed 2026-08-11) — selected work
  lives only on the homepage's `#work` section.
