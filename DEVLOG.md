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

## 2026-06-27 — DEVLOG started
- Intent: establish an intent-level change log alongside git, per CLAUDE.md §7.
- Changed: added DEVLOG.md, added CLAUDE.md §7 describing how to use it.
- Notes: log entries are append-only and intent-level by default; per-edit
  automation via hook is available later if wanted.
