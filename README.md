# Box It Up Storage — Website + CMS

Rebuild of [boxitupstorage.ca](https://www.boxitupstorage.ca) as a fast,
SEO-friendly, server-rendered site on **Next.js + Cloudflare**, with a built-in
**CMS / CRM** backend (content editing, form submissions, client onboarding)
and room to grow into a full customer platform (payments → billing).

Live: <https://boxitup-storage.atif-a86.workers.dev>

## Stack

| Concern        | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | Next.js 16 (App Router, TypeScript, Tailwind v4)    |
| Rendering/SEO  | Server-rendered HTML + JSON-LD structured data      |
| Hosting        | Cloudflare Workers via `@opennextjs/cloudflare`     |
| Database       | Cloudflare **D1** (SQLite) — binding `DB`           |
| Auth (admin)   | Single password → HMAC-signed session cookie        |
| Payments       | Stripe (scaffolded — data model + admin ready)      |

> The Supabase project in `.mcp.json` is **unreachable** from the build/deploy
> environment (network policy returns `502` for `*.supabase.co`), so the CMS
> uses Cloudflare D1 — native to the Worker and pre-planned in `wrangler.jsonc`.

## CMS / Admin

The admin backend lives at **`/admin`** (sign in at `/admin/login`).

- **Content** — edit every section of the home & `/rental-new` page (hero, box
  sizes, how-it-works, services, booking steps, story, partners, FAQ,
  testimonials, final CTA). A structured editor renders fields, repeatable list
  items (add/remove/reorder), and nested groups. **Saves go live instantly** —
  the public pages read content from D1 at request time, falling back to the
  bundled defaults in `lib/content.ts`. "Reset to default" removes the override.
- **Submissions** — every "Request a Quote" inquiry from the site is stored and
  listed here, with a status workflow (new → contacted → won → archived).
- **Clients** — onboarded storage clients with billing status. Manual onboarding
  works today; the data model carries `stripe_customer_id` /
  `stripe_subscription_id` so the public card-capture flow can populate it later.

### Admin secrets

Set as Worker secrets (`npx wrangler secret put <NAME>`):

| Secret           | Purpose                                  |
| ---------------- | ---------------------------------------- |
| `ADMIN_PASSWORD` | Admin login password                     |
| `SESSION_SECRET` | HMAC key for signing the session cookie  |

Change the password any time with `npx wrangler secret put ADMIN_PASSWORD`.

## Database

Schema lives in `migrations/0001_init.sql` (`sections`, `submissions`,
`clients`). Apply with:

```bash
npx wrangler d1 migrations apply boxitup-cms --remote
```

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run preview      # build + run on the Cloudflare Workers runtime locally
npm run deploy       # build + deploy to Cloudflare Workers
npm run cf-typegen   # regenerate cloudflare-env.d.ts after editing wrangler.jsonc
```

## Roadmap — live payments (next phase)

The clients data model and admin UI are in place. To turn on real billing:

1. Add `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` as Worker secrets.
2. Add a public onboarding route that collects card details via Stripe
   Elements/Checkout, creates a Customer + Subscription, and inserts a `clients`
   row (linked to the originating submission).
3. Add a Stripe webhook route (`/api/stripe/webhook`) that keeps client
   `status` and `stripe_*` fields in sync (active / past_due / canceled).

## Project layout

```
app/
  page.tsx                  # home — reads content from CMS
  rental-new/page.tsx       # rentals page (same template, different hero)
  api/inquire/route.ts      # public form submission endpoint → D1
  admin/
    login/page.tsx          # sign in
    actions.ts              # server actions (auth + CRUD)
    (dash)/                 # guarded admin shell
      page.tsx              # overview
      content/[key]/        # section editor
      submissions/          # leads
      clients/              # clients / onboarding
components/
  Hero.tsx  MainSections.tsx  BookRentalTabs.tsx   # public sections
  admin/                    # SectionEditor, AdminNav, forms, StatusSelect
lib/
  content.ts                # default content + types (CMS fallback)
  cms.ts                    # D1 data access (sections, submissions, clients)
  auth.ts                   # admin session auth
  site.ts                   # NAP, nav, SEO config
migrations/0001_init.sql    # D1 schema
wrangler.jsonc              # Cloudflare Workers config (+ D1 binding)
```
