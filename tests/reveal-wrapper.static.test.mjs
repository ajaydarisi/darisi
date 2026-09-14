import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

test("homepage content and project journeys are present before hydration", () => {
  const html = readFileSync("out/index.html", "utf8");
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  const wrappers = [...markup.matchAll(/<div\b[^>]*data-reveal=""[^>]*>/g)].map(match => match[0]);
  assert.ok(wrappers.length > 0, "expected enhanced section wrappers");
  for (const wrapper of wrappers) {
    assert.doesNotMatch(wrapper, /\binvisible\b|opacity:\s*0|visibility:\s*hidden|\bhidden[= >]/);
  }
  for (const id of ["bfg", "devmarket", "texledger"]) {
    assert.match(markup, new RegExp(`<article[^>]*id="${id}"`));
    assert.match(markup, new RegExp(`href="#${id}"`));
  }
  for (const slug of ["bilingual-jewelry-storefront-razorpay", "designing-two-sided-marketplace"]) {
    assert.match(markup, new RegExp(`href="/blog/${slug}"`));
    assert.ok(existsSync(`out/blog/${slug}.html`));
  }
  assert.match(markup, /3<\/strong> shipped projects/);
  assert.match(markup, /2<\/strong> public products/);
  assert.doesNotMatch(markup, /2024—25/);
  assert.match(markup, /Email Ajay/);
  assert.match(markup, /role="status"/);
});

test("project structured data points to the available evidence", () => {
  const html = readFileSync("out/index.html", "utf8");
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const work = data["@graph"].find(node => node["@type"] === "ItemList");
  assert.deepEqual(work.itemListElement.map(entry => entry.item.url), [
    "https://darisi.in/blog/bilingual-jewelry-storefront-razorpay",
    "https://darisi.in/blog/designing-two-sided-marketplace",
    "https://darisi.in/#texledger",
  ]);
});

test("case studies have intrinsic imagery and mobile contents before the body", () => {
  for (const [slug, image] of [
    ["bilingual-jewelry-storefront-razorpay", "bfg"],
    ["designing-two-sided-marketplace", "devmarket"],
  ]) {
    const html = readFileSync(`out/blog/${slug}.html`, "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    assert.ok(html.indexOf("<details") < html.indexOf('class="blog-prose'));
    assert.match(html, /<summary\b/);
    const img = html.match(new RegExp(`<img[^>]*src="/screenshots/${image}\\.webp"[^>]*>`))?.[0];
    assert.ok(img, "expected case-study screenshot");
    assert.match(img, /width="1352"/);
    assert.match(img, /height="748"/);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, "ids must be unique");
    for (const match of html.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(ids.includes(match[1]), `missing contents target: ${match[1]}`);
    }
  }
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
