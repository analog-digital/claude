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

## 2026-06-27 18:51 — Add engineering baseline docs + populate governance
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
