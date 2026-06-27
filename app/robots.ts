import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Portal/account routes will be added here as disallow once they exist.
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
