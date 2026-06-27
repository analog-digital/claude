/**
 * Server-side CMS / CRM data access (Cloudflare D1).
 *
 * The public site reads page content through getContent(), which overlays any
 * rows saved in the `sections` table on top of the bundled defaults from
 * lib/content.ts. The admin UI uses the section/submission/client helpers.
 *
 * All functions here are server-only — they reach the D1 binding via the
 * OpenNext Cloudflare context.
 */
import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  HERO,
  BOX_SIZES,
  HOW_IT_WORKS,
  SERVICES,
  BOOK_STEPS,
  STORY,
  PARTNERS,
  FAQS,
  TESTIMONIALS,
  FINAL_CTA,
  QUOTE_FORM,
} from "./content";
import { BOXES_FOR_RENT_DEFAULTS, type BoxesForRentContent } from "./boxes-for-rent-content";

/** Worker env: generated D1/ASSETS bindings plus the secrets we set via
 *  `wrangler secret put` (not present in wrangler.jsonc, so typed here). */
export type AppEnv = {
  DB: D1Database;
  ADMIN_PASSWORD?: string;
  SESSION_SECRET?: string;
  // Stripe — placeholders for now; billing stays disabled until real keys are set.
  STRIPE_SECRET_KEY?: string;
  STRIPE_PUBLISHABLE_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
};

export function getEnv(): AppEnv {
  return getCloudflareContext().env as unknown as AppEnv;
}

/** D1 handle, or undefined when running outside the Worker (e.g. build). */
export function getDB(): D1Database | undefined {
  try {
    return getEnv().DB;
  } catch {
    return undefined;
  }
}

// ── Content sections ───────────────────────────────────────────────────────

export type Content = {
  hero: typeof HERO;
  box_sizes: typeof BOX_SIZES;
  how_it_works: typeof HOW_IT_WORKS;
  services: typeof SERVICES;
  book_steps: typeof BOOK_STEPS;
  story: typeof STORY;
  partners: typeof PARTNERS;
  faqs: typeof FAQS;
  testimonials: typeof TESTIMONIALS;
  final_cta: typeof FINAL_CTA;
  quote_form: typeof QUOTE_FORM;
};

export type SectionKey = keyof Content;

export const DEFAULT_CONTENT: Content = {
  hero: HERO,
  box_sizes: BOX_SIZES,
  how_it_works: HOW_IT_WORKS,
  services: SERVICES,
  book_steps: BOOK_STEPS,
  story: STORY,
  partners: PARTNERS,
  faqs: FAQS,
  testimonials: TESTIMONIALS,
  final_cta: FINAL_CTA,
  quote_form: QUOTE_FORM,
};

/**
 * Combined default lookup across every editable page. The home/rentals pages use
 * the keys in DEFAULT_CONTENT; the /boxes-for-rent page (built from Figma) uses
 * the independent `bfr_*` keys in BOXES_FOR_RENT_DEFAULTS.
 */
const ALL_DEFAULTS: Record<string, unknown> = {
  ...DEFAULT_CONTENT,
  ...BOXES_FOR_RENT_DEFAULTS,
};

/** Ordered list of editable sections for the admin Content tab, grouped by page. */
export const SECTION_LIST: { key: string; label: string; blurb: string; group: string }[] = [
  { key: "hero", label: "Hero", blurb: "Top banner: heading, subheading, CTAs, feature cards.", group: "Home & Rentals pages" },
  { key: "box_sizes", label: "Box Sizes", blurb: "“Our box sizes available” cards and legend.", group: "Home & Rentals pages" },
  { key: "how_it_works", label: "How It Works", blurb: "Intro copy, paragraphs and image.", group: "Home & Rentals pages" },
  { key: "services", label: "Services", blurb: "“Services available” cards with pricing.", group: "Home & Rentals pages" },
  { key: "book_steps", label: "Book Your Rental", blurb: "Four booking steps + inquiry form options.", group: "Home & Rentals pages" },
  { key: "story", label: "Our Story", blurb: "“How it all began” block.", group: "Home & Rentals pages" },
  { key: "partners", label: "Partners", blurb: "“Trusted by our happy partners” logos.", group: "Home & Rentals pages" },
  { key: "faqs", label: "FAQ", blurb: "Frequently asked questions.", group: "Home & Rentals pages" },
  { key: "testimonials", label: "Testimonials", blurb: "Reviews, rating and image.", group: "Home & Rentals pages" },
  { key: "final_cta", label: "Final CTA", blurb: "Closing “Box It Up Today” call to action.", group: "Home & Rentals pages" },
  { key: "quote_form", label: "Request a Quote Form", blurb: "The /inquire-today step-by-step form: heading, every question, options & messages.", group: "Home & Rentals pages" },

  // /boxes-for-rent page (Figma "RentalPage") — independent content set.
  { key: "bfr_hero", label: "Hero", blurb: "Heading, subheading, background image, feature cards, CTA.", group: "Boxes For Rent page" },
  { key: "bfr_box_sizes", label: "Box Sizes Carousel", blurb: "Carousel cards (pricing, dimensions, availability, rating, gallery link) + legend.", group: "Boxes For Rent page" },
  { key: "bfr_how_it_works", label: "How It Works", blurb: "Label, subheading, description, image, button labels.", group: "Boxes For Rent page" },
  { key: "bfr_services", label: "Services", blurb: "Three service cards with access badges + Learn More.", group: "Boxes For Rent page" },
  { key: "bfr_book_rental", label: "Book Your Rental", blurb: "Step badges + box/plan selector + button labels.", group: "Boxes For Rent page" },
  { key: "bfr_story", label: "Our Story", blurb: "“How it all began” block.", group: "Boxes For Rent page" },
  { key: "bfr_partners", label: "Partners", blurb: "“Trusted by our happy partners” logos.", group: "Boxes For Rent page" },
  { key: "bfr_faqs", label: "FAQ", blurb: "Accordion questions & answers.", group: "Boxes For Rent page" },
  { key: "bfr_testimonials", label: "Testimonials", blurb: "Reviews, rating and image.", group: "Boxes For Rent page" },
  { key: "bfr_final_cta", label: "Final CTA", blurb: "Closing “Box It Up Today” call to action.", group: "Boxes For Rent page" },
];

/** Full site content: defaults overlaid with any saved section rows. */
export async function getContent(): Promise<Content> {
  const db = getDB();
  const content: Content = { ...DEFAULT_CONTENT };
  if (!db) return content;
  try {
    const { results } = await db
      .prepare("SELECT key, data FROM sections")
      .all<{ key: string; data: string }>();
    for (const row of results ?? []) {
      if (row.key in content) {
        try {
          (content as Record<string, unknown>)[row.key] = JSON.parse(row.data);
        } catch {
          /* keep default on parse error */
        }
      }
    }
  } catch {
    /* table missing / db unavailable → defaults */
  }
  return content;
}

/** A single section's current value (saved override or bundled default). */
export async function getSection(key: string): Promise<unknown> {
  const db = getDB();
  if (db) {
    try {
      const row = await db
        .prepare("SELECT data FROM sections WHERE key = ?")
        .bind(key)
        .first<{ data: string }>();
      if (row?.data) return JSON.parse(row.data);
    } catch {
      /* fall through to default */
    }
  }
  return ALL_DEFAULTS[key];
}

/** Read a group of `bfr_*` sections, overlaying saved rows on the defaults. */
export async function getBoxesForRentContent(): Promise<BoxesForRentContent> {
  const db = getDB();
  const content: BoxesForRentContent = { ...BOXES_FOR_RENT_DEFAULTS };
  if (!db) return content;
  try {
    const { results } = await db
      .prepare("SELECT key, data FROM sections WHERE key LIKE 'bfr_%'")
      .all<{ key: string; data: string }>();
    for (const row of results ?? []) {
      if (row.key in content) {
        try {
          (content as Record<string, unknown>)[row.key] = JSON.parse(row.data);
        } catch {
          /* keep default on parse error */
        }
      }
    }
  } catch {
    /* table missing / db unavailable → defaults */
  }
  return content;
}

export async function saveSection(key: string, data: unknown, updatedBy = "admin") {
  const db = getDB();
  if (!db) throw new Error("Database unavailable");
  await db
    .prepare(
      `INSERT INTO sections (key, data, updated_at, updated_by)
       VALUES (?, ?, datetime('now'), ?)
       ON CONFLICT(key) DO UPDATE SET data = excluded.data,
         updated_at = excluded.updated_at, updated_by = excluded.updated_by`
    )
    .bind(key, JSON.stringify(data), updatedBy)
    .run();
}

export async function resetSection(key: string) {
  const db = getDB();
  if (!db) throw new Error("Database unavailable");
  await db.prepare("DELETE FROM sections WHERE key = ?").bind(key).run();
}

// ── Form submissions ───────────────────────────────────────────────────────

export type Submission = {
  id: number;
  created_at: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  box_size: string | null;
  service: string | null;
  message: string | null;
  source: string | null;
  status: string;
  raw: string | null;
};

export async function createSubmission(input: {
  name?: string;
  email?: string;
  phone?: string;
  box_size?: string;
  service?: string;
  message?: string;
  source?: string;
  raw?: unknown;
}) {
  const db = getDB();
  if (!db) throw new Error("Database unavailable");
  const res = await db
    .prepare(
      `INSERT INTO submissions (name, email, phone, box_size, service, message, source, raw)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      input.name ?? null,
      input.email ?? null,
      input.phone ?? null,
      input.box_size ?? null,
      input.service ?? null,
      input.message ?? null,
      input.source ?? null,
      input.raw ? JSON.stringify(input.raw) : null
    )
    .run();
  return res.meta.last_row_id as number;
}

export async function listSubmissions(): Promise<Submission[]> {
  const db = getDB();
  if (!db) return [];
  const { results } = await db
    .prepare("SELECT * FROM submissions ORDER BY created_at DESC, id DESC")
    .all<Submission>();
  return results ?? [];
}

export async function updateSubmissionStatus(id: number, status: string) {
  const db = getDB();
  if (!db) throw new Error("Database unavailable");
  await db.prepare("UPDATE submissions SET status = ? WHERE id = ?").bind(status, id).run();
}

export async function getSubmission(id: number): Promise<Submission | null> {
  const db = getDB();
  if (!db) return null;
  return (
    (await db.prepare("SELECT * FROM submissions WHERE id = ?").bind(id).first<Submission>()) ?? null
  );
}

// ── Clients (platform / onboarding) ──────────────────────────────────────────

export type Client = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  plan: string | null;
  box_size: string | null;
  monthly_amount_cents: number | null;
  status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  submission_id: number | null;
  notes: string | null;
};

export async function listClients(): Promise<Client[]> {
  const db = getDB();
  if (!db) return [];
  const { results } = await db
    .prepare("SELECT * FROM clients ORDER BY created_at DESC, id DESC")
    .all<Client>();
  return results ?? [];
}

export async function createClient(input: {
  name: string;
  email: string;
  phone?: string;
  plan?: string;
  box_size?: string;
  monthly_amount_cents?: number;
  status?: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  submission_id?: number;
  notes?: string;
}) {
  const db = getDB();
  if (!db) throw new Error("Database unavailable");
  const res = await db
    .prepare(
      `INSERT INTO clients
        (name, email, phone, plan, box_size, monthly_amount_cents, status,
         stripe_customer_id, stripe_subscription_id, submission_id, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      input.name,
      input.email,
      input.phone ?? null,
      input.plan ?? null,
      input.box_size ?? null,
      input.monthly_amount_cents ?? null,
      input.status ?? "pending",
      input.stripe_customer_id ?? null,
      input.stripe_subscription_id ?? null,
      input.submission_id ?? null,
      input.notes ?? null
    )
    .run();
  return res.meta.last_row_id as number;
}

export async function updateClientStatus(id: number, status: string) {
  const db = getDB();
  if (!db) throw new Error("Database unavailable");
  await db.prepare("UPDATE clients SET status = ? WHERE id = ?").bind(status, id).run();
}
