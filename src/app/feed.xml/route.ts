import { blogLastModified, blogPosts, postLastModified } from "@/lib/blog";
import { blogIndexDescription, blogIndexTitle } from "@/lib/blog";
import { seoConfig } from "@/lib/seo";

// Required for `output: "export"`, same as sitemap.ts and robots.ts.
export const dynamic = "force-static";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** RFC 822, which is what RSS 2.0 requires — not ISO 8601. */
const rfc822 = (date: string) =>
  new Date(`${date}T00:00:00Z`).toUTCString();

export function GET() {
  const items = blogPosts
    .map((post) => {
      const url = `${seoConfig.siteUrl}/blog/${post.slug}`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description)}</description>
      <category>${escape(post.tag)}</category>
      <pubDate>${rfc822(postLastModified(post))}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(blogIndexTitle)}</title>
    <link>${seoConfig.siteUrl}/blog</link>
    <description>${escape(blogIndexDescription)}</description>
    <language>${seoConfig.language}</language>
    <managingEditor>${seoConfig.contactEmail} (${escape(seoConfig.personName)})</managingEditor>
    <lastBuildDate>${rfc822(blogLastModified)}</lastBuildDate>
    <atom:link href="${seoConfig.siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
