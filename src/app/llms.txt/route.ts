import { blogPosts } from "@/lib/blog";
import { seoConfig } from "@/lib/seo";
import { projects, skillAreas } from "@/lib/site-content";

// Required for `output: "export"`, same as sitemap.ts and robots.ts.
export const dynamic = "force-static";

/**
 * https://llmstxt.org — a short, link-first summary for AI crawlers.
 * Generated from the same content the pages render, so it cannot go stale.
 */
export function GET() {
  const url = (path: string) => `${seoConfig.siteUrl}${path}`;

  const body = `# ${seoConfig.personName}

> ${seoConfig.description}

${seoConfig.jobTitle} based in ${seoConfig.location.label}. This site is a personal
portfolio: selected work, how I work, and writing drawn from real product delivery.

## Work

${projects
  .map((p) => `- [${p.title}](${p.action?.href ?? url("/work")}): ${p.summary}`)
  .join("\n")}

## Focus areas

${skillAreas.map((a) => `- **${a.title}** — ${a.description} (${a.tools})`).join("\n")}

## Writing

${blogPosts
  .map((p) => `- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.description}`)
  .join("\n")}

## Pages

- [Home](${url("/")})
- [Selected work](${url("/work")})
- [Blog](${url("/blog")})
- [RSS feed](${url("/feed.xml")})

## Contact

- Email: ${seoConfig.contactEmail}
${seoConfig.sameAs.map((link) => `- ${link}`).join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
