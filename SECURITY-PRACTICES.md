# SECURITY PRACTICES

Baseline security practices for this project — what we build to, and how we track
security posture safely. Pairs with CLAUDE.md §9.

This file is **safe to keep in the repo**: it contains practices and posture, not
secrets and not exploit details. The genuinely sensitive material (open
vulnerabilities, exploit specifics) lives in an access-controlled place — see §9.

---

## 0. Principles (read first)

- **Defense in depth, not obscurity.** Hiding files, renaming things, or minifying
  code is not security. Real controls are access control, server-side authorization,
  encryption, and least privilege. Assume an attacker knows exactly how the system
  is built — it should still hold.
- **You can't make shipped client code un-inspectable.** Anything that runs in the
  user's browser/app is effectively public. Protect value by keeping secrets and
  the logic that enforces rules **on the server**, not by obfuscating the client.
- **AI-built code is not magically hackable** because someone knows an AI wrote it.
  It does have characteristic weak spots (missing authz, permissive defaults,
  secrets in code, injection). The fix is review + scanning + the practices below.
- **Baseline, not a guarantee.** For anything handling real personal or payment
  data, get a professional security review / penetration test. This document does
  not replace one.

## 1. Access control & accounts (stop rogue admins / data snooping)

- **Server-side authorization on every sensitive action**, checked against the
  user's role/permissions. The client is never trusted to enforce access.
- **Deny by default** — nothing is accessible unless explicitly granted.
- **No hardcoded, default, or seeded admin accounts.** Privileged accounts are
  created through a gated, audited flow only.
- **Least privilege** for users, roles, service accounts, API tokens, and connectors.
- **Strong auth**: enforce good password handling (hashing, e.g. bcrypt/argon2),
  support MFA for privileged accounts, expire/rotate sessions and tokens.
- **Audit log** privileged and sensitive actions: admin creation, role changes,
  access to personal data, bulk exports. Make these reviewable.

## 2. Secrets management

- Secrets live in environment variables or a secret manager — **never in code or
  committed files.** Confirm `.gitignore` covers `.env` and credential files.
- Reference secrets by name in docs; never paste values.
- Rotate keys on a schedule and immediately if exposure is suspected.

## 3. Input & output safety

- Treat all input as hostile. Validate and sanitize on the server.
- Parameterized queries / prepared statements — never string-built SQL.
- No shell command construction from user input.
- Encode/escape output to prevent XSS; set sensible security headers and a Content
  Security Policy for web apps.

## 4. Data protection & privacy

- TLS everywhere in transit; encrypt sensitive data at rest.
- **Data minimization** — collect and retain the least personal data needed.
- Restrict who/what can read personal data; log access to it.
- Have a deletion/retention policy for personal data.

## 5. Dependencies & supply chain

- Track dependencies with a lockfile; enable automated vulnerability scanning
  (e.g. Dependabot, `npm audit` / `pip-audit`).
- Review and patch known-vulnerable dependencies promptly.

## 6. IP protection

- Keep proprietary code in a **private repository** with enforced access control.
- Keep secrets and core/proprietary logic **server-side**; expose only what the
  client must have.
- Protect legally where it matters: proprietary license, contributor terms, NDAs.
- Accept the limit: shipped client code can be reverse-engineered. Don't rely on
  hiding it — rely on the crown jewels never leaving the server.

## 7. AI / agent-specific surface

- Review what each AI tool / MCP connector can read and send; least privilege there
  too (cross-reference GOVERNANCE.md §1, §6).
- Don't let an agent commit secrets, exfiltrate data, or widen access without it
  being recorded and flagged.
- Run a slop/quality + security scan on AI-written changes before shipping
  (e.g. the deterministic scanners we discussed) — they catch the common weak spots.

## 8. Logging & monitoring

- Centralize logs for sensitive actions; alert on anomalies (e.g. repeated failed
  admin logins, unexpected data exports).
- Logs must not contain secrets or full personal data.

---

## 9. Vulnerability tracking — do this safely

A list of open, unpatched vulnerabilities is itself sensitive. So:

- **In this repo (safe):** keep only the *posture table* below — area, whether a
  control is in place, last reviewed. No exploit details, no "how to bypass" notes.
- **Access-controlled (sensitive):** open vulnerabilities, reproduction steps, and
  exploit detail go in a **private** issue tracker / security project that only
  authorized people can see — never in a committed file.
- When a vulnerability is found: record it privately, assess severity, fix or
  mitigate, then update the posture table here once resolved. Flag it to the owner.

### Security posture (safe to keep in repo)

> Legend: ✅ in place · ⚠️ partial / needs work · ❓ not yet assessed

| Area | Control in place? | Last reviewed | Notes (non-sensitive) |
|------|-------------------|---------------|-----------------------|
| Server-side authorization (deny by default) | ✅ | 2026-06-27 | Admin pages + server actions call `requireAuth()`; unauthed → redirect to login. Public API only writes submissions. |
| No default/seeded admin accounts | ⚠️ | 2026-06-27 | No account seeded in code, but auth is a single shared password (not per-user/gated). |
| Least privilege (users/tokens/connectors) | ⚠️ | 2026-06-27 | Admin is all-or-nothing; CF token scope unconfirmed; Supabase service_role over-privileged + exposed (GOVERNANCE §7). |
| Secrets out of code, in secret store | ⚠️ | 2026-06-27 | App secrets in Worker store ✅; **Supabase service_role key committed in `.mcp.json`** (GOVERNANCE §7). |
| Input validation / parameterized queries | ✅ | 2026-06-27 | `/api/inquire` validates + honeypot; all D1 queries use `.bind()` parameterization. |
| TLS + encryption at rest | ⚠️ | 2026-06-27 | TLS via Cloudflare ✅; D1 at-rest encryption is Cloudflare-managed (not app-controlled). |
| PII minimized + access logged | ⚠️ | 2026-06-27 | Only needed contact fields collected; no access logging or retention policy yet. |
| Dependency vulnerability scanning | ⚠️ | 2026-06-27 | None configured; `npm audit` = 4 moderate advisories. |
| Audit logging of sensitive actions | ⚠️ | 2026-06-27 | No audit log for admin actions or PII access. |
| AI/MCP connector permissions reviewed | ⚠️ | 2026-06-27 | Supabase MCP uses an exposed service_role key (GOVERNANCE §7); other connectors are session-level. |

### Posture change register (append-only, non-sensitive)

```
## YYYY-MM-DD — area: what changed in posture (control added/hardened/reviewed)
```

## 2026-06-27 — Posture table assessed against current build
- Performed first real assessment (see table). Strengths: server-side authz
  (deny-by-default) and parameterized D1 queries. Gaps flagged: committed Supabase
  service_role key, single shared admin credential (no MFA/audit), no dependency
  scanning, no PII access logging. Detail + backlog in GOVERNANCE §7.

## 2026-06-27 — Practices established
- Created SECURITY-PRACTICES.md and CLAUDE.md §9.
