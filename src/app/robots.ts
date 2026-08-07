import type { MetadataRoute } from "next";
import { seoConfig } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The static export writes an RSC payload beside every route
      // (`index.txt`, `blog.txt`, per-post, plus `__next.*`). A static host
      // serves those as text/plain, making them crawlable near-duplicates of
      // every page. They have to keep existing for client-side navigation, so
      // block crawling instead of removing them.
      //
      // `/_next/` stays crawlable on purpose: it holds the CSS and JS Google
      // needs in order to render the pages.
      disallow: "/*.txt$",
    },
    sitemap: `${seoConfig.siteUrl}/sitemap.xml`,
  };
}
