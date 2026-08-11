import type { MetadataRoute } from "next";
import { blogLastModified, blogPosts, postLastModified } from "@/lib/blog";
import { seoConfig, siteContentRevised } from "@/lib/seo";
import { projects } from "@/lib/site-content";

export const dynamic = "force-static";

/**
 * `changefreq` and `priority` are deliberately absent: Google ignores both, and
 * `priority` reads as a ranking lever it has never been.
 *
 * Every `lastmod` here is derived from content, never from the build clock, so
 * rebuilding without editing content produces an identical sitemap. A `lastmod`
 * that moves on every deploy is one Google learns to discard.
 */
const absolute = (path: string) => `${seoConfig.siteUrl}${path}`;

const projectImages = projects.map((project) => absolute(project.image));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: seoConfig.siteUrl,
      lastModified: siteContentRevised,
      images: projectImages,
    },
    {
      url: absolute("/blog"),
      lastModified: blogLastModified,
    },
    ...blogPosts.map((post) => ({
      url: absolute(`/blog/${post.slug}`),
      lastModified: postLastModified(post),
    })),
  ];
}
