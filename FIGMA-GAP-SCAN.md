# Figma gap-scan → final prompt for Figma AI

Before building from a Figma file, scan it for what's structurally or contextually
missing, then hand Figma AI a final prompt listing exactly what to add or clarify.
The point isn't to redesign anything — it's to surface the gaps that would otherwise
force the developer (or Claude Code) to guess and produce slop.

## How to scan (what to look at)

Open the file (or use the Figma MCP) and check each of these. Note which are missing
or weak:

1. **Design tokens / Variables** — are colors, type, spacing, radii defined as
   Variables/Styles, or hardcoded per layer? (Hardcoded → code gets magic numbers.)
2. **Components vs raw layers** — are repeated things (buttons, cards, rows, badges)
   real components with variants, or duplicated rectangles + text?
3. **Auto-layout vs absolute positioning** — are containers using auto-layout, or is
   everything absolutely positioned on one fixed-width artboard? (Absolute → no
   responsive intent.)
4. **Layer naming** — semantic, code-like, consistent names, or "Rectangle 12" /
   "Screenshot ..."? (Same concept should use the same word everywhere.)
5. **Responsive frames** — are there tablet/mobile frames and stacking rules, or only
   one desktop width?
6. **Interaction/state specs** — do carousels, accordions, selectors, hovers, and
   CTAs have defined behavior, or are they just drawn?
7. **Content completeness** — is real copy present (e.g. FAQ *answers*, not just
   questions), or are forms/links referenced but not designed?
8. **Images & assets** — real exportable assets with aspect ratios and alt text, or
   pasted screenshots / placeholders?
9. **Header / footer / nav** — real layers with link targets, or flattened images?
10. **Functional targets** — do CTAs have destinations (phone number, form, page)?
11. **Accessibility** — heading order, contrast on colored buttons/bands, focus
    states, keyboard operability of interactive parts.

## Common gaps (the usual suspects)

- No Variables/tokens — everything hardcoded.
- Cards/buttons duplicated instead of componentized.
- Absolute positioning, single desktop artboard, no responsive rules.
- Generic layer names that don't map to components.
- Interactive elements with no behavior spec.
- Missing content: FAQ answers, form fields, link/CTA targets, alt text.
- Header/footer as screenshots, not layers.

---

## Final prompt to give Figma AI

Fill the bracketed parts from your scan, then paste into Figma AI. Keep it to the
gaps you actually found — don't ask for things the file already has.

```
I'm about to build [FILE/PAGE NAME] into code. Before I do, add the missing context
below to the file so the build doesn't have to guess. Don't change the visual design
— only add tokens, structure, annotations, and missing content where noted.

Gaps to resolve:
- TOKENS: Define Figma Variables for [colors / type scale / spacing / radii] and
  apply them, replacing hardcoded values. [List the exact colors/fonts I should use,
  e.g. primary, accent #..., body font ...]
- COMPONENTS: Convert these repeated elements into components with variants:
  [list, e.g. Button (primary/secondary x states), Card, ListRow, Badge].
- LAYOUT: Rebuild [these sections] with auto-layout instead of absolute positioning,
  and add responsive frames for [tablet / mobile] with stacking rules.
- NAMING: Rename layers to semantic, code-like, consistent names (no "Rectangle 12"
  / "Screenshot ..."), so the same concept uses the same word throughout.
- BEHAVIOR: Add a short annotation describing the intended behavior for [carousel /
  accordion / selector / CTAs].
- CONTENT: Add the missing content: [FAQ answers / form fields / CTA destinations /
  real images + alt text / phone number].
- HEADER/FOOTER: Rebuild [header/footer] as real layers with link targets, not images.
- ACCESSIBILITY: Confirm heading order, WCAG AA contrast on [colored buttons/bands],
  focus states, and keyboard operability for interactive elements.

Where something can't be resolved from what exists, leave a clearly-labeled note in
a "DEV CONTEXT — read before coding" frame asking for the missing spec, rather than
inventing it.
```
