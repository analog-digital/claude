# Box It Up Storage — Website + Portal

Rebuild of [boxitupstorage.ca](https://www.boxitupstorage.ca) as a fast,
SEO-friendly, server-rendered site on **Next.js + Cloudflare**, with room to
grow into a customer **portal** (signup → payments → CRM database).

## Stack

| Concern        | Choice                                              |
| -------------- | --------------------------------------------------- |
| Framework      | Next.js 16 (App Router, TypeScript, Tailwind v4)    |
| Rendering/SEO  | Server-rendered HTML + JSON-LD structured data      |
| Hosting        | Cloudflare Workers via `@opennextjs/cloudflare`     |
| Database (CRM) | Cloudflare **D1** (planned)                         |
| File storage   | Cloudflare **R2** (planned)                         |
| Payments       | Stripe (planned)                                    |

No Supabase — per request, persistence is Cloudflare D1.

## Status — ⚠️ content pending

The marketing pages are **scaffolds with placeholder copy/imagery**. The live
site could not be scraped from the build environment (egress policy returns
`403` for `boxitupstorage.ca`). To finish the exact 1:1 rebuild we need the
real source — see "Getting the exact content" below.

What's real and working now:

- ✅ Next.js + Cloudflare build pipeline (`npm run build`, `npm run deploy`)
- ✅ Server-rendered pages, crawlable without JS
- ✅ SEO infrastructure: per-page metadata, Open Graph, canonical URLs,
  `robots.txt`, `sitemap.xml`, and `SelfStorage`/`LocalBusiness` + `WebSite` +
  `BreadcrumbList` JSON-LD structured data
- ✅ URL slugs preserved (`/rental-new`) to retain existing search rankings
- ✅ Central brand tokens (`app/globals.css`) and site config (`lib/site.ts`)
  so exact colors/fonts/NAP swap in one place

What's placeholder (clearly marked `TODO` / `PLACEHOLDER` in code):

- ❌ Exact copy, headings, imagery (WordPress media URLs)
- ❌ Exact brand colors, fonts, font sizes, logo
- ❌ Verified NAP (name/address/phone), pricing, unit sizes

## Getting the exact content

The live site is blocked by this environment's network policy. To unblock,
either:

1. **Loosen the network policy** to allow `boxitupstorage.ca`, then start a
   **new session** (egress policy is fixed when the container boots, so it must
   be a fresh session), and the pages can be scraped directly; or
2. **Provide the source** — paste each page's View-Source HTML + stylesheet, or
   drop a WordPress export / "Save Page As → Complete" folder into the repo.

Once available, update `lib/site.ts`, `app/globals.css` (brand tokens), and the
two page components with the exact content/assets.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run preview      # build + run on the Cloudflare Workers runtime locally
npm run deploy       # build + deploy to Cloudflare Workers
```

## Roadmap — portal (phase 2)

1. **Signup form** → write lead to D1 (`customers` table).
2. **Payments** → Stripe Checkout / Payment Element; webhook records payment.
3. **CRM** → admin views over D1 (customers, units, payments, status).

Cloudflare bindings for D1/R2 and Stripe secrets are stubbed in
`wrangler.jsonc`, ready to enable.

## Project layout

```
app/
  layout.tsx        # root layout, site-wide metadata + JSON-LD
  page.tsx          # home (scaffold)
  rental-new/       # service/rentals page (slug preserved)
  robots.ts         # robots.txt
  sitemap.ts        # sitemap.xml
components/
  SiteHeader.tsx  SiteFooter.tsx  JsonLd.tsx
lib/
  site.ts           # single source of truth: NAP, nav, SEO config
wrangler.jsonc      # Cloudflare Workers config (+ D1/R2 stubs)
open-next.config.ts # OpenNext → Cloudflare adapter config
```
