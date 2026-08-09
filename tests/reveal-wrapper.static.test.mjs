import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("homepage reveals ship hidden and are revealed by script", () => {
  const outputPath = ["out/index.html", "out/index/index.html"].find(existsSync);
  assert.ok(outputPath, "expected a static homepage");
  const html = readFileSync(outputPath, "utf8");

  // AnimatedContent renders its wrapper as `class="invisible ..."` and only reveals
  // it from JS. There are 8 <AnimatedContent> tags in source, but two of them sit
  // inside .map() calls, so the homepage renders 12 wrappers:
  //   Work    1 heading + 3 projects   = 4
  //   Skills  1 heading + 3 skillAreas = 4
  //   About   1 + 1                    = 2
  //   Contact 1 + 1                    = 2
  // Asserting the exact count is deliberate — a >= threshold would pass while a
  // whole section was left unmigrated. If projects/skillAreas gain an entry this
  // number moves with them, and updating it here is the intended prompt to confirm
  // the new item actually animates.
  const hidden = html.match(/class="invisible/g) ?? [];
  assert.equal(
    hidden.length,
    12,
    `expected 12 hidden reveal wrappers on the homepage, found ${hidden.length}`
  );
});
