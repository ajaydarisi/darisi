# Darisi — Project Guide

## Project Overview

Portfolio and freelance studio website for Ajay Darisi at **darisi.in**. Single-page static site showcasing services, portfolio work, and contact info. Built with Next.js static export — no server, no database, no CMS.

## Tech Stack

- **Framework**: Next.js 16.1.6 (static export via `output: "export"`)
- **Language**: TypeScript 5.9.3 (pinned, strict mode)
- **UI**: React 19.2.3, shadcn/ui (New York style), Radix UI, Lucide React icons
- **Styling**: Tailwind CSS v4 with `@tailwindcss/postcss`, CSS variables for theming
- **Utilities**: `clsx` + `tailwind-merge` via `cn()` helper, `class-variance-authority`

## Commands

```bash
npm run dev      # Dev server on localhost:3000
npm run build    # Static export to /out
npm run lint     # ESLint
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, SEO, viewport
│   ├── page.tsx            # Homepage with JSON-LD structured data
│   ├── globals.css         # Theme variables, animations, patterns
│   └── icon.svg            # Favicon
├── components/
│   ├── sections/           # Page sections (render order):
│   │   ├── Navbar.tsx      # Sticky header + mobile overlay menu
│   │   ├── Hero.tsx        # Landing hero with staggered animations
│   │   ├── Services.tsx    # Service cards (4 offerings)
│   │   ├── Work.tsx        # Portfolio projects (3 projects)
│   │   ├── Stats.tsx       # KPI metrics
│   │   ├── About.tsx       # About + philosophy
│   │   ├── Contact.tsx     # CTA section
│   │   └── Footer.tsx      # Footer with links & socials
│   └── ui/
│       ├── button.tsx      # CVA button (default/outline/ghost)
│       └── animate-on-scroll.tsx  # Scroll animation wrapper
├── hooks/
│   └── use-in-view.ts      # IntersectionObserver hook for animations
└── lib/
    └── utils.ts            # cn() utility
```

## Architecture & Patterns

- **Static export**: `output: "export"` in `next.config.ts`, images unoptimized
- **Section-based**: Each page section is its own component in `src/components/sections/`
- **Animation system**: `useInView` hook detects scroll → `AnimateOnScroll` wrapper applies CSS transitions (fade-up, fade-in, fade-left, fade-right, scale-in)
- **Styling**: Tailwind-first with `cn()` for class merging. Theme via CSS custom properties in `globals.css`
- **Dark theme only**: Background `#0B0B0B`, foreground `#F5F5F5`, primary accent `#8B1E2D` (burgundy)
- **All content hardcoded**: No API routes, no database, no CMS, no form backend (contact uses mailto)
- **SEO**: JSON-LD schemas, OpenGraph, Twitter cards, sitemap.xml, robots.txt

## Conventions

- `"use client"` directive for interactive components; server components by default
- Path alias: `@/*` → `./src/*`
- Mobile-first responsive design (Tailwind `md:` breakpoints)
- Semantic HTML with ARIA labels and keyboard navigation
- `prefers-reduced-motion` respected in animations
- shadcn/ui components configured via `components.json`

---

## Workflow Orchestration

### 1. Plan First

- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately — don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy

- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop

- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done

- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)

- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes — don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing

- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests — then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Git Conventions

- **No Co-Authored-By**: Never add `Co-Authored-By` lines to commit messages.

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
