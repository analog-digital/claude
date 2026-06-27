/**
 * Stripe configuration — PLACEHOLDER for now.
 *
 * Billing is intentionally disabled until real keys are provided. The keys are
 * read from Worker secrets (STRIPE_SECRET_KEY / STRIPE_PUBLISHABLE_KEY /
 * STRIPE_WEBHOOK_SECRET); a "PLACEHOLDER" value (or an unset / non-`sk_`/`pk_`
 * value) is treated as not configured, so nothing attempts to charge a card.
 *
 * To go live later:
 *   npx wrangler secret put STRIPE_SECRET_KEY        # sk_live_… / sk_test_…
 *   npx wrangler secret put STRIPE_PUBLISHABLE_KEY   # pk_live_… / pk_test_…
 *   npx wrangler secret put STRIPE_WEBHOOK_SECRET    # whsec_…
 * then build the onboarding + webhook routes (see README roadmap).
 */
import "server-only";
import { getEnv } from "./cms";

const PLACEHOLDER = "PLACEHOLDER";

function isReal(value: string | undefined, prefix: string): boolean {
  return !!value && value !== PLACEHOLDER && !value.includes(PLACEHOLDER) && value.startsWith(prefix);
}

export type StripeConfig = {
  configured: boolean;
  secretKey?: string;
  publishableKey?: string;
  webhookSecret?: string;
};

export function getStripeConfig(): StripeConfig {
  let env: ReturnType<typeof getEnv> | undefined;
  try {
    env = getEnv();
  } catch {
    return { configured: false };
  }
  const secretKey = env.STRIPE_SECRET_KEY;
  const publishableKey = env.STRIPE_PUBLISHABLE_KEY;
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET;
  // Considered "configured" only when the secret key looks like a real Stripe key.
  const configured = isReal(secretKey, "sk_");
  return { configured, secretKey, publishableKey, webhookSecret };
}

export function isStripeConfigured(): boolean {
  return getStripeConfig().configured;
}
