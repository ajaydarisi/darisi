import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const siteUrl = "https://darisi.in";
const routes = [
  ["/", "out/index.html"],
  ["/blog", "out/blog.html"],
  ["/blog/async-projects-global-teams", "out/blog/async-projects-global-teams.html"],
  [
    "/blog/bilingual-jewelry-storefront-razorpay",
    "out/blog/bilingual-jewelry-storefront-razorpay.html",
  ],
  [
    "/blog/custom-internal-tools-vs-off-the-shelf",
    "out/blog/custom-internal-tools-vs-off-the-shelf.html",
  ],
  [
    "/blog/designing-two-sided-marketplace",
    "out/blog/designing-two-sided-marketplace.html",
  ],
  [
    "/blog/keycloak-vs-supabase-auth",
    "out/blog/keycloak-vs-supabase-auth.html",
  ],
];

function readOutput(file) {
  assert.ok(existsSync(file), `expected static output at ${file}`);
  return readFileSync(file, "utf8");
}

function headOf(html) {
  return html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
}

function values(head, expression) {
  return [...head.matchAll(expression)].map((match) => match[1]);
}

function jsonLdOf(html) {
  return JSON.parse(
    values(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)[0],
  )["@graph"];
}

test("every indexable page has complete, route-specific crawl and sharing metadata", () => {
  for (const [path, outputFile] of routes) {
    const html = readOutput(outputFile);
    const head = headOf(html);
    const canonical = `${siteUrl}${path === "/" ? "" : path}`;

    assert.equal(values(head, /<title>([\s\S]*?)<\/title>/g).length, 1, path);
    assert.equal(
      values(head, /<meta name="description" content="([^"]+)"/g).length,
      1,
      path,
    );
    assert.deepEqual(
      values(head, /<link rel="canonical" href="([^"]+)"/g),
      [canonical],
      path,
    );
    assert.equal(values(head, /<meta name="robots" content="([^" ]*noindex[^" ]*)"/g).length, 0, path);
    assert.deepEqual(
      values(head, /<meta property="og:url" content="([^"]+)"/g),
      [canonical],
      path,
    );
    assert.deepEqual(
      values(head, /<meta property="og:locale" content="([^"]+)"/g),
      ["en_US"],
      path,
    );
    assert.equal(values(head, /<meta property="og:image" content="([^"]+)"/g).length, 1, path);
    assert.equal(values(head, /<meta name="twitter:image" content="([^"]+)"/g).length, 1, path);
    const jsonLd = values(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    assert.equal(jsonLd.length, 1, path);
    assert.doesNotThrow(() => JSON.parse(jsonLd[0]), path);

    const graph = jsonLdOf(html);
    if (path.startsWith("/blog/")) {
      const article = graph.find((node) => node["@type"] === "BlogPosting");
      const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");

      assert.equal(article.url, canonical, path);
      assert.equal(article["@id"], `${canonical}/#article`, path);
      assert.equal(article.author["@id"], `${siteUrl}/#person`, path);
      assert.equal(article.isPartOf["@id"], `${siteUrl}/blog/#blog`, path);
      assert.equal(breadcrumb.itemListElement.length, 3, path);
    }
  }
});

test("article Open Graph metadata identifies the author by profile URL", () => {
  for (const [path, outputFile] of routes.filter(([path]) => path.startsWith("/blog/"))) {
    const head = headOf(readOutput(outputFile));
    assert.deepEqual(
      values(head, /<meta property="article:author" content="([^"]+)"/g),
      [siteUrl],
      path,
    );
  }
});

test("error documents never invite indexing", () => {
  for (const outputFile of ["out/404.html", "out/_not-found.html"]) {
    const head = headOf(readOutput(outputFile));
    const robots = values(head, /<meta name="robots" content="([^"]+)"/g);

    assert.ok(robots.some((value) => value.includes("noindex")), outputFile);
    assert.ok(!robots.some((value) => value.includes("index, follow")), outputFile);
    assert.equal(values(head, /<meta name="googlebot" content="([^"]+)"/g).length, 0, outputFile);
  }
});

test("the visual Hero wordmark retains a truthful text h1", () => {
  const html = readOutput("out/index.html");
  const heroHeading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? "";

  assert.match(heroHeading, /Ajay Darisi — Software Engineer/);
  assert.match(heroHeading, /darisi-wordmark\.svg/);
});

test("crawl artefacts are complete and obsolete wordmark output is absent", () => {
  const robots = readOutput("out/robots.txt");
  const sitemap = readOutput("out/sitemap.xml");
  const feed = readOutput("out/feed.xml");
  const feedSource = readFileSync("src/app/feed.xml/route.ts", "utf8");

  assert.match(robots, /Allow: \/llms\.txt/);
  assert.match(robots, /Disallow: \/\*\.txt\$/);
  assert.deepEqual(
    values(sitemap, /<loc>([^<]+)<\/loc>/g).toSorted(),
    routes.map(([path]) => `${siteUrl}${path === "/" ? "" : path}`).toSorted(),
  );
  assert.equal((feed.match(/<item>/g) ?? []).length, 5);
  assert.match(feed, /<atom:link [^>]*rel="self"[^>]*type="application\/rss\+xml"/);
  assert.match(feedSource, /<pubDate>\$\{rfc822\(post\.datePublished\)\}<\/pubDate>/);
  assert.ok(!existsSync("out/darisi-wordmark.png"));
});
