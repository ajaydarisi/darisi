# React Bits Scroll Reveals

## Decision

Replace the hand-rolled scroll-reveal system with the React Bits `AnimatedContent`
component, installed as source through the already-configured shadcn registry.

- All 8 reveal call sites in `Work`, `Skills`, `About`, and `Contact` use
  `<AnimatedContent>` directly.
- `src/components/ui/animate-on-scroll.tsx` and `src/hooks/use-in-view.ts` are deleted.
- `Hero` is not touched. It is the LCP element and is deliberately unanimated.
- The vendored component is patched in four places before use; the patches are the
  substance of this change, not the install.

This restores the React Bits usage described in the 2026-08-06 redesign spec, which
was reverted in `b4a2b17` only because those components had zero importers during a
mobile performance push.

## Why this costs something

The site currently animates with ~90 lines of CSS transitions driven by one
`IntersectionObserver`, and ships **zero** animation dependencies. `AnimatedContent`
requires `gsap@^3.13.0` and pulls `ScrollTrigger`.

| | Now | After |
| --- | --- | --- |
| Animation deps | none | `gsap` + `ScrollTrigger` |
| Est. added bundle | — | ~40 KB gzipped |
| Reveal variants in use | 1 of 5 (`fade-up`) | 1 of 5 |
| Visual difference | — | near-identical |

This lands on a site measured at PSI mobile Performance **73**, **LCP 6.5s**, with
image resizing (86 KiB) and legacy JS (14 KiB) still open in `tasks/todo.md`.

The tradeoff was raised and accepted deliberately: the goal is to standardise on
React Bits as the animation layer, not to chase a visual delta. The actual bundle
delta is a measured verification gate below, so the decision can be revisited with a
real number rather than this estimate.

## The patches

`AnimatedContent` is vendored source, so these live in the component file. Three
patches are required; a fourth concern turned out to be already handled upstream,
and is documented anyway because it is what makes patch 2 dangerous to get wrong.

### 1. `"use client"`

`components.json` sets `rsc: true`, and the file calls
`gsap.registerPlugin(ScrollTrigger)` at module scope. Without the directive the
import is pulled into the server graph and the static export build fails.

### 2. Reduced-motion guard

The site's existing guarantee is `globals.css:459`, which forces
`transition-duration: 0.01ms` under `prefers-reduced-motion: reduce`.

**That override cannot reach GSAP.** GSAP does not use CSS transitions; it writes
inline styles frame-by-frame via `requestAnimationFrame`. Shipping the component
unpatched silently removes reduced-motion support from every animated section on
the site.

The component must check `matchMedia("(prefers-reduced-motion: reduce)")` and, when
it matches, render children in their final visible state with no timeline created.

### 3. Strip the `snap-main-container` lookup

The stock component defaults its scroller to
`document.getElementById('snap-main-container')`, an artifact of the React Bits demo
site. It resolves to `null` here. Harmless, but it is dead code that implies a
container contract this site does not have.

### 4. Initial hidden state — already handled, but it sets the trap

Verified in the vendored source: the component renders
`<div ref={ref} className={`invisible ${className}`}>` and its `gsap.set` includes
`visibility: 'visible'`. Tailwind's `invisible` is `visibility: hidden`, and the
inline style GSAP writes overrides the class. So the flash is already prevented and
**no patch is needed here.**

This is good news that creates the real hazard, below.

### Patch 2 and patch 4 interact — the failure mode

The `invisible` class is applied **unconditionally**, and the only thing that ever
removes it is the `gsap.set` inside `useEffect`.

Therefore a naive reduced-motion guard — an early `return` before `gsap.set` runs —
leaves the element `visibility: hidden` **forever**. Every animated section on the
site becomes permanently blank, for exactly the users the guard was meant to protect.
The build passes, the markup is correct, and the content is invisible.

**Requirement:** the reduced-motion path must still make the element visible. The
minimal correct form is to snap it to its final state rather than return early:

```tsx
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, visibility: "visible" });
  return;
}
```

Four lines, no extra state, no class juggling — the inline `visibility: visible`
beats the `invisible` class. This case gets an explicit verification gate.

## Variant mapping

Only `fade-up` has call sites. The other four are recorded here so the capability is
not lost with the deleted `variant` prop.

| Variant | `AnimatedContent` props |
| --- | --- |
| `fade-up` | `distance={32} direction="vertical"` |
| `fade-in` | `distance={0}` |
| `fade-left` | `distance={32} direction="horizontal"` |
| `fade-right` | `distance={32} direction="horizontal" reverse` |
| `scale-in` | `distance={0} scale={0.95}` |

Shared across all call sites:

- `distance={32}` — matches the outgoing `translate-y-8` (2rem).
- `duration={0.6}` — matches the outgoing 600ms default.
- `delay` — outgoing values are milliseconds; GSAP takes seconds. Divide by 1000.
  The two existing `delay={100}` call sites become `delay={0.1}`. A missed conversion
  here is silent: `delay={100}` in GSAP is a 100-second delay, which reads as content
  that never appears.
- `threshold={0.1}` — matches the outgoing `useInView` threshold.
- `ease="power4.out"` — the outgoing `--ease-standard` is
  `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutQuint). GSAP's `power4.out` is the closest
  built-in. An exact match would require the `CustomEase` plugin and more bundle;
  `power4.out` is the deliberate choice.

The outgoing `rootMargin: "0px 0px -80px 0px"` has no direct `AnimatedContent`
equivalent. Reveals will trigger marginally earlier. This is accepted as within
tolerance for a like-for-like swap.

## Call sites

Eight instances, all currently `variant="fade-up"`:

| File | Instances | Delay conversion |
| --- | --- | --- |
| `src/components/sections/Work.tsx` | 2 | `delay={index * 100}` → `delay={index * 0.1}` |
| `src/components/sections/Skills.tsx` | 2 | `delay={index * 100}` → `delay={index * 0.1}` |
| `src/components/sections/About.tsx` | 2 | `delay={100}` → `delay={0.1}` |
| `src/components/sections/Contact.tsx` | 2 | `delay={100}` → `delay={0.1}` |

Eight instances total. Four carry a delay — two literal, two computed per-index
for staggered lists. The computed ones are the easiest to miss.

## Verification gates

The change does not ship unless all five pass.

1. **Build** — `npm run build` completes; static export emits all 16 routes.
2. **No flash** — hard reload with cache disabled; content must not paint, vanish,
   then animate. Checked at the top of `Work`.
3. **Reduced motion** — with `prefers-reduced-motion: reduce` emulated, all four
   sections render fully visible and static. No element left at `opacity: 0`.
   This is the gate that catches the patch-2/patch-4 interaction.
4. **Bundle delta** — record first-load JS before and after. Expected ~+40 KB gz.
   Reported as a number, not an assertion.
5. **Accessibility** — re-run the contrast, target-size, and label-in-name sweep
   from the 2026-08-09 audit. A11y must stay clean; the seven fixes from that audit
   must remain in effect.

## Out of scope

- `Hero` animation. It is the LCP element.
- Text-level effects (`SplitText`, `BlurText`, `ScrollReveal`). A separate decision.
- Animated backgrounds (`Aurora`). Deleted in `b4a2b17`; not being restored here.
- The open `tasks/todo.md` performance items (image resizing, legacy JS).
- Any change to `globals.css` motion tokens.

## Rollback

The change is confined to four section components, one new vendored file, one
dependency, and two deletions. Reverting is a single `git revert` plus
`npm install`. No data, routing, or content changes are involved.
