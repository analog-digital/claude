import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext → Cloudflare Workers adapter config.
 * Incremental cache / tag cache can be wired to KV or D1 here later when the
 * portal needs ISR/revalidation. Defaults are fine for the static marketing
 * site for now.
 */
export default defineCloudflareConfig({});
