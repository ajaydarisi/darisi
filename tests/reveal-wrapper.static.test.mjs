import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("homepage reveals ship hidden and are revealed by script", () => {
  const outputPath = ["out/index.html", "out/index/index.html"].find(existsSync);
  assert.ok(outputPath, "expected a static homepage");
  const html = readFileSync(outputPath, "utf8");

  // AnimatedContent renders its wrapper as `class="invisible ..."` and only reveals
  // it from JS. Hero and Contact don't use it (Hero fills the first viewport
  // and has nothing to reveal on scroll; Contact is a short closing CTA); Work,
  // Story, and Notes do, and each has literal + mapped instances:
  //   Work   1 heading + 3 projects              = 4
  //   Story  1 heading + 1 intro + 3 values + 3 skillAreas = 8
  //   Notes  1 heading + 5 posts                 = 6
  // Asserting the exact count is deliberate — a >= threshold would pass while a
  // whole section was left unmigrated. If projects/values/skillAreas/blogPosts
  // gain an entry this number moves with them, and updating it here is the
  // intended prompt to confirm the new item actually animates.
  const hidden = html.match(/class="invisible/g) ?? [];
  assert.equal(
    hidden.length,
    18,
    `expected 18 hidden reveal wrappers on the homepage, found ${hidden.length}`
  );
});
