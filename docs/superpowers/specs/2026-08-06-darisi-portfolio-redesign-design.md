# Darisi Reference-Driven Portfolio Redesign

## Decision

Implement the supplied portfolio references as one responsive, theme-aware site:

- `/` is the editorial portfolio homepage from the light and dark references.
- `/work` is the dedicated selected-work index from the supplied PortfolioIndex reference.
- The existing theme toggle selects the light or dark token set; no duplicate theme routes are created.
- The existing blog remains available and inherits the revised shared theme, but is removed from the primary homepage navigation because it is absent from the supplied navigation.
- The existing SVG logo and wordmark assets remain unchanged. They are placed on suitable surfaces rather than redrawn or altered.

## Visual system

The new system is warm-precision editorial rather than the current rounded-card product UI.

| Role | Light | Dark |
| --- | --- | --- |
| Canvas | `#F6F2EA` | `#0D1215` |
| Ink | `#1A2421` | `#E7EBE5` |
| Quiet ink | `#647972` | `#A4B1AE` |
| Structural rule | `#D5D0C5` | `#29383C` |
| Primary action | `#0F2724` | `#7DD3C7` |
| Accent | `#C4714E` | `#E59A70` |
| Raised section | `#0F2724` | `#18242A` |

Typography uses Source Serif 4 for editorial display, DM Sans for body copy, and DM Mono for labels. CSS fallbacks keep the exported site readable if the font request is unavailable. The page uses a 32px desktop / 20px mobile gutter, hairline rules, restrained rounded controls, and a single reveal family that respects reduced motion.

## Homepage behavior

The homepage keeps the existing content and public URLs but changes its hierarchy to match the supplied screens:

1. Compact sticky navigation with logo, Work / Skills / About / Contact, theme control, and a filled contact action.
2. Full-viewport hero with an editorial DARISI thesis, two-copy-column treatment, capability labels, paired calls to action, and a scroll cue.
3. Alternating screenshot and case-evidence project rows for Bhagyalakshmi Future Gold, DevMarket, and TexLedger.
4. Dark/high-contrast capabilities band, followed by about, contact, and a compact editorial footer.

Desktop project rows alternate media placement; mobile uses one readable vertical order. Existing project imagery, external links, email, GitHub, LinkedIn, analytics, skip link, focus styles, and reduced-motion support remain intact.

## Work index behavior

`/work` is a static route with route-specific metadata. Its server page renders one small client work-index component that owns local selection state:

- Desktop: 72px top bar, 310px sidebar, category filters, selectable project rows, and one selected case file.
- Mobile: compact top bar, stacked heading/filter panel, horizontally scrollable project rows, and one vertical case file.
- Selecting a category selects its first visible project; selecting a project updates its case file without a route change.
- Filters use `aria-pressed`; the selected project uses `aria-current`; selection moves focus to the case heading only after a direct project-row activation.
- The index derives entirely from `projects` in `src/lib/site-content.ts`; no data duplication, router library, or new dependency is added.

## Scope and guardrails

- Preserve static export (`output: "export"`), all existing project data, the logo source files, and public contact/social URLs.
- Do not add dependencies, a CMS, a backend, mock project content, or a theme provider.
- Synchronize theme colors across CSS, pre-paint theme initialization, viewport metadata, and the web manifest.
- Keep the blog route and structured data; update the sitemap with `/work`.
- Validate at 390px, 768px, and desktop in both themes, then run lint, static build, and a post-build work-index contract test.

## Design review

This scope directly maps the supplied light, dark, work-index, and design-system references. It deliberately avoids separate theme page trees, copied project data, and new generic primitives because the existing semantic theme toggle, data module, button, sheet, and brand asset already cover those needs.
