# Claude Engineering Baseline

A small set of files that make Claude Code build clean, avoid breaking things, stay
navigable for a human, and follow security/governance basics — and keep living logs
as it works.

## What's in here

| File | What it does |
|------|--------------|
| `CLAUDE.md` | The core rulebook Claude Code reads automatically. Build clean (no slop), don't break working code, write for the next human, keep a change log, maintain governance, secure by default. |
| `DEVLOG.md` | Append-only, intent-level record of what changed and *why* — the trail for investigating breaks later. |
| `GOVERNANCE.md` | Living map of tools, integrations, access, and where secrets live (names only, never values). The "start here" doc for a security reviewer. |
| `SECURITY-PRACTICES.md` | Baseline security practices + a safe way to track security posture (exploit details stay in a private tracker, not in the repo). |
| `FIGMA-GAP-SCAN.md` | How to scan a Figma file for missing context, plus a final fill-in prompt to hand Figma AI listing exactly what to add or clarify before a build. |
| `FIGMA-FIDELITY-QA.md` | Post-build QA: compares the built page against the Figma render section-by-section with measurable gates, to catch where the code drifts from the design. The post-build bookend to the gap-scan; pairs with the `figma-fidelity-qa` skill. |

These interlock: the rulebook tells Claude how to work; the other three are the
artifacts it maintains.

---

## Make Claude Code use this on EVERY project (global, one-time)

Claude Code automatically loads a global memory file for all projects:

1. Create the folder if needed and copy the rulebook there:
   - macOS/Linux: `~/.claude/CLAUDE.md`
   - (You can point `CLAUDE_CONFIG_DIR` elsewhere if you customize your setup.)

   ```
   mkdir -p ~/.claude
   cp CLAUDE.md ~/.claude/CLAUDE.md
   ```

   Global + project CLAUDE.md files are **concatenated**, not overridden — so this
   baseline applies everywhere, and any project can add its own `CLAUDE.md` on top.

2. (Optional but recommended) Keep the companion templates handy so Claude can
   scaffold them into projects:

   ```
   mkdir -p ~/.claude/templates
   cp DEVLOG.md GOVERNANCE.md SECURITY-PRACTICES.md ~/.claude/templates/
   ```

3. Restart Claude Code (memory loads at session start). Run `/memory` to confirm the
   global file is listed.

The rulebook's **"Project bootstrap"** note tells Claude to create the companion
files in any repo that's missing them — so on a new project, just start working and
ask Claude to "set up the engineering baseline files," or it will per the bootstrap
rule.

> Note: there's no built-in feature that auto-copies companion files from global —
> the bootstrap instruction in CLAUDE.md is what drives Claude to create them. Keep
> the templates in `~/.claude/templates/` so it has a source to copy from.

---

## Add this to an EXISTING project

1. In the project, run `/memory` to see what's already loaded.
2. Copy the four files into the repo root:

   ```
   cp CLAUDE.md DEVLOG.md GOVERNANCE.md SECURITY-PRACTICES.md /path/to/your/repo/
   ```

   - If the repo already has a `CLAUDE.md`, don't clobber it — open it via `/memory`
     and merge in the sections you want, or keep project-specifics in the project
     file and let the global one carry the baseline.
3. Restart the session so the files load.
4. Ask Claude to fill in the project-specific blanks: the `GOVERNANCE.md` inventory
   (tools, access, secrets-location, data flows) and the `SECURITY-PRACTICES.md`
   posture table. These ship seeded with `❓` placeholders on purpose.

`/init` can also auto-generate a project `CLAUDE.md` from your codebase — useful if
you want a project-specific file alongside the global baseline.

---

## Install the fidelity-QA skill (optional but recommended)

`FIGMA-FIDELITY-QA.md` is the protocol of record; the **`figma-fidelity-qa` skill** is
the executable version (carries the JS probes and the self-correcting loop). If your
team uses Claude Code skills, install it so a Figma build can QA itself:

```
mkdir -p ~/.claude/skills
cp -R skills/figma-fidelity-qa ~/.claude/skills/
```

Claude Code auto-discovers it by its description — ask it to "QA this page against
Figma" or "check fidelity," and it runs. Needs the Figma MCP + a browser tool
(Claude in Chrome) connected to do the visual diff.

---

## A few honest notes

- These files raise the floor; they don't guarantee perfection. Their value comes
  from the first real fill-in (especially GOVERNANCE and the security posture table)
  and from actually following them.
- Never put secrets or exploit details in any of these files. Repo access control is
  the security boundary — not hiding files.
- For anything handling real personal or payment data, get a professional security
  review. This baseline is a starting point, not a substitute.
