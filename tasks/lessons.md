# Lessons

- For identity work with mathematical constraints, encode the full layout system in the source and validate the actual dimensions; do not rely on a golden-ratio-inspired appearance alone.
- Validate each distinctive glyph at its smallest rendered size; exact geometry does not guarantee a legible letterform.
- Decide each lockup's placement before integrating it: compact navigation benefits from the mark, while a hero can carry the full wordmark.
- Preserve established brand assets exactly unless the user explicitly asks to change them; add new lockups as separate assets.
- When a wordmark incorporates an existing brand mark, reuse the exact original path with a uniform scale rather than recreating its geometry.
- Treat a palette as semantic roles, not a set of attractive swatches: validate each text, focus, action, and control pairing against its real surface in both themes.
- Keep established brand artwork visually unchanged unless a new treatment is explicitly approved; UI contrast fixes should not silently brighten the logo.
- When a supplied visual mockup is called "exact," validate the rendered layout against it at a matching viewport before declaring a redesign complete; a thematic interpretation is not sufficient.
- When a visual detail belongs to a brand asset, compose it in the shared brand component rather than repeating it at each placement.
- Position lockup details against the visible artwork bounds, not an SVG's padded viewBox.
- When a brand detail is requested inside an asset, put its geometry in that asset and keep the renderer to one lockup element.
- When refining a lockup, tune the visible relationship between its glyph and accent, not merely its position within the overall asset bounds.
- Use the established design-token colour for a brand accent; do not introduce a near-match without approval.
- When two lockups are meant to share one accent, do not add a context-specific colour override without a visual reason.
- For an accent beside a curved glyph, align it to the nearby visible curve instead of the glyph's farthest bounding-box edge.
- For a tight brand-lockup gap, measure the actual path-to-circle distance instead of estimating from a screenshot.
- When a lockup specifies edge alignment, honour the explicit geometric bounds rather than optimizing for optical proximity.
- Bézier control points are not rendered bounds; compute curve extrema before aligning adjacent artwork.
- In a compound lockup, align the accent to the overall visible bounds, even when different glyphs establish the width and baseline.
- For a wordmark accent, use the adjacent terminal glyph's baseline when the lockup contains a taller leading glyph.
- When a logo dot should read as separate from its terminal glyph, leave a small
  explicit SVG-unit gap and update the CSS mask gradient with the same geometry.
- If the first spacing pass is not visibly distinct at rendered size, increase
  the shared SVG gap rather than adding placement-specific CSS.
- When only one lockup needs more breathing room, adjust that asset and its mask
  cutoff without perturbing the compact logo's established geometry.
- Anchor mask color transitions to terminal glyph edges, not the dot center or
  edge, so asset caching and spacing changes cannot split the accent circle.
- Keep light and dark surface tokens explicit in each theme selector; changing
  the default root token alone can silently make one theme inherit the wrong
  panel color.
- Give brand accents their own theme token when they intentionally invert from
  the broader UI accent; this keeps logo color stable if product accents evolve.
- When a section intentionally reverses a shared brand accent, scope the token
  to that surface instead of duplicating the logo component.
- Reuse a scoped logo-dot token for surfaces that share the same contrast intent,
  regardless of whether they show the compact or full lockup.
- Treat browser icons and social images as logo placements too: their dots must
  be designed against their fixed artwork backgrounds, not the page theme.
