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

test("homepage includes wordmarks in Hero and Footer", () => {
  const outputPath = ["out/index.html", "out/index/index.html"].find(existsSync);
  assert.ok(outputPath, "expected a static homepage");
  const html = readFileSync(outputPath, "utf8");
  const wordmarks = html.match(/<span\b[^>]*darisi-wordmark[^>]*><\/span>/g) ?? [];

  assert.equal(
    wordmarks.length,
    3,
    "expected Hero, Story, and Footer wordmarks"
  );
  assert.equal(
    wordmarks.filter((wordmark) => wordmark.includes('aria-hidden="true"')).length,
    2,
    "expected Hero and Footer wordmarks to be decorative"
  );
});

test("Hero wordmark retains its accent dot", () => {
  const outputPath = ["out/index.html", "out/index/index.html"].find(existsSync);
  assert.ok(outputPath, "expected a static homepage");
  const html = readFileSync(outputPath, "utf8");
  const heroHeading = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/)?.[0] ?? "";

  assert.match(heroHeading, /darisi-wordmark\.svg/);
});

test("source logo assets include their contrast dots", () => {
  const logo = readFileSync(new URL("../public/logo.svg", import.meta.url), "utf8");
  const icon = readFileSync(new URL("../public/icon.svg", import.meta.url), "utf8");
  const wordmark = readFileSync(
    new URL("../public/darisi-wordmark.svg", import.meta.url),
    "utf8"
  );

  assert.match(logo, /<circle cx="427" cy="416" r="40" fill="#914D30"\s*\/>/);
  assert.match(
    wordmark,
    /<circle cx="872\.433402" cy="187\.10835" r="20" fill="#914D30"\s*\/>/
  );
  assert.match(icon, /<circle cx="427" cy="416" r="40" fill="#914D30"\s*\/>/);
});

test("BrandMark renders each logo as a single themed mask", () => {
  const source = readFileSync(
    new URL("../src/components/ui/brand-mark.tsx", import.meta.url),
    "utf8"
  );

  assert.equal((source.match(/<span/g) ?? []).length, 1);
  assert.doesNotMatch(source, /dotClassName|data-brand-dot/);
  assert.match(
    source,
    /linear-gradient\(to right, currentColor 0 62\.5%, var\(--logo-dot\) 62\.5% 100%\)/
  );
  assert.match(
    source,
    /linear-gradient\(to right, currentColor 0 92\.048%, var\(--logo-dot\) 92\.048% 100%\)/
  );
});

test("the embedded dots use one shared orange treatment", () => {
  const brandMark = readFileSync(
    new URL("../src/components/ui/brand-mark.tsx", import.meta.url),
    "utf8"
  );

  assert.match(brandMark, /var\(--logo-dot\)/);
  for (const source of [
    "../src/components/sections/Navbar.tsx",
    "../src/components/sections/Story.tsx",
    "../src/components/blog/post-layout.tsx",
  ]) {
    assert.doesNotMatch(readFileSync(new URL(source, import.meta.url), "utf8"), /--brand-dot/);
  }
});

test("Story and Navbar reverse their logo dots against the page theme", () => {
  const styles = readFileSync(
    new URL("../src/app/globals.css", import.meta.url),
    "utf8"
  );

  assert.match(styles, /\.story-feature\s*\{[\s\S]*?--logo-dot: #DDA082;/);
  assert.match(
    styles,
    /html\[data-theme="dark"\] \.story-feature\s*\{[\s\S]*?--logo-dot: #914D30;/
  );
  assert.match(styles, /\.brand-nav\s*\{[\s\S]*?--logo-dot: #DDA082;/);
  assert.match(
    styles,
    /html\[data-theme="dark"\] \.brand-nav\s*\{[\s\S]*?--logo-dot: #914D30;/
  );
  assert.match(styles, /\.brand-feature\s*\{[\s\S]*?--logo-dot: #DDA082;/);
});
