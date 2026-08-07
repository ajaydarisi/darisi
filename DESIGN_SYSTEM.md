# DARISI Design System

## Measured Signal

Darisi is a portfolio for teams assessing whether Ajay can turn an ambiguous
product, operational workflow, or platform decision into dependable software.
The system should feel like the work it represents: calm, precise, and
evidence-led.

The signature pattern is the **evidence ledger**: concise labelled rows that
make the problem, ownership, and outcome easy to scan. The golden ratio belongs
to the brand mark and wordmark; the interface uses a practical 4px/8px rhythm.

## Principles

1. Lead with a recognisable business problem before a technology choice.
2. Make proof visible: state the problem, role, and outcome in the same order.
3. Keep the D mark and wordmark as the expressive element; surrounding UI stays quiet.
4. Use burgundy for decisions and filled actions, never as small dark-theme text.
5. Preserve enough contrast, focus, and motion restraint for real working conditions.

## Foundations

### Color roles

| Role | Dark | Light | Use |
| --- | --- | --- | --- |
| Canvas | `#0B0F0E` | `#F7FAF9` | Page background |
| Surface | `#121917` | `#FFFFFF` | Panels and alternating sections |
| Elevated | `#18211E` | `#ECF3F0` | Controls and inset emphasis |
| Strong text | `#F2F5F3` | `#0F1A16` | Headings and high-emphasis copy |
| Body text | `#D5DCD8` | `#28352F` | Long-form and section descriptions |
| Muted text | `#A9B5AF` | `#3F4A46` | Supporting detail |
| Subtle text | `#7C8A84` | `#5E6B66` | Metadata only |
| Brand ink | `#0F2724` | `#0F2724` | Baked-in brand assets: app icon tile and the standalone wordmark files |
| Action fill | `#B7394F` | `#8B1E2D` | Primary buttons, active controls, and dark-theme scrollbar thumb |
| Action hover | `#BD3E54` | `#6F1724` | Hovered primary actions |
| Signal Rose | `#E46A79` | `#8B1E2D` | Dark-theme readable signal text, focus, icon and label states |
| Control border | `#607169` | `#7B8983` | Inputs, outlined controls, panel boundaries |
| Structural rule | `#233029` | `#D8E2DE` | Ledger rows and low-emphasis dividers |

**Rules:**

- `--primary` is an action fill, not ordinary text on a dark surface.
- `--primary-text` is the readable signal role.
- Use `--border` where a control or panel must be independently discernible;
  use `--border-subtle` for internal ledger rules.
- Brand assets fall into two kinds. Masked assets (`logo.svg`,
  `darisi-wordmark.svg` via `BrandMark`) carry no colour of their own and take
  `--primary` per theme. Baked assets (the app icon family, the standalone
  wordmark files) carry `#0F2724` and do not respond to the theme.

### Palette approval

Text, focus, and controls are chosen for WCAG 2.2 AA contrast on their intended
surfaces. Baked brand artwork stays `#0F2724` in both themes and is not used to
communicate an interactive state. See the [W3C contrast
criterion](https://www.w3.org/TR/WCAG22/#contrast-minimum) for the standard.

| Pair | Dark ratio | Light ratio | Status |
| --- | ---: | ---: | --- |
| Strong text / canvas | 17.57:1 | 16.95:1 | Approved |
| Body text / canvas | 13.83:1 | 12.19:1 | Approved |
| Muted text / canvas | 9.11:1 | 8.77:1 | Approved |
| Signal text / canvas | 6.09:1 | 8.61:1 | Approved |
| Signal text / elevated | 5.20:1 | 8.03:1 | Approved |
| Control border / surface | 3.45:1 | 3.65:1 | Approved |
| Button foreground / action fill | 5.15:1 | 9.05:1 | Approved |

### Typography

| Role | Face | Treatment | Use |
| --- | --- | --- | --- |
| Brand display | Custom DARISI wordmark | Reserved, never recreated with text | Hero and footer |
| Display | Inter Variable | 520 weight, tight tracking | Page and section headings |
| UI / body | Inter Variable | 400–600 weight | Copy, controls, cards |
| Utility | Native mono stack | 11px, uppercase, tracked | Eyebrows, ledger labels, supporting metadata |

### Layout and spacing

| Token | Value | Use |
| --- | --- | --- |
| `--content-wide` | 72rem | Homepage and navigation |
| `--content-reading` | 48rem | Blog and focused reading flows |
| `--content-measure` | 42rem | Section intro copy |
| `--page-gutter` | 20–32px fluid | Mobile and desktop page gutters |
| `--section-space` | 80–120px fluid | Main section rhythm |
| `--section-space-tight` | 56–80px fluid | Blog and footer rhythm |
| `--radius-control` | 12px | Buttons, inputs, mobile-nav rows |
| `--radius-panel` | 16px | Cards and inset panels |
| `--radius-tag` | 8px | Eyebrow labels |

### Elevation and motion

- **Card:** `--shadow-card`; reserve `--shadow-card-hover` for interactive cards.
- **Fast:** 160ms for color changes.
- **Base:** 240ms for controls and theme changes.
- **Enter:** 600ms, one restrained fade-up reveal family.
- Respect `prefers-reduced-motion`; do not use ambient animation outside the
  small hero scroll cue.

## Components

### BrandMark

`BrandMark` centralises the correct source asset and dimensions.

| Variant | Use |
| --- | --- |
| `mark` | Compact navigation and small decorative brand moments |
| `wordmark` | Hero and footer |

`BrandMark` paints the asset as a CSS mask over `bg-primary`, so only the alpha
channel of the source reaches the page and the mark follows the theme token.
Keep `public/logo.svg` and `public/darisi-wordmark.svg` as bare glyphs — no
tile, no background, no baked colour — or the mask will pick up the frame. Do
not alter them when adding a placement.

### App icon

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

### SectionHeading

Use for the repeated `eyebrow + heading + description` pattern.

| Property | Options | Use |
| --- | --- | --- |
| `eyebrow` | short descriptor | What the section is |
| `title` | concise outcome-led heading | Main point |
| `description` | optional | Clarifies relevance |
| `align` | `start`, `center` | Start for evidence; centre for capability/contact overviews |

### EvidenceLedger

Use only when labels carry meaning. The portfolio uses it for `Problem → Role →
Outcome`; the blog uses it for the article brief. Do not use it as decorative
numbering.

### Badge

| Variant | Meaning |
| --- | --- |
| `eyebrow` | Section or page label; mono, squared, signal-coloured |
| `tag` | Taxonomy, technology, category, or conversational prompt |
| `media` | Project-image label; opaque enough to read over photography |
| `secondary` | Quiet neutral tag |
| `outline` | Sparse contextual metadata when a panel is already busy |

### Card

| Variant | Use | Interaction |
| --- | --- | --- |
| `default` | Static grouping | No movement |
| `interactive` | Linked case studies, capabilities, posts | Small lift, stronger border, elevated shadow |
| `inset` | Supporting context, article brief, contact prompt | No shadow, controlled contrast |

### Button

| Variant | Use |
| --- | --- |
| `default` | One primary action in a local decision group |
| `outline` | Supporting external or secondary action |
| `ghost` | Low-priority utility action |

All buttons have visible keyboard focus, a 40px minimum default target, and
keep their action wording consistent before and after interaction.

## Patterns

### Hero

- Full wordmark is the thesis; the following copy immediately explains what
  kind of work Darisi does.
- A small utility list names the three relevant practice areas.
- Do not hide hero content while waiting for client-side animation.

### Case study card

1. Product image and category tag.
2. Clear project summary.
3. Evidence ledger: problem, role, outcome.
4. Technology tags as secondary proof.
5. One explicit live-product action, where public.

### Blog

- Keep the reading width compact.
- Use page metadata and the article brief before long-form copy.
- Keep case-study cards and blog cards visually related but not identical:
  the former foreground evidence, the latter foreground the reading decision.

### Contact

Use conversational prompts that help a visitor identify a relevant starting
point. The primary action is email; social links remain secondary.

## Accessibility and QA

- Keep normal text at least 4.5:1 and large text/non-text indicators at least
  3:1 against their intended surface.
- Do not communicate state through red alone; pair it with label, shape, or
  position.
- Retain the skip link, logical heading order, visible focus rings, and reduced
  motion support.
- Check 390px, 768px, and desktop layouts in both themes after system changes.
- Verify theme toggling without hydration warnings or layout shifts.

## Implementation map

- Tokens and global composition live in `src/app/globals.css`.
- Shared primitives live in `src/components/ui/`.
- Brand assets live in `public/`, generated from `src/app/icon.svg`.
- Homepage patterns live in `src/components/sections/`.
- `src/lib/site-content.ts` remains the source of truth for public work and
  capability content.
