# Ask About Ajay CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let visitors open the Ajay-focused chat from the personal Story card.

**Architecture:** Keep the CTA in the existing Story feature card, beside the CV action where visitors are already reading Ajay's introduction. Reuse its action styles and the analytics helper; a build-backed static test validates the public navigation contract.

**Tech Stack:** Next.js 16 App Router static export, React 19, TypeScript, Lucide React, Node's built-in test runner.

## Global Constraints

- The destination is exactly `https://chat.darisi.in`.
- The visible label is exactly `Ask about Ajay`.
- Open the external chat in a new tab with `target="_blank"` and `rel="noreferrer"`.
- Reuse the Story feature-card action treatment; add no dependency or shared abstraction.
- Record the click through `trackEvent` as `story_chat_cta_click` with `location: "story_feature"`.
- Static-export output, not source text, is the user-facing navigation contract under test.

---

### Task 1: Add and prove the Story chat CTA

**Files:**
- Create: `tests/ask-about-ajay.static.test.mjs`
- Modify: `src/lib/analytics.ts`
- Modify: `src/components/sections/Story.tsx`
- Modify: `tasks/todo.md`

**Interfaces:**
- Consumes: the existing `trackEvent` helper, `ANALYTICS_EVENTS`, Story feature-card action classes, and the static homepage at `out/index.html`.
- Produces: `ANALYTICS_EVENTS.storyChatCtaClick`, an external Story action to the chat site, and a regression test for the rendered link.

- [x] **Step 1: Write the failing static-output test**

Create `tests/ask-about-ajay.static.test.mjs`:

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("the Story card sends visitors to the Ajay chat", () => {
  const html = readFileSync("out/index.html", "utf8");
  const link = html.match(
    /<a(?=[^>]*href="https:\/\/chat\.darisi\.in")(?=[^>]*target="_blank")(?=[^>]*rel="noreferrer")[^>]*>([\s\S]*?)<\/a>/,
  );

  assert.ok(link, "expected a new-tab link to the Ajay chat");
  assert.match(link[1], /Ask about Ajay/);
});
```

- [x] **Step 2: Run the test to verify it fails**

Run: `npm run build && node --test tests/ask-about-ajay.static.test.mjs`

Expected: FAIL with `expected a new-tab link to the Ajay chat` because the
homepage does not yet render the CTA.

- [x] **Step 3: Add the minimal Story action and analytics event**

In `src/lib/analytics.ts`, add the event inside `ANALYTICS_EVENTS`:

```ts
storyChatCtaClick: "story_chat_cta_click",
```

In `src/components/sections/Story.tsx`, import `MessageCircle`,
`ANALYTICS_EVENTS`, and `trackEvent`; then directly after the existing CV
action add:

```tsx
<a
  href="https://chat.darisi.in"
  target="_blank"
  rel="noreferrer"
  onClick={() =>
    trackEvent(ANALYTICS_EVENTS.storyChatCtaClick, {
      location: "story_feature",
    })
  }
  className="mt-3 inline-flex h-13 items-center gap-3 rounded-full border-[1.5px] border-[color:var(--feature-action-border)] bg-[var(--feature-action-bg)] px-6 text-[0.9375rem] font-semibold text-on-feature transition-[background-color,transform] duration-[var(--motion-base)] hover:-translate-y-0.5 hover:bg-[var(--feature-action-hover)]"
>
  <MessageCircle className="size-[1.0625rem]" strokeWidth={1.9} aria-hidden="true" />
  Ask about Ajay
</a>
```

- [x] **Step 4: Run focused test and full verification**

Run: `npm run build && node --test tests/ask-about-ajay.static.test.mjs && npm run lint && npx tsc --noEmit && git diff --check`

Expected: every command exits 0; the focused test finds the rendered chat link,
and lint/typecheck validate the callback and icon imports.

- [x] **Step 5: Update the task review record**

Mark the Ask About Ajay checklist complete in `tasks/todo.md` and state the
verification commands and results in its review section.

## Self-Review

- Coverage: placement, label, destination, new-tab protection, shared visual
  style, analytics, accessibility, and static-output validation are all mapped
  to Task 1.
- Deliberate limits: no new UI primitive, no new dependency, no chatbot API
  work, and no competing Hero or Contact CTA.
- Test validity: removing the chat link, changing its destination, dropping
  its new-tab protection, or changing its visible label fails the build-backed
  test; analytics remains typechecked through its established typed helper.
