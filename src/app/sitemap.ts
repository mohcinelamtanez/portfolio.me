import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// The portfolio is a single page: search engines ignore #anchors, so only the home page is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
