# DEVLOG

A human-readable record of meaningful changes — intent, what changed, and notes for
whoever (human or AI) picks this up later. Git holds the exact diffs and timestamps;
this holds the *why*.

**How to use:** append a new entry at the top for each meaningful change or task.
Append-only — don't edit or delete past entries. Keep it short unless you're
investigating a break (then use the Investigation block). Never log secrets.

---

## Entry format (copy this)

```
## YYYY-MM-DD HH:MM — Short title
- Intent: why this change was made / what problem it solves
- Changed: files or areas touched
- Notes: anything stubbed, risky, deferred, or a "missing spec" left for later

### Investigation (only when debugging a break/loop/regression)
- Symptom: what broke and how it showed up
- Likely origin: when it started + suspected commit/date if known
- Ruled out: what you checked that wasn't the cause
- Fix: what resolved it (or current best lead)
```

---

## 2026-06-27 19:53 — /boxes-for-rent pixel-fidelity pass vs Figma
- Intent: bring the page to pixel-fidelity with the Figma (node 75:10) at 1440px;
  fix token/cascade/weight/casing/layout divergences found in an audit.
- Changed: globals.css — replaced the rogue `.theme-bfr` palette override with the
  canonical `--color-*` token layer (8 tokens, confirmed via get_variable_defs);
  scoped heading weights (h1/h2=800, h3=600) and `body:has(.theme-bfr){color:#000}`
  to this page only. Rewrote components/bfr/* to reference `--color-*` directly
  (no more --brand/--accent/--foreground/--muted/--border on this page). Rebuilt
  BfrHero to the measured composition (solid primary panel; H1 40/50 uppercase 800;
  dark features panel 452px; 46×46 #EDEDED icon tiles; 13px Bold uppercase labels;
  11px bodies; 150×34 accent button). Section labels → 50px Heavy. Star ratings →
  real SVG. Hero feature copy updated to Figma's exact wording.
- Verified (computed-style QA at 1440): 8 tokens exact; body color rgb(0,0,0);
  H1 + all section H2 weight 800 / 50px / Jost; hero matches Figma screenshot.
- Notes / deliberate deviation (CLAUDE.md §0): the global `--brand*` palette is
  KEPT in :root because the home & /rental-new pages depend on it (different,
  WordPress-matched colors — out of scope). It is no longer referenced anywhere on
  /boxes-for-rent, so this page uses only the canonical `--color-*` layer. Content
  gaps (per-box pricing/rating/availability/gallery) remain CMS-editable, hidden
  until filled — not faked.

## 2026-06-27 19:15 — New /boxes-for-rent page from Figma (CMS-mapped)
- Intent: build the Figma "RentalPage" design (file R7flit250CmNVuoJqqrUdg, node
  75:9) as a new page, mapped onto the CMS, with the inquiry path feeding the
  Submissions tab. Followed CLAUDE.md throughout.
- Changed: new app/boxes-for-rent/page.tsx + components/bfr/* (Hero, box-sizes
  Carousel, HowItWorks, Services, BookRental selector, Story, Partners, Faq,
  Testimonials, FinalCta). New independent content set lib/boxes-for-rent-content.ts
  + `bfr_*` CMS sections (grouped in the admin Content tab). Page-scoped Figma
  palette via `.theme-bfr` in globals.css. cms.ts: getBoxesForRentContent(),
  generalized get/save/resetSection to string keys, ALL_DEFAULTS lookup.
  QuoteWizard now reads ?boxSize/?service to pre-select. sitemap + actions
  revalidation updated.
- Followed Figma DEV CONTEXT frame (212:26): tokens→scoped CSS vars, components
  reused via props, flex/grid (no absolute), real behaviors implemented
  (carousel prev/next + keyboard + scroll-snap; accordion one-open-at-a-time;
  two radio groups), a11y (radiogroup/region/aria-expanded, alt text, heading
  order h1→h2→h3).
- Notes / decisions:
  · Existing pages untouched — new palette is page-scoped; content set is separate.
  · Per-box pricing, star rating, availability badge, gallery link are flagged
    "needs owner input" in Figma → left as empty CMS fields, rendered only when
    filled (no fake data, per CLAUDE.md §0/§4). Owner fills via admin.
  · Box selector routes selections to /inquire-today (the canonical quote flow)
    as query params rather than a duplicate inline form, so all submissions keep
    flowing to the Submissions tab. Submission `source` currently logs
    "/inquire-today" even when started from the selector — minor; could pass the
    origin through later.
  · Visual check done via local render screenshot — matches Figma section-by-section.
- Intent: adopt the CLAUDE.md engineering/governance baseline for this repo and,
  per its bootstrap rule, make the companion registers reflect reality.
- Changed: added CLAUDE.md, DEVLOG.md, GOVERNANCE.md, SECURITY-PRACTICES.md at root.
  Populated GOVERNANCE §1–§7 and the SECURITY-PRACTICES posture table with the
  actual surface (Cloudflare Workers + D1, admin auth, Stripe placeholders,
  public form → D1 PII flow).
- Notes / conflict skim (CLAUDE.md §0): existing code largely aligns — server-side
  authz with deny-by-default, parameterized D1 queries, secrets in the Worker store.
  **One real conflict found:** the Supabase `service_role` key is committed in
  `.mcp.json` (pre-existing). Logged as HIGH in GOVERNANCE §7 — needs rotation +
  removal by the owner. Not auto-fixed (would change their MCP config); flagged for
  a human call. Also: no dependency scanning (4 moderate npm advisories), single
  shared admin credential (no MFA/audit). Docs-only change; no app code touched.
