# CLAUDE.md — Engineering baseline

This file sets the baseline for how I want code written in this repo. It applies to
everything: features built from scratch, design-to-code from Figma, and edits to
existing code. Read it before writing or changing code.

The goal is a middle ground: clean, non-slop code **without** breaking what already
works, and a habit of pausing to ask when a decision is mine to make, not yours.

---

### Project bootstrap (do this first in any repo)

At the start of work in a project, make sure the companion files referenced below
exist at the repo root. If any is missing, create it from the baseline templates
(see §7 DEVLOG.md, §8 GOVERNANCE.md, §9 SECURITY-PRACTICES.md) and tell me you did.
Don't overwrite existing ones — only create what's absent. If this is an existing
codebase, also skim it first and note anything that already conflicts with these
rules before changing anything.

---

## 0. Two rules that override everything else

1. **Don't break working code.** Prefer the smallest change that does the job.
   Don't refactor, rename, restructure, or "improve" things I didn't ask you to
   touch. If a clean implementation would require a bigger change, stop and ask
   first (see Section 3).
2. **Don't fake done.** Never ship code that looks finished but isn't — empty
   functions with real-looking bodies, fake return values, stubbed handlers, TODO
   placeholders, or imports of things that don't exist. If you can't actually
   implement something, leave a clearly-marked comment saying what's missing and
   ask me — don't paper over it.

---

## 1. Before you start — check, then ask if needed

Before writing code, take a beat:

- **Look at the existing code first.** Match its patterns, naming, libraries, and
  file structure. Consistency with what's here beats your preferred style.
- **If the task is underspecified or has a real fork in the road, ask me** before
  building — don't guess and build the wrong thing. One or two sharp questions is
  fine; a wall of them isn't.
- **If a tool or skill would genuinely help, say so.** If you notice that a job
  would benefit from something we don't have set up yet — a reusable skill, a
  linter/quality gate (e.g. aislop / ai-slop-detector), a script, a CLAUDE.md
  section that doesn't exist yet — flag it and ask if I want it. Don't silently
  build heavy scaffolding I didn't request, but don't stay quiet about it either.
  A good prompt looks like: "This is the third time we've done X by hand — want me
  to make a small skill/script for it?"
- **Build a skill only when it earns its place:** the task is repeatable, I'll hit
  it again, and a skill saves real effort. Ask before creating one. A one-off task
  does not need a skill.

When in doubt between "just do it" and "ask first": do it if it's reversible and
low-risk; ask if it's hard to undo, touches shared/critical code, or changes
behavior I might not expect.

---

## 2. What clean (non-slop) code means here

- **Semantic, reusable structure.** Build components/functions once and reuse them.
  No copy-pasted near-duplicates. Names describe what the thing *is* or *does*.
- **No hardcoded values where a token/constant belongs.** Use design tokens / CSS
  variables / config for colors, spacing, type, and magic numbers — especially for
  anything coming from Figma (see Section 4).
- **No dead weight.** No unused imports, variables, files, or dependencies. No
  commented-out code left behind. No `console.log` / debug leftovers.
- **Honest typing.** Avoid `as any` / `@ts-ignore` and equivalent escape hatches.
  If a type is hard, ask rather than casting it away.
- **Handle errors for real.** No swallowed/empty catch blocks. Fail loudly or
  handle deliberately.
- **Comments explain *why*, not *what*.** Skip narrative comments that just restate
  the code. Keep comments that capture intent, edge cases, or "missing spec" notes.
- **Small, readable units.** Avoid oversized functions/files and deep nesting.
  Split when it genuinely aids reading — not to hit an arbitrary number.

---

## 3. Editing existing code (the "don't break it" protocol)

- Make the **smallest diff** that solves the problem. Surgical over sweeping.
- **Stay inside the scope I gave you.** If you spot unrelated problems, mention them
  — don't fix them in the same change without asking.
- **Preserve public behavior and interfaces** unless I asked you to change them.
- **Run/inspect what's affected** before declaring done: tests, type-check, lint,
  or at minimum re-read the diff and trace the change end-to-end.
- If you genuinely need a larger refactor to do it right, **stop and propose it**
  with the trade-offs, and let me choose.

---

## 4. Design-to-code (Figma) handoff

When building from a Figma file:

- Read the file's **"DEV CONTEXT" frame / description first** — it carries the
  intended tokens, components, states, and rules. Follow it over your defaults.
- **Map tokens to tokens:** Figma Variables → CSS variables / theme. Never hardcode
  a color, font, or spacing value that exists as a token.
- **Map components to components:** a Figma component with variants becomes one
  reusable code component with props/variants — not duplicated markup per instance.
- **Auto-layout → real layout** (flex/grid), not absolute positioning, unless the
  design truly requires it.
- **If the design is missing something** (FAQ answers, form fields, link targets,
  real images, alt text, behavior of a carousel/accordion), **don't invent or stub
  it** — list what's missing and ask. This is the same rule as "don't fake done."
- Match the breakpoints and responsive rules in the DEV CONTEXT (e.g. desktop 1440,
  tablet 1024/768, mobile 375; cards stack on mobile).
- **After building, verify fidelity.** Run the protocol in `FIGMA-FIDELITY-QA.md`
  — the post-build bookend to the gap-scan — before declaring done: pull the Figma
  render per section, compare side-by-side, enumerate every component (not just the
  hero/big sections), and report the gate results. Don't report done while a
  non-TODO gate is red. The `figma-fidelity-qa` skill executes this if installed.

---

## 5. Accessibility & basics (don't skip silently)

- Semantic HTML, correct heading order, labels on inputs, alt text on images.
- Keyboard-operable interactive elements; visible focus states.
- Aim for WCAG AA contrast. If a design token fails AA, flag it rather than
  shipping it quietly.

---

## 6. Write so the next person can find their way

Assume a human engineer (or you, in a fresh session with zero memory) will have to
support, debug, or extend this later. Optimize for **reading and searching**, not
just for running. The bar is "someone new can navigate this without a tour" — not
"every line is annotated."

- **Greppable naming.** Same concept = same word everywhere. If it's a "rental",
  don't call it `rental`, `booking`, and `order` in three places — a search should
  land on all of it. Prefer descriptive over clever or abbreviated names.
- **Light signposting.** A one-line comment at the top of a non-obvious block
  saying what it's for and why is worth a lot. Group related code together and keep
  a clear entry point. Don't narrate self-explanatory lines — that's the noise to
  avoid.
- **Flag the non-obvious, not the obvious.** Leave a short note where someone could
  reasonably get it wrong: workarounds, gotchas, "this looks odd but is intentional
  because X", or an external constraint. This stops the next person (or you) from
  "fixing" something that was deliberate, and saves time when things break.
- **Make failures searchable.** Error messages and logs should be specific and
  carry enough context (what failed + the key values) that debugging is a search,
  not a hunt. Avoid generic "something went wrong".
- **One-line orientation for non-trivial additions.** A brief "where this lives /
  how it connects to the rest" note — in the change summary or a short comment at
  the entry point — beats making the next person reverse-engineer it.
- **Keep labeling honest and current.** A comment that drifts out of sync with the
  code is worse than none. If the code is genuinely self-explanatory, let it be.

## 7. Keep a change log (DEVLOG.md)

Maintain a `DEVLOG.md` at the repo root as a human-readable record of what was done
and why. This is **not** a replacement for git — git already holds the exact per-edit
diffs and timestamps. The log captures the part git doesn't: intent, session
narrative, and anything that'll help trace a break later.

- **Append one entry per meaningful change or task**, not per keystroke (git covers
  the fine grain). Newest entry at the top. Never rewrite or delete past entries —
  it's append-only history.
- **Keep entries short by default** using the format in `DEVLOG.md`: date/time,
  a title, the intent, what changed (files/areas), and notes on anything stubbed,
  risky, or left as a "missing spec".
- **Go deep only when it's worth it.** When debugging a break, a loop, or a
  regression, add an "Investigation" block: what broke, when it likely started
  (cite the commit/date if known), what you ruled out, and the fix. That's the
  payoff — months later this is how you or a human finds the thread.
- **Never log secrets** (keys, tokens, credentials, customer data).
- Get the timestamp from the system clock; don't guess it.

If I ask for it later, this can be automated to append on every edit via a hook —
but the default is intent-level entries you write as you work.

## 8. Security & access governance (GOVERNANCE.md)

Maintain a `GOVERNANCE.md` at the repo root as a living map of the project's tools,
integrations, access, and security posture — the document a CIO or security reviewer
can open to understand the surface and where to start. It is a **register, not a
vault**: it records *where* secrets live and *who* has access, never the secrets
themselves.

Whenever a change touches the security/access surface, update `GOVERNANCE.md` in the
same change and flag it to me. That includes:

- **Adding or removing a dependency** (new supply-chain surface).
- **Adding or changing an integration / API / MCP connector / third-party service.**
- **Introducing a new secret, env var, key, or credential requirement** (record its
  name and where it's stored — never its value).
- **Changing an auth scope or permission** (broader access, new role, new token
  scope).
- **Adding an external network call or new data flow**, especially anything that
  sends data off the machine or touches personal/customer data.

Rules:

- **Never commit secrets** (keys, tokens, credentials, `.env` contents). If you need
  one, reference it by name and note it belongs in the secret store / env.
- When you add something with a security implication you can't fully resolve, **don't
  silently proceed** — add it to the "Needs review" backlog in `GOVERNANCE.md` and
  tell me, so a human can make the call.
- Keep an append-only change register at the bottom of `GOVERNANCE.md` (date + what
  changed on the surface) so changes over time are auditable.

## 9. Secure by default

Build as if the app will be attacked, because it will be. Follow the baseline in
`SECURITY-PRACTICES.md`. Non-negotiables:

- **Authorization server-side, deny by default.** Every sensitive action and data
  access is checked on the server against the user's permissions. Never trust the
  client to enforce access. No action is allowed unless explicitly permitted.
- **No hardcoded or default admin accounts/credentials.** Privileged accounts are
  created through a gated, audited path — never seeded in code or left at defaults.
- **Least privilege everywhere** — users, roles, tokens, and connectors get the
  minimum access they need, nothing more.
- **Validate input, parameterize queries, encode output.** No string-built SQL/shell
  commands, no raw HTML injection. Assume all input is hostile.
- **Protect data.** TLS in transit; encrypt sensitive data at rest; collect the
  minimum personal data needed; log access to sensitive data.
- **Keep secrets and proprietary logic server-side.** Never ship them in client code.
  Assume anything in the browser is public.
- **No security by obscurity.** These context files are not a security control —
  repo access control is. Never put secrets, credentials, or exploit/bypass details
  in any committed file (including CLAUDE.md, GOVERNANCE.md, DEVLOG.md).
- **Don't leave silent holes.** If you introduce or notice a potential vulnerability,
  record it per `SECURITY-PRACTICES.md` (posture/status in-repo, exploit detail only
  in the private tracker) and flag it to me. Don't quietly ship something exploitable.

This is a baseline, not a substitute for a professional security review — for
anything handling real personal or payment data, tell me a proper audit is warranted.

## 10. When you finish

Give me a short, honest summary: what changed, anything you couldn't do, anything
you stubbed or left as a "missing spec" comment, and anything you'd recommend as a
follow-up (including "want a skill/linter for this?"). Don't oversell it — if it's
partial, say so.
