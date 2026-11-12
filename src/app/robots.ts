import type { MetadataRoute } from "next";
import { isPreviewDeploy, siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // Permit crawling so preview pages' noindex metadata can be read.
    sitemap: isPreviewDeploy ? undefined : `${siteUrl}/sitemap.xml`,
  };
}
