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

## 2026-06-29 17:52 — /boxes-for-rent: hero centering, link-button text, selector frame, final CTA bg
- Intent: a batch of Figma-fidelity fixes flagged from live screenshots.
- Changed:
  - `components/bfr/BfrHero.tsx` — `mx-auto` so the teal hero panel is centered.
  - `app/globals.css` — moved the bare `a { color: inherit }` into `@layer base`.
    Unlayered, it beat every Tailwind text-color utility, so link buttons
    (CALL US TODAY / REQUEST A QUOTE / BOOK A RENTAL) rendered black instead of
    white. In the base layer the utilities win again.
  - `components/bfr/BfrBookRental.tsx` — wrapped the white selector card in a
    dark-aqua (primary-dark) frame with rounded bottom corners + ~19px inset, and
    gave Step One a square bottom so its active tab merges into the frame
    (matches Figma BoxSelector/Container 75:54 + Inner 75:55, badges row flush).
  - `components/bfr/BfrFinalCta.tsx` + content — final CTA base is now
    primary-dark (was bright primary) with an optional background photo + dark
    wash, per Figma 75:49 (container photo under a dark teal overlay).
- Notes: the exact Figma container photo for the final CTA isn't sourced yet —
  `backgroundImage` defaults to "" with a TODO; the section shows the design's
  solid dark-teal wash until the real photo is added. tsc clean.

## 2026-06-29 17:39 — /boxes-for-rent hero: reuse the home-header background video
- Intent: place the home-page header video into the new Boxes For Rent hero.
- Changed:
  - `lib/boxes-for-rent-content.ts` — export `BFR_HERO_VIDEO_ID = HERO.videoId`
    (single source shared with the home header; kept as a constant, not on the
    CMS-overlaid `bfr_hero` row, so a saved row can't blank it).
  - `components/bfr/BfrHero.tsx` — layer the same muted/looping YouTube embed used
    by `components/Hero.tsx` into the top background region; existing
    `backgroundImage` now serves as the poster/fallback beneath it (region gets
    `overflow-hidden`). Same iframe idiom/classes as the home hero.
- Notes: video is decorative (aria-hidden, pointer-events-none, tabIndex -1), so
  no a11y/keyboard regression. Not CMS-editable by design — matches the home hero.
  tsc clean.

## 2026-06-29 06:54 — /boxes-for-rent: zoomed per-section QA (component ledger)
- Intent: redo fidelity QA per-section at zoom (no full-page judging), measuring
  colors with Pillow. Caught defects the earlier passes missed.
- Fixed (Figma-backed, measured):
  · Services access badge — was solid teal + white text, top-LEFT; Figma is pale
    aqua #CCE8E8 + dark text, top-RIGHT. Fixed.
  · Services "LEARN MORE" button — not in Figma services; removed (was invented).
  · Step badges (Book Rental) — were uniform white/10; Figma has states: step1
    dark #034047, step2 light #CCE8E8, steps 3/4 muted. Fixed.
  · CALL US TODAY (How It Works + Book Rental) — was outline teal; Figma is a dark
    solid (#034047) white-text button. Fixed both.
  · Hero heading — was wrapping to 3 lines (max-w 527); Figma wraps to 2. Widened.
  · Box-sizes heading — "OUR BOX SIZES AVAILABLE" was wrapping to 2 lines
    (max-w-2xl); Figma is 1 line. Removed the constraint.
- Open MISMATCHes that need assets/content (not faked):
  · Box card bg measured #b3dcdb (baked into the WP composed images) vs Figma
    #008A8C — needs card images with the #008A8C background to fully match.
  · Hero background = the BOX IT UP logo graphic vs Figma's truck/storage photo.
  · Partner logos desaturated / white-on-transparent (vanish on white tiles) vs
    Figma's gray/colored variants; partners heading is heavy-black vs Figma light-gray.
  · Hero feature icon tiles: Figma blank #EDEDED squares; ours add a teal check.
  · Selector radios: native inputs vs Figma's custom aqua-fill circles (minor).

## 2026-06-29 06:38 — /boxes-for-rent: fixes from owner's annotated review
- Intent: the prior QA pass missed several real defects the owner annotated on
  screenshots; fix them (the skill's Phase 9 relationship/treatment checks).
- Fixed:
  · Hero (PAR1/PAR2/B1) — the features panel was an INVENTED separate dark
    (#034047) block with different padding; Figma has ONE bright-teal field
    (#009B9F) holding both columns. Rebuilt so both columns share the same teal
    bg + same 21/31px padding, no dead gap, and the panel overhangs ~72px into the
    white section below the hero photo (was flush).
  · Box cards (PAR4/PAR5) — removed the extra dark-teal frame and our duplicate
    dots/stars/pricing/badge overlays; the composed WP image now fills the card
    column edge-to-edge (pricing/dims/dots are baked into that image).
  · FAQ +/- buttons (C3) — were teal, now orange (#FF7D00).
  · Story CTA (C3/content) — was teal "Discover more", now orange "LEARN MORE".
- Verified @1440: T1/T2 0, body #000, 1 orange only, faq+story orange, hero cols
  share bg+padding, overhang 72px, card frame 0px, H2 all-caps, 4 gallery btns.
- Content/asset TODOs (not faked): real hero background photo (currently the logo
  graphic); partner logos are desaturated/white-on-transparent and read "off" on
  the white tiles → need proper colored logo assets (A2); gallery URLs (// TODO).
  Note: the floating orange "A" badge in the review screenshots is NOT in our DOM
  (grep-clean) — it's a browser-extension overlay on the reviewer's side (INT1 n/a).

## 2026-06-29 06:24 — /boxes-for-rent figma-fidelity-qa pass (skill-driven)
- Intent: run the figma-fidelity-qa protocol vs Figma 75:10, per-section render diff,
  fix every red gate.
- Method: pulled the Figma render fresh + live section crops at 1440; ran the gate
  script (computed styles) + Phase 9 relationship/treatment checks.
- Found & fixed 2 real gates:
  · TF2 (per-heading casing) — lower section labels ("How It All Began", "Trusted by
    our happy partners", "Read Our Client Feedback & Reviews", "Box It Up Today") were
    title-case; Figma section labels are all-caps. Fix: text-transform:uppercase on
    .theme-bfr h1/h2 (card h3 titles stay title-case). Verified 9/9 h2 now uppercase.
  · C4 (tile treatment) — partner logos sat directly on the grey band; Figma uses
    white tiles. Fix: white rounded tiles in BfrPartners. Verified 18/18 tiles white.
- Everything else green: T1-T5, C1 (#008A8C card), C2 (1 orange), P1-P3, Ty1, S1-S4, R1.
- Content TODOs (not faked): hero background photo (currently the logo asset, upscaled
  1.88×); gallery URLs (// TODO); some partner logos are white-on-transparent PNGs that
  disappear on white tiles → need dark logo variants (asset A2).

## 2026-06-29 06:08 — Engineering-baseline files set up (2 batches)
- Intent: install the Claude engineering-baseline kit (8 files) and wire the Figma
  pre/post-build protocols + fidelity-QA skill, per the owner's batches.
- Changed / placed:
  · CLAUDE.md — updated to the newer version (adds §4 "After building, verify
    fidelity" bullet referencing FIGMA-FIDELITY-QA.md + the figma-fidelity-qa skill).
    Only delta from prior; no project-specific content lost.
  · FIGMA-GAP-SCAN.md, FIGMA-FIDELITY-QA.md — added at repo root (were absent).
  · .claude/skills/figma-fidelity-qa/SKILL.md — added (project-scoped, discoverable).
  · docs/ENGINEERING-BASELINE.md — the baseline-kit README placed here to AVOID
    clobbering the existing project README.md (Box It Up Storage).
  · DEVLOG.md — this entry appended (file already existed; not overwritten).
- Left untouched (source of truth): GOVERNANCE.md, SECURITY-PRACTICES.md (already
  populated), README.md (project readme).
- Notes: incoming GOVERNANCE/SECURITY/DEVLOG copies were blank templates — not
  merged. Remaining ❓ blanks in the existing GOVERNANCE.md flagged to owner
  (secret rotation cadences, dependency review cadence). No code/app changes.

## 2026-06-29 01:44 — /boxes-for-rent fidelity protocol: one-palette migration + defect fixes
- Intent: pass a numeric fidelity gate set (tokens/color-role/components/spacing) vs
  Figma 75:10, measured not eyeballed.
- Changed (site-wide, per the token contract "delete and repoint every consumer"):
  · globals.css — deleted the parallel --brand*/--accent*/--foreground/--muted*/--border
    palette and the @theme alias block; one canonical --color-* layer remains.
  · Repointed ALL consumers (home/rental/admin/shared header+footer/bfr) to --color-*
    via mechanical migration (65×--brand, 54×--muted-foreground, etc. → canonical).
    Consequence: home & /rental-new now render on the canonical Figma palette
    (brighter primary teal, #000 body text) — flagged for review.
  · Box card bg → --color-primary-medium #008A8C (Figma 75:14). VIEW GALLERY on all
    4 cards (gallery URLs are // TODO). Carousel arrows → white filled circles centered
    on the card row (were teal outline below). Dots moved inside the card image.
  · Gutter unified to 72px (content max-width 1296) on every section + header + footer.
    Variable vertical rhythm restored (hero→box 145, hiw→services 147, 35 into the
    teal band) instead of flat py-16.
- QA gates @1440 (all green except content TODOs): T1=0 T2=0 T3=8/8 T4=#000 T5=0 ·
  C1=#008A8C C2=1 orange · P1=4 P2=centered P3=0 · Ty1 40px/800/upper · S1=72 S2=1edge
  S3=non-uniform(cited 145/147/35) S4=1296 · R1 no overflow @1024/768/375.
- Content TODOs (not faked): real hero background photo; phone/form URL/FAQ answers/
  gallery URLs already TODO.

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
