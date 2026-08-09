import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("static build emits an accessible selected-work index", () => {
  const outputPath = ["out/work.html", "out/work/index.html"].find(existsSync);
  assert.ok(outputPath, "expected a static /work page");
  const html = readFileSync(outputPath, "utf8");
  assert.match(html, /A working index of useful things/);
  // The project selector conveys selection with aria-current. This previously
  // asserted aria-pressed, which only ever matched the theme toggle in the
  // shared layout — an unrelated component, so the contract broke when that
  // toggle changed.
  assert.match(html, /aria-current/);
  assert.match(html, /Bhagyalakshmi Future Gold/);
});
