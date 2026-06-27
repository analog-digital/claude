# GOVERNANCE — Security & Access Register

A living map of this project's tools, integrations, access, secrets, and data flows.
Purpose: a CIO / security / cyber reviewer can open this and understand the surface,
what's already handled, and where to start.

**This is a register, not a vault.** It records *where* secrets live and *who* has
access — never the secret values themselves. Keep it current: per CLAUDE.md §8, any
change to the security/access surface updates this file and the change register at
the bottom.

> Status legend: ✅ handled · ⚠️ needs review · ❓ unknown / needs owner input

> **Project:** Box It Up Storage — marketing site + CMS/CRM on Next.js 16 +
> Cloudflare Workers (OpenNext). First populated 2026-06-27.

---

## 1. Tools, services & integrations
What the project depends on or connects to, and what each can touch.

| Tool / Service | Purpose | Data it can access | Auth method | Owner | Status |
|----------------|---------|--------------------|-------------|-------|--------|
| Cloudflare Workers | Hosting + deploy of the site/CMS | Build output, runtime requests | `CLOUDFLARE_API_TOKEN` | atif@analog-digital.co | ✅ in use |
| Cloudflare D1 (`boxitup-cms`) | CMS/CRM database | Page content, form submissions (PII), clients (PII) | Worker binding `DB` | atif | ✅ in use |
| GitHub (`analog-digital/claude`) | Source repo + PRs (via MCP) | Repo files | GitHub App / MCP | atif | ⚠️ confirm repo is private |
| Supabase (`jvdpkfgdpbgfhytgolnq`) | Configured in `.mcp.json`; **unused** by the app + unreachable from this env | Would have full DB access (service_role) | **service_role key committed in `.mcp.json`** | atif | ⚠️ HIGH — see §7 |
| Stripe | Payments — **placeholder, inactive** | None yet (no card data collected) | `STRIPE_*` Worker secrets (placeholder) | atif | ⚠️ pending real keys |
| Google Fonts (next/font) | Build-time font (Jost) fetch | None | n/a | — | ✅ |
| WordPress media (`boxitupstorage.ca`) | Images referenced by URL on public pages | Public images only | none | — | ✅ |
| Figma (MCP connector) | Design source for design-to-code (read-only) | Figma design files the account can see | Figma account / MCP | atif | ✅ read-only |
| YouTube embed | Hero background video | None (public embed) | none | — | ✅ |

## 2. Access & permissions
Who and what has access, and at what scope. Aim for least privilege.

| Identity / Role | What it can access | Scope / permission level | Notes | Status |
|-----------------|--------------------|--------------------------|-------|--------|
| Site admin (`/admin`) | Edit all content; view/manage submissions & clients (PII) | Single shared password → signed session cookie | No per-user accounts, no MFA, no audit log | ⚠️ partial |
| Cloudflare API token | Deploy Worker, manage D1 + secrets | Account-scoped deploy token | Confirm it's least-privilege (Workers/D1 only) | ⚠️ review scope |
| Supabase service_role token | Full DB access, **bypasses RLS** | Maximum (admin) | Token committed in `.mcp.json`; over-privileged + exposed | ⚠️ HIGH — see §7 |

## 3. Secrets & configuration
Where secrets live — **names and storage location only, never values.**

| Secret / Key (name) | Used for | Where it's stored | Rotation cadence | Status |
|---------------------|----------|-------------------|------------------|--------|
| `ADMIN_PASSWORD` | Admin login | Cloudflare Worker secret | ❓ set policy | ✅ in store |
| `SESSION_SECRET` | Sign admin session cookie (HMAC) | Cloudflare Worker secret | ❓ | ✅ in store |
| `STRIPE_SECRET_KEY` | Payments (inactive) | Cloudflare Worker secret (placeholder value) | n/a yet | ⚠️ placeholder |
| `STRIPE_PUBLISHABLE_KEY` | Payments (inactive) | Cloudflare Worker secret (placeholder) | n/a yet | ⚠️ placeholder |
| `STRIPE_WEBHOOK_SECRET` | Verify Stripe webhooks (inactive) | Cloudflare Worker secret (placeholder) | n/a yet | ⚠️ placeholder |
| `CLOUDFLARE_API_TOKEN` | Deploy | Provided via env at deploy time (not committed) | ❓ | ⚠️ confirm storage |
| Supabase `service_role` key | Supabase admin (unused) | **Committed in `.mcp.json`** | — | ⚠️ VIOLATION — rotate + remove (§7) |

- Secret storage location: Cloudflare Worker secret store for app secrets; local dev
  via `.dev.vars` (gitignored). `.dev.vars.example` is committed with **placeholders only**.
- `.env` / credentials excluded from git? ✅ `.gitignore` covers `.env*`, `.dev.vars*`
  (with `.dev.vars.example` intentionally tracked) and `cloudflare-env.d.ts`.
  **Exception:** the Supabase service_role key in `.mcp.json` is committed (§7).

## 4. Dependencies & supply chain
| Question | Answer / Status |
|----------|-----------------|
| How are dependencies tracked? | ✅ npm + `package-lock.json` |
| Automated vulnerability scanning? | ⚠️ none configured. `npm audit` reports **4 moderate** advisories (2026-06-27). |
| Review cadence for updates | ❓ none set — recommend Dependabot or `npm audit` in CI |

## 5. Data flows & sensitivity
Where data goes, and whether any of it is personal/customer/sensitive.

| Data type | Sensitivity | Where it flows (in → store → out) | Third parties | Status |
|-----------|-------------|-----------------------------------|---------------|--------|
| Visitor contact info (name/email/phone/message) | PII | Public forms `/inquire-today` + `/boxes-for-rent` selector → `POST /api/inquire` → D1 `submissions` → admin views | Cloudflare | ⚠️ no access logging; define retention |
| Client records (name/email/phone/plan/amount) | PII | Admin onboarding → D1 `clients` | Cloudflare | ⚠️ no access logging |
| Payment / card data | Sensitive | **Not collected** (Stripe inactive). When live, must go directly to Stripe; never store card data in D1 | Stripe (future) | ⚠️ design constraint |

## 6. External / network access
Anything that calls out of the environment or sends data off-machine.

| What | Destination | Data sent | Why | Status |
|------|-------------|-----------|-----|--------|
| Runtime (Worker) | — | none | Content served from D1 binding; no outbound calls currently | ✅ |
| Build | Google Fonts, npm registry | none sensitive | Fonts + deps | ✅ |
| Browser (public pages) | YouTube, `boxitupstorage.ca`, Google Maps | none sensitive (public GETs) | Hero video, images, map link | ✅ |
| Future (Stripe live) | Stripe API | Customer + payment metadata | Billing | ⚠️ when enabled |

## 7. Needs review — start here (backlog for security/cyber)
The prioritized list of things to verify, tighten, or decide.

- [ ] **HIGH — Supabase service_role key is committed in `.mcp.json`.** It grants
      full DB access and bypasses RLS. Rotate it in the Supabase dashboard and remove
      it from the repo (or replace with an env reference). Until then, treat the key
      as compromised. *(§2, §3)*
- [ ] Admin auth is a **single shared password**, no MFA, no per-user accounts, no
      audit log — decide if acceptable given it gates PII. *(§2)*
- [ ] Confirm the GitHub repo is **private** (compounds the exposed-key risk + IP).
- [ ] Confirm the Cloudflare API token is **least-privilege** (Workers/D1/secrets only).
- [ ] Enable **dependency vulnerability scanning**; clear the 4 moderate npm advisories. *(§4)*
- [ ] Add **audit logging** for admin actions + access to submissions/clients PII. *(§2, §5)*
- [ ] Define a **retention/deletion policy** for submission & client PII. *(§5)*
- [ ] When Stripe goes live: card data must **never** touch D1; use Stripe
      Elements/Checkout; verify webhook signatures with `STRIPE_WEBHOOK_SECRET`. *(§5)*

---

## Change register (append-only)
Newest at top. One line per change to the security/access surface: date + what
changed. Never edit or delete past entries.

```
## YYYY-MM-DD — what changed on the surface (tool/secret/scope/dependency/data flow)
```

## 2026-06-27 — New /boxes-for-rent page (Figma design-to-code)
- Added public page `/boxes-for-rent` + independent `bfr_*` CMS content. No new
  secret/integration/runtime dependency; reuses the existing `POST /api/inquire`
  → D1 submissions flow (PII). Recorded the Figma MCP connector (read-only design
  source) in §1. No change to auth scope.

## 2026-06-27 — Register populated with current surface
- Filled §1–§6 with the real project surface (Cloudflare Workers + D1, admin auth,
  Stripe placeholders, public form → D1 PII data flow). Logged backlog in §7.
- Flagged HIGH: Supabase service_role key committed in `.mcp.json` (pre-existing,
  predates this register). Needs rotation + removal — see §7.

## 2026-06-27 — Register created
- Established GOVERNANCE.md per CLAUDE.md §8.
