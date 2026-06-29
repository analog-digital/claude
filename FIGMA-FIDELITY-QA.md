# Figma fidelity QA — verify the build matches the design

The **post-build** bookend to `FIGMA-GAP-SCAN.md`. Gap-scan runs *before* a build to
surface what the design is missing; this runs *after* a build to prove the code
actually matches the design — or to report exactly where it doesn't. Run it whenever
you've built or edited a page from Figma, before declaring that work done (CLAUDE.md
§4, §10).

The point isn't to "look done." It's to catch the gap between *a build that passes
atomic checks* and *a build that reproduces the design* — the two are not the same,
and that gap is where slop hides.

> An executable version ships as the `figma-fidelity-qa` skill (carries the JS probes
> and runs the loop). This file is the protocol of record; the skill is the tool. If
> the skill is installed, invoking it satisfies this protocol.

## Requirements

The Figma MCP (`get_metadata`, `get_design_context`, `get_screenshot`) and a browser
tool that can screenshot the live page and run JS in it (e.g. Claude in Chrome).
Without the browser tool, run the code-level gates and say the visual diff was skipped
— don't claim a pass you couldn't measure.

---

## The three laws (why builds slip past QA)

1. **Every gate is a measured number, not a vibe.** "Looks right" is not a result.
   If you can't measure it, it isn't a gate.
2. **Every layer needs an _absence_ check, not just a _presence_ check.** "The correct
   token exists" passes even when the wrong one is still there too. Builds game
   presence-only checks by *adding* the right thing without *removing* the wrong one,
   or by *inventing* structure the design never had. Always assert the bad pattern
   occurs **0** times, and ask "did the build add anything that isn't in the design?"
3. **Inspect relationships and the actual render, not isolated parts from data.**
   A page can have every part individually correct yet look wrong because the
   *relationships* are wrong (mismatched sibling columns, a missing overlap at a
   section seam) or because the build *invented* a block. And you only see this in the
   rendered image — coordinate data and design-context code tell you values, not
   composition. **Enumerate, don't sample:** check every component instance, not just
   the hero and the big sections.

---

## Procedure

**0. Ground truth from the render.** Pull `get_screenshot(pageFrame)` for the whole
composition and `get_screenshot(nodeId)` per section/component. Use `get_metadata` for
the coordinate/inventory map and `get_variable_defs` for the token palette. Look at the
**images** — never substitute data or memory for the render.

**1. Run the gates** (each prints a number; re-fix and re-run until green, content
TODOs excepted). Map each finding to its gate ID so coverage holes are visible.

| Gate | Checks | Pass condition |
|------|--------|----------------|
| **T1–T2 tokens** | rogue/parallel token definitions & references | **0** of each |
| **T3–T5 tokens** | canonical tokens resolve to exact hex; body text = text token; no inline hardcoded hex | exact / **0** |
| **C1 color-role** | each surface uses the *specific* token for that node (not just *a* palette color) | matches node |
| **C2 single-role** | distinct values for one role (e.g. the one orange) | **1** |
| **C3 control fill** | EVERY interactive control's fill (buttons, accordion +/- icons, badges) | matches node |
| **C4 tile/container** | card/tile background, border, shadow (e.g. logo tiles white not grey) | matches node |
| **P1–P3 components** | each repeated component count matches; none missing; none stray | counts match |
| **S1 gutter** | each section's first-content left offset | = design gutter ±4px |
| **S2 one edge** | header, footer, body share one content-left | ≤4px spread |
| **S3 rhythm** | inter-section spacing matches design deltas (not a flat value) | ±8px |
| **S4 width** | content max-width vs design content block | ±8px |
| **B1–B3 boundary** | designed overhang/bleed/overlap across seams reproduced | ±8px / preserved |
| **PAR1–PAR3 parallelism** | sibling elements share bg/padding/width; no invented block; columns fill container | consistent |
| **PAR4 full-bleed** | image/panel that fills its container isn't wrapped in an extra frame | edge-to-edge |
| **PAR5 decoration** | repeated dots/stars match count AND style (filled vs outline) | match |
| **TF1–TF2 type-fit** | each heading's size matches node; wraps to no more lines than design; casing matches per-heading | match |
| **A1–A2 assets** | no gross upscaling (natural ≥ ~0.8× display); logos/images correct color/saturation | pass |
| **INT1 stray** | nothing on the page absent from the design (floating badges, widgets) | **0** |
| **V1–V2 visual diff** | per-section live screenshot vs Figma render agree on presence/role/position/proportion/treatment | agree |

**2. Two ways of looking (do both).** A **seam pass** that looks only at the
boundaries between sections (overlaps, bleeds, color transitions, alignment). An
**intent pass**: for each marquee section, write one line of what the composition is
*trying to do*, then verify the build reproduces that intent, not just the parts.

**3. Loop.** Inspect → fix the red gates → re-inspect. Only report done when every gate
is green or only acknowledged content TODOs (missing photos, copy, phone numbers,
link targets) remain — and never fake those (CLAUDE.md §0.2, §4).

---

## Report format (lead with numbers)

```
FIDELITY REPORT — <page> @ <breakpoint>   Gates: <x>/<y> passing
T1 0 ✅  T2 0 ✅  C1 11/12 ❌(card bg #CCE8E8, expect #008A8C)  C2 1 ✅  C3 ❌(FAQ btn teal→orange)
P1 4/4 ✅  S1 72px ✅  S2 1 edge ✅  S3 ±8 ✅  B1 overhang 0 vs 40 ❌  PAR2 invented dark block ❌
TF2 casing ❌(How It All Began title-case)  A1 hero upscaled 3.75× ❌  INT1 stray "A" badge ❌
PER-SECTION (live vs Figma render): Hero Fail · BoxSizes Fail · HowItWorks Pass · ...
CONTENT TODOs (legitimate, not failures): <list>
VERDICT: PASS / NEEDS WORK — do not report done while a non-TODO gate is red.
```

---

## Honest notes

- The visual diff is a **perceptual** comparison (vision over the two images), not an
  automated pixel diff — it reliably catches missing components, wrong color roles, bad
  composition, but won't output a similarity percentage. Treat the numeric gates as the
  hard backbone and the render diff as the cross-check.
- The gate IDs exist so every real defect maps to one. **If you find a real defect that
  fits no gate, that's a coverage hole — name it** so this protocol can be extended
  (same spirit as the CLAUDE.md §1 "flag a missing tool/skill" rule).
- This raises the floor; it doesn't guarantee pixel-perfection. Its value is in
  actually pulling the render every time and enumerating every component — the two
  disciplines builds most often skip.
```
