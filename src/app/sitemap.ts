import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { blogPosts } from "@/lib/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = [
    "",
    "#about",
    "#experience",
    "#stack",
    "#projects",
    "#github",
    "#certifications",
    "#blog",
    "#contact",
  ].map((path) => ({
    url: `${siteConfig.url}/${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const posts = blogPosts
    .filter((p) => !p.externalUrl)
    .map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }));

  return [...sections, ...posts];
}
