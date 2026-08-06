# Darisi Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Darisi as the supplied responsive light/dark editorial portfolio and add its selectable `/work` showcase index.

**Architecture:** Keep the App Router homepage composition and `projects` data source. Rework section markup and shared CSS around semantic theme tokens; add a server `/work` page plus one focused client component for local filters and case selection. The existing theme toggle remains the single theme mechanism.

**Tech Stack:** Next.js 16 App Router static export, React 19, TypeScript, Tailwind CSS v4, existing Radix Sheet, existing Next Image, Node built-in test runner.

## Global Constraints

- Preserve `output: "export"`, the logo and wordmark SVG source files, public project URLs, contact address, and social URLs.
- Use the supplied light/dark/index/design-system references as the visual authority.
- Retain `/blog`; do not include it in the primary portfolio navigation.
- Do not add dependencies, a theme provider, remote image hosts, mock data, or duplicated project data.
- Use `projects` and `skillAreas` from `src/lib/site-content.ts` as the only public portfolio data sources.
- Keep keyboard focus, skip navigation, reduced-motion behavior, readable image alt text, and `aria-pressed`/`aria-current` state for the work index.
- Verify 390px, 768px, and desktop layouts in light and dark themes.

---

## File structure

| File | Responsibility |
| --- | --- |
| `src/app/globals.css` | Reference-derived tokens, typography imports/fallbacks, shared editorial utility classes, responsive layout, and theme colors. |
| `src/app/layout.tsx` | Pre-paint theme color values synchronized with the new tokens. |
| `src/components/sections/*.tsx` | Reference-derived homepage navigation, hero, work, capability, about, contact, and footer presentation. |
| `src/components/sections/work-index.tsx` | Client-only project filtering, selection, and accessible selected-case rendering. |
| `src/app/work/page.tsx` | Static `/work` route and work-index metadata. |
| `src/app/sitemap.ts` | `/work` sitemap entry. |
| `src/lib/seo.ts`, `public/manifest.json` | New canvas/theme metadata values. |
| `tests/work-index.static.test.mjs` | Post-build contract proving the static export contains the new work route and selection controls. |

### Task 1: Establish the red test and reference token foundation

**Files:**
- Create: `tests/work-index.static.test.mjs`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/lib/seo.ts`
- Modify: `public/manifest.json`

**Interfaces:**
- Consumes: current static-export output and existing `darisi-theme` handling.
- Produces: semantic light/dark CSS tokens and a runnable static-export work-index contract.

- [ ] **Step 1: Write the failing static-export contract**

```js
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("static build emits an accessible selected-work index", () => {
  const outputPath = ["out/work.html", "out/work/index.html"].find(existsSync);
  assert.ok(outputPath, "expected a static /work page");
  const html = readFileSync(outputPath, "utf8");
  assert.match(html, /A working index of useful things/);
  assert.match(html, /aria-pressed/);
  assert.match(html, /Bhagyalakshmi Future Gold/);
});
```

- [ ] **Step 2: Run the test against the current export and confirm it fails because `/work` is absent**

Run: `npm run build && node --test tests/work-index.static.test.mjs`

Expected: the assertion reports `expected a static /work page`.

- [ ] **Step 3: Replace theme foundations with the reference-derived semantic palette**

```css
:root { --background: #0D1215; --foreground: #E7EBE5; --primary: #7DD3C7; }
html[data-theme="light"] { --background: #F6F2EA; --foreground: #1A2421; --primary: #0F2724; }
```

Add Source Serif 4, DM Sans, and DM Mono imports with readable system fallbacks. Keep existing semantic token names so shared blog/UI code continues to resolve correctly. Add only shared editorial classes needed by more than one section.

- [ ] **Step 4: Synchronize pre-paint and metadata colors**

Set the light/dark values in `themeInitScript`, `siteViewport`, and `manifest.json` to the new light canvas and dark canvas values so the browser chrome never flashes the old burgundy palette.

- [ ] **Step 5: Run lint after foundation changes**

Run: `npm run lint`

Expected: exit code 0.

### Task 2: Rebuild the homepage shell and editorial hero

**Files:**
- Modify: `src/components/sections/Navbar.tsx`
- Modify: `src/components/sections/Hero.tsx`

**Interfaces:**
- Consumes: `BrandMark`, `ThemeToggle`, existing analytics events, and shared theme tokens.
- Produces: responsive homepage navigation and hero using `#work`, `#skills`, `#about`, and `#contact` anchors.

- [ ] **Step 1: Update the primary navigation around the supplied information architecture**

```tsx
const links = [
  { label: "Work", href: "/work" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
```

Use the current mobile sheet and theme toggle. `Work` opens the dedicated index; the hero action remains anchored to the homepage evidence section. Preserve the existing contact analytics event.

- [ ] **Step 2: Render the reference hero with the unchanged brand asset**

```tsx
<h1 className="portfolio-hero__name">
  <BrandMark variant="wordmark" priority className="h-auto w-full" />
</h1>
```

Use the existing intro and capability strings, a paired `#work` / `#contact` action group, and an anchor-based scroll cue. Do not hide initial hero copy behind client-side animation.

- [ ] **Step 3: Exercise navigation structure with lint**

Run: `npm run lint`

Expected: exit code 0.

### Task 3: Rebuild evidence, capability, about, contact, and footer sections

**Files:**
- Modify: `src/components/sections/Work.tsx`
- Modify: `src/components/sections/Skills.tsx`
- Modify: `src/components/sections/About.tsx`
- Modify: `src/components/sections/Contact.tsx`
- Modify: `src/components/sections/Footer.tsx`

**Interfaces:**
- Consumes: `projects`, `skillAreas`, existing contact/social data, image assets, and analytics events.
- Produces: all remaining responsive homepage sections using no new data model.

- [ ] **Step 1: Replace card-grid work with alternating case evidence rows**

```tsx
{projects.map((project, index) => (
  <article className={index % 2 ? "portfolio-case portfolio-case--reverse" : "portfolio-case"}>
    {/* image, category/index, title, summary, evidence ledger, technologies, public action or internal note */}
  </article>
))}
```

Keep `Problem`, `Role`, and `Outcome` in that order, preserve public external-link safety attributes, and make TexLedger visibly internal rather than presenting an inactive button.

- [ ] **Step 2: Recast capabilities, about, and contact as the supplied editorial bands**

Use the current content but apply the reference sequence: dark/high-contrast three-capability band, principle rows plus quote, then the paper-grid contact section and prompt chips. Keep the contact email, GitHub, LinkedIn, and existing analytics events.

- [ ] **Step 3: Compact the footer and preserve blog discovery**

Keep the existing logo asset, contact address, social links, copyright, and a blog link in the footer; remove only the primary-nav Blog entry.

- [ ] **Step 4: Run lint after the homepage section changes**

Run: `npm run lint`

Expected: exit code 0.

### Task 4: Add the selectable `/work` index

**Files:**
- Create: `src/app/work/page.tsx`
- Create: `src/components/sections/work-index.tsx`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `projects: ProjectEntry[]`, project image/action data, `Link`, `Image`, and built-in React state.
- Produces: a static `/work` route with a locally selectable, filterable case file.

- [ ] **Step 1: Define static route metadata and render the client boundary**

```tsx
export const metadata: Metadata = {
  title: "Selected Work | Darisi",
  description: "A working index of product web apps, internal systems, and platform work by Ajay Darisi.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <WorkIndex />;
}
```

- [ ] **Step 2: Implement the smallest local selection model**

```tsx
const [category, setCategory] = useState("All work");
const filteredProjects = projects.filter(matchesCategory(category));
const [selectedTitle, setSelectedTitle] = useState(projects[0].title);
const selectedProject = filteredProjects.find((project) => project.title === selectedTitle) ?? filteredProjects[0];
```

When a category changes, set `selectedTitle` to the first visible project. Category buttons use `aria-pressed`; selected project buttons use `aria-current="true"`. The selected card contains title, summary, brief/part/result columns, technology tags, source image, and the existing public action when present.

- [ ] **Step 3: Add the route to the sitemap**

```ts
{ url: `${seoConfig.siteUrl}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 }
```

- [ ] **Step 4: Build and rerun the static-export contract**

Run: `npm run build && node --test tests/work-index.static.test.mjs`

Expected: exit code 0, with the test finding the generated `/work` export and accessible controls.

### Task 5: Visual and accessibility verification

**Files:**
- Modify: `tasks/todo.md`
- Modify: `docs/superpowers/specs/2026-08-06-darisi-portfolio-redesign-design.md`

**Interfaces:**
- Consumes: the completed static export and supplied reference screens.
- Produces: recorded verification evidence and an updated task review.

- [ ] **Step 1: Start the local app and inspect the homepage and `/work` at 390px, 768px, and desktop**

Run: `npm run dev`

Confirm each layout has no horizontal overflow, keyboard-focusable actions, readable logo placement, working theme control, a visible mobile navigation path, and one understandable scroll surface.

- [ ] **Step 2: Verify work-index interactions in the browser**

Select every category and every project. Confirm the active case updates, a category selects its first visible project, TexLedger has no dead outbound action, and external project links retain their destinations.

- [ ] **Step 3: Run final checks**

Run: `npm run lint && npm run build && node --test tests/work-index.static.test.mjs`

Expected: all commands exit 0.

- [ ] **Step 4: Record concrete evidence**

Update the spec and `tasks/todo.md` review with the executed commands, their results, viewport coverage, retained-blog decision, and any deliberate fidelity ceiling.
