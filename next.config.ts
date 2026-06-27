import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // Allow next/image to optimize images served from the existing WordPress
    // media library while we reference them by URL (per the plan).
    remotePatterns: [
      { protocol: "https", hostname: "www.boxitupstorage.ca" },
      { protocol: "https", hostname: "boxitupstorage.ca" },
    ],
  },
};

export default nextConfig;

// Enables Cloudflare bindings (D1, R2, KV, env) during `next dev`.
// Safe no-op in production builds.
initOpenNextCloudflareForDev();
