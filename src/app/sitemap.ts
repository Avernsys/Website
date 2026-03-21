import type { MetadataRoute } from "next";
import { getIndexablePages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return getIndexablePages().map((page) => ({
    url: page.url,
    lastModified,
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : 0.8,
  }));
}
