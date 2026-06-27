import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * XML sitemap. Add new public routes here as pages are rebuilt so Google can
 * discover and index them. Slugs mirror the existing WordPress URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/rental-new", priority: 0.9, changeFrequency: "weekly" as const },
    // TODO: add as rebuilt — /boxes-for-rent, /about, /contact
  ];

  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
