import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("static build emits an accessible selected-work index", () => {
  const outputPath = ["out/work.html", "out/work/index.html"].find(existsSync);
  assert.ok(outputPath, "expected a static /work page");
  const html = readFileSync(outputPath, "utf8");
  assert.match(html, /A working index of useful things/);
  // The project selector conveys selection with aria-current. Anchor to the
  // <button>, not to bare /aria-current/: the navbar's active "Work" link also
  // carries aria-current on this page, so a loose match would still pass with the
  // selector deleted. (The original /aria-pressed/ had the same flaw, matching only
  // the theme toggle in the shared layout.)
  assert.match(html, /<button type="button" aria-current="true"/);
  assert.match(html, /Bhagyalakshmi Future Gold/);
});
