import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("homepage reveals ship hidden and are revealed by script", () => {
  const outputPath = ["out/index.html", "out/index/index.html"].find(existsSync);
  assert.ok(outputPath, "expected a static homepage");
  const html = readFileSync(outputPath, "utf8");

  // AnimatedContent renders its wrapper as `class="invisible ..."` and only reveals
  // it from JS. The homepage has exactly 8 wrappers: Work 2, Skills 2, About 2,
  // Contact 2. Asserting the exact count is deliberate — a >= threshold would pass
  // while a whole section was left unmigrated.
  const hidden = html.match(/class="invisible/g) ?? [];
  assert.equal(
    hidden.length,
    8,
    `expected 8 hidden reveal wrappers on the homepage, found ${hidden.length}`
  );
});
