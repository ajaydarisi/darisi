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
