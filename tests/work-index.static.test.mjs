import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("static build emits an accessible selected-work index", () => {
  const outputPath = ["out/work.html", "out/work/index.html"].find(existsSync);
  assert.ok(outputPath, "expected a static /work page");
  const html = readFileSync(outputPath, "utf8");
  assert.match(html, /A working index of useful things/);
  assert.match(html, /aria-pressed/);
  assert.match(html, /Bhagyalakshmi Future Gold/);
});
