---
name: figma-fidelity-qa
description: >
  Audit a built or deployed web page against its Figma source design and produce a
  pass/fail fidelity report. Use after any build/edit that implements a Figma design,
  or whenever asked to "QA," "check fidelity," "compare to Figma," or "see how close
  the build is." Runs as a self-correction loop: the agent inspects, fixes, and
  re-inspects until every gate passes. Requires the Figma MCP and a browser
  automation tool (Claude in Chrome or equivalent) that can run JS in the page.
---

# Figma Fidelity QA Inspector

You are a **master QA agent**. Your job is not to make the page *look* done — it is to **prove** the build matches the Figma design with measured numbers, or to report exactly where it doesn't. You are skeptical of your own work. A green report you can't back with numbers is a failure.

## The three laws (why builds slip past QA)

1. **Every gate is a programmatic assertion that prints a number.** No "looks right," no eyeballing. If you can't measure it, it's not a gate.
2. **Every layer needs an _absence_ check, not just a _presence_ check.** "The correct token exists" passes even when the wrong one is still there too. Builds game presence-only checks by *adding* the right thing without *removing* the wrong thing. Always assert the bad pattern occurs **0** times.
3. **Inspect relationships and additions, not just isolated parts.** A page can have every part individually "correct" yet look wrong because the *relationships* are wrong — two sibling columns with mismatched backgrounds/padding, a card that should overhang a section seam but sits flush, an element the build *invented* that the design never had. Per-section, per-part inspection is structurally blind to these (the very act of cropping to one section discards cross-section and sibling relationships). Always also ask: are parallel elements consistent with each other? do overlaps/seams match the design? did the build add structure not in the Figma node?

Corollaries:
- **Enumerate, don't sample.** Build the full component inventory from the Figma node and check **every** instance — every button, icon-button, badge, tile, eyebrow label, dot, and individual heading — for fill, casing, container treatment, and nesting. Most misses happen on the small/secondary components a marquee-only pass never looks at (e.g. an accordion's +/- button color, partner-tile backgrounds, a single mis-cased heading). If you only inspected the hero and the big sections, you have not inspected the page.
- **Code-level checks AND visual/geometric checks are both mandatory.** Tokens/weights/colors can all be green while the layout looks wrong. Measure geometry too.
- **Token _role_ matters, not just token _value_.** A surface can use a real palette color and still be wrong (e.g. `primary-light` where the design wants `primary-medium`). Check the specific token per node.
- **Never report success while any gate is red**, except for legitimate, design-acknowledged content TODOs (missing photos, copy, phone numbers). List those separately; never fake them.

## Inputs

- `LIVE_URL` — the rendered page to inspect.
- `FIGMA_FILE` + `FIGMA_NODE` — the page frame in Figma (source of truth).
- `BREAKPOINTS` — default `1440, 1024, 768, 375`. Desktop width is the fidelity bar.

---

## Procedure

### Phase 0 — Establish ground truth from Figma (do this first, always)

1. `get_metadata(FIGMA_NODE)` → the full node tree: every component, its name, x/y, width/height. This is your **expected component inventory and coordinate map**.
2. `get_variable_defs(FIGMA_NODE)` → the canonical design tokens (names + hex). This is the **only** allowed palette.
3. For each section/component you'll check: `get_design_context(nodeId)` → exact font-size, weight, family, casing, fill token, radius; and `get_screenshot(nodeId)` → the visual target.
4. Record Figma's **gutter** (smallest x of section content), **section y-positions** (for inter-section spacing deltas), and **content block width** (max x − min x of content).

> Resolve the Figma handoff contradiction: the MCP emits absolute-positioned pixels, but dev notes usually ask for flex/grid. Use flex/grid as the **technique**, Figma's measured values as the **target**. Geometry must match even though the method differs.

### Phase 1 — Token & theme audit (code layer)

Run in the page:

```js
// All custom-property DEFINITIONS in shipped CSS
(() => { let defs=[]; for (const s of document.styleSheets){let r;try{r=s.cssRules}catch(e){continue;}
  for (const rule of r||[]) if (rule.style) for (let i=0;i<rule.style.length;i++){const p=rule.style[i];
    if(p.startsWith('--')) defs.push(p+': '+rule.style.getPropertyValue(p).trim());}}
  return [...new Set(defs)]; })()
```
```js
// REFERENCE counts — assert ROGUE tokens are 0 (absence check)
(() => { const pats=['--brand','--accent\\)','--accent-','--foreground','--muted','--border']; let out={};
  for (const p of pats){let n=0; for (const s of document.styleSheets){let r;try{r=s.cssRules}catch(e){continue;}
    for (const rule of r||[]) n+=((rule.cssText||'').match(new RegExp('var\\('+p,'g'))||[]).length;} out[p]=n;}
  out.bodyColor=getComputedStyle(document.body).color; return out; })()
```

Gates:
- **T1** Rogue token names appear **0×** as definitions. (absence)
- **T2** Rogue token names appear **0×** as references. (absence)
- **T3** Each canonical token resolves to the exact Figma hex from Phase 0.
- **T4** `getComputedStyle(body).color` equals the design text token.
- **T5** Inline hardcoded hex equal to any palette value: **0**. (absence)

### Phase 2 — Typography audit

```js
(() => { const sel='h1,h2,h3'; return [...document.querySelectorAll(sel)].map(h=>{const s=getComputedStyle(h);
  return {t:h.textContent.trim().slice(0,30), tag:h.tagName, fw:s.fontWeight, fs:s.fontSize,
  ff:s.fontFamily.split(',')[0], tt:s.textTransform};}); })()
```
Gates (compare each against its Figma node from Phase 0):
- **Ty1** Computed `font-size` matches Figma ±1px.
- **Ty2** Weight mapping correct (e.g. Heavy→800, Demi→600, Book→400).
- **Ty3** `font-family` resolves to the intended (or approved-substitute) font.
- **Ty4** Casing matches Figma (via content or `text-transform`).

### Phase 3 — Color-role audit (value AND role)

For each meaningful surface (section bg, card bg, badge, button), read its computed `background-color` and assert it equals the **specific** token Figma binds to that node — not merely "a palette color."

```js
// Example: distinct values used for one semantic role must be exactly 1
(() => { const oranges=new Set();
  document.querySelectorAll('a,button,.btn').forEach(b=>{const bg=getComputedStyle(b).backgroundColor;
    if(/rgb\(2[45]\d, (?:[6-9]\d|1[0-3]\d), \d/.test(bg)) oranges.add(bg);});
  return [...oranges]; })()
```
Gates:
- **C1** Each surface's computed bg == the exact Figma token value for that node.
- **C2** Distinct values for one semantic role == **1** (e.g. exactly one orange, one card teal). (absence of near-misses)

### Phase 4 — Component-presence audit

From Phase 0 you have the expected inventory. Count each in the DOM.

```js
(() => { const need=['view gallery','book a rental','request a quote','call us']; const out={};
  need.forEach(t=>{out[t]=[...document.querySelectorAll('a,button,h3,p')]
    .filter(e=>e.textContent.trim().toLowerCase()===t || (e.textContent.toLowerCase().includes(t)&&e.textContent.length<24)).length;});
  out.cards=document.querySelectorAll('[data-card],.card,article').length; return out; })()
```
Gates:
- **P1** For each repeated component, DOM count == Figma count (e.g. VIEW GALLERY == 4, cards == N).
- **P2** No Figma component missing — list any with count 0. (absence of omission)
- **P3** No stray elements absent from the design (floating badges, debug markers). (absence of extras)

### Phase 5 — Spacing & geometry audit (the most-missed layer)

```js
(() => { const secs=[...document.querySelectorAll('header,section,footer')];
  const rows=secs.map(s=>{const r=s.getBoundingClientRect(); const cs=getComputedStyle(s);
    const inner=[...s.querySelectorAll('*')].find(e=>{const m=getComputedStyle(e).maxWidth;return m&&m!=='none'&&parseInt(m)>=1000;});
    const head=s.querySelector('h1,h2,h3');
    return {label:(head?head.textContent:s.textContent).trim().slice(0,22),
      top:Math.round(r.top+scrollY), height:Math.round(r.height),
      padTop:cs.paddingTop, padBottom:cs.paddingBottom,
      innerMaxW: inner?getComputedStyle(inner).maxWidth:null,
      headLeft: head?Math.round(head.getBoundingClientRect().left):null};});
  for(let i=1;i<rows.length;i++) rows[i].gapAbove=rows[i].top-(rows[i-1].top+rows[i-1].height);
  return {viewportW:innerWidth, rows}; })()
```
Gates (at the desktop breakpoint, compare to Phase 0 numbers):
- **S1** Each section's first-content left offset == Figma gutter ±4px.
- **S2** **One left edge:** header, footer, and all body sections share the same content-left within ±4px. (catches the classic "nav inset 144px but sections inset 24px" bug)
- **S3** Inter-section vertical gaps match the Figma section-y deltas ±8px — do **not** accept a uniform padding if Figma's rhythm is variable.
- **S4** Content max-width matches Figma's content block ±8px (don't ship `max-w-[1440px]` + tiny gutter if Figma's content is ~1300 with a ~72px gutter).
- **S5** Spot-check 3–5 key components' position/size against their Figma node coords ±8px.

### Phase 6 — Visual per-section diff (pull the actual Figma render — every time)

For **every** section: screenshot the live render at desktop width, fetch the matching `get_screenshot(nodeId)` from Figma, and put the two images **literally side by side**. Compare: component presence, fill role, element position/overlap, proportion, and treatment (radius, crop, overlay). Note every mismatch with the node id.

**Non-negotiable:** you must look at the **rendered Figma image** for every section, every run. Never substitute coordinate data (`get_metadata`), design-context *code* (`get_design_context`), or your memory of an earlier screenshot for the actual render. Data tells you *values*; only the render shows *composition, color treatment, and invented structure*. (Field example: design-context reported a hero features panel with "transparent background" — true — but only the `get_screenshot` revealed it sits on one bright-teal field, proving the build's separate dark-teal block was invented. Data alone missed it; the render caught it.) Also pull `get_screenshot(pageFrame)` once for the whole-page composition, and grab detail shots of individual component nodes (a card, a panel) when a section node isn't isolated. If the Figma MCP render is insufficient, open the Figma file in a browser tab and screenshot it there.

### Phase 7 — Responsive

At each breakpoint: verify the design's reflow rules (column counts, stacking, carousel→swipe, gutter ≥ min), and assert **no horizontal overflow** (`scrollWidth <= clientWidth`).

### Phase 8 — Behavior & accessibility

Exercise every interactive component from the design spec (carousel keys + snap, accordion single-open + icon swap, radio groups, form validation). Assert heading hierarchy (one h1, section h2s, card h3s), ARIA roles, alt text on every image, and full keyboard reachability.

---

### Phase 9 — Relationship, depth & integrity (field-trained — catches what part-by-part inspection misses)

This phase exists because real reviewers catch defects the earlier phases can't: they read elements *in relation to each other and to the design's structure*. Run all of it.

**Boundary & overlap (depth).** In Figma, note any element whose box extends past its section/background box (an intentional overhang/bleed). The build must reproduce it.
```js
// overhang of an element past its section bottom (compare to Figma's overhang)
(() => { const sec=document.querySelectorAll('section')[0]; const sb=sec.getBoundingClientRect().bottom+scrollY;
  const panel=document.querySelector('h1').closest('section').querySelector('div'); // pick the overhanging panel
  const pb=panel.getBoundingClientRect().bottom+scrollY; return {panelBottom:Math.round(pb), sectionBottom:Math.round(sb), overhang:Math.round(pb-sb)}; })()
```
- **B1 overhang/bleed:** live `child.bottom − section.bottom` matches Figma `child.bottom − background.bottom` (±8px). A designed overhang rendered flush (0) is a Fail.
- **B2 seam straddle:** for each adjacent-section pair, any element designed to cross the seam still crosses it.
- **B3 layering/z:** elements that overlap in Figma overlap in the build (not reflowed into stacked rows).

**Parallelism & invented structure.** Compare sibling/parallel elements (columns in a row, cards in a grid) to *each other*, then to Figma.
```js
// sibling consistency: backgrounds + padding of parallel columns/cards
(() => { const cols=[...document.querySelectorAll('[data-col],.col,section > div > div')].slice(0,4);
  return cols.map(c=>{const s=getComputedStyle(c); return {bg:s.backgroundColor, padL:s.paddingLeft, padT:s.paddingTop, w:Math.round(c.getBoundingClientRect().width)};}); })()
```
- **PAR1 sibling consistency:** parallel elements share background, padding, and width logic unless Figma explicitly differs. (e.g. two hero columns must not be `#009B9F` vs `#034047` with 0px vs 14px padding.)
- **PAR2 invented structure:** the build introduces **no** background, border, color split, or block absent from the Figma node. Cross-check each colored block against the design — if Figma's panel is transparent/one color, the build's extra block is a Fail.
- **PAR3 container fill:** columns fill their container per Figma's width split — no unintended dead gaps between siblings.

**Asset resolution.**
```js
(() => [...document.querySelectorAll('img')].map(i=>({alt:i.alt.slice(0,20), up:+(i.getBoundingClientRect().width/(i.naturalWidth||1)).toFixed(2)})).filter(o=>o.up>1.5))()
```
- **A1 no gross upscaling:** every rendered image's natural width ≥ ~0.8× its display width. A placeholder stretched (e.g. 384px → 1440px) is a Fail; flag for a real, full-res asset.

**Type-fit.**
- **TF1 no over-wrap:** each heading's computed `font-size` matches its Figma node (±1px) **and** wraps to no more lines than the design. A label that wraps to 2–3 lines because it's oversized (e.g. section labels at 50px breaking onto two lines) is a Fail.
- **TF2 per-heading casing:** check **each** heading and eyebrow label's casing individually against its Figma node — never assume globally. A heading rendering title-case where the design is all-caps (e.g. "How It All Began" vs "HOW IT ALL BEGAN") is a Fail.

**Exhaustive component fill & treatment (run on EVERY component instance, not a sample).** Enumerate every button, icon-button, accordion control, badge, dot, tile, and card from the Figma node; check each against its render.
```js
// every button/link/icon-button fill — compare each to its Figma node
(() => [...document.querySelectorAll('button,a,[role=button]')].map(b=>({t:(b.textContent||b.getAttribute('aria-label')||'').trim().slice(0,22), bg:getComputedStyle(b).backgroundColor})))()
```
- **C3 control fill (role):** every interactive control's fill matches Figma. (Field miss: FAQ expand +/- circles rendered teal where the design is orange `#FF7D00`.)
- **C4 container/tile treatment:** card/tile backgrounds, borders, and shadows match (e.g. partner-logo tiles must be **white**, not grey; cards have the right radius/shadow).
- **PAR4 full-bleed vs inset:** an image/panel that fills its container in Figma must not be wrapped in an extra frame/border in the build. (Field miss: box-card image inset inside a dark-teal frame instead of filling the card column edge-to-edge — an invented nesting layer.)
- **PAR5 decorative-element count & style:** repeated decorative elements (dots, stars, indicators) match Figma in **count and style** (filled vs outline). (Field miss: 4 mixed filled/outline dots where the design has 2 filled.)
- **A2 asset fidelity:** logos/images render in correct color and saturation (not greyed/desaturated/off) at the right aspect.
- **INT1 no stray elements:** nothing on the live page that isn't in the design — floating badges, chat widgets, leftover markers (e.g. a stray "A" avatar). Each such element is a Fail.

**Two ways of looking (do both, explicitly):**
- **Seam pass** — after the per-section diff, do a pass that looks *only* at the boundaries between sections: overlaps, bleeds, color transitions, alignment across the seam.
- **Intent pass** — for each marquee section, first write one line of what the composition is *trying to do* ("a hero card floating over the photo/white seam"; "two equal columns sharing one teal field"), then verify the build reproduces that intent, not just the parts.

## Report format (lead with numbers)

```
FIDELITY REPORT — <page> @ <breakpoint>
Overall: <pass%>  |  Gates passed: <x>/<y>

GATE RESULTS (number first)
T1 rogue defs ......... 0 ✅   T2 rogue refs ......... 0 ✅
T3 token values ....... 8/8 ✅ T4 body color ......... #000 ✅
C1 surface roles ...... 11/12 ❌ (card bg #CCE8E8, expect #008A8C)
C2 distinct oranges ... 1 ✅
P1 view-gallery btns .. 4/4 ✅  P2 missing comps ...... 0 ✅
S1 gutter ............. 24px ❌ (expect ~72px)
S2 shared left edge ... 3 edges ❌ (header 144 / body 24 / figma 72)
S3 section rhythm ..... 2 gaps off >8px ❌
...

PER-SECTION  (Pass / Minor / Fail + the specific discrepancy)
Hero ............ Minor — bg is placeholder (content TODO), heading left 45 vs 94
Box Sizes ....... Fail  — card bg wrong token; VIEW GALLERY missing; arrows mislocated
...

CONTENT TODOs (legitimate, not failures)
- Hero background photo, FAQ answers, phone number ...

VERDICT: <PASS / NEEDS WORK> — do not report done while any non-TODO gate is red.
```

## Loop

Inspect → fix the red gates → re-inspect. Repeat until every gate is green or only acknowledged content TODOs remain. Only then report complete, leading with the gate numbers.
