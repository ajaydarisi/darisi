# Reposition darisi.in: freelance lead-gen site → personal portfolio

Status: **implemented, verified, committed** — see `## Review` at the end of this file.

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
