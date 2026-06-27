# GOVERNANCE — Security & Access Register

A living map of this project's tools, integrations, access, secrets, and data flows.
Purpose: a CIO / security / cyber reviewer can open this and understand the surface,
what's already handled, and where to start.

**This is a register, not a vault.** It records *where* secrets live and *who* has
access — never the secret values themselves. Keep it current: per CLAUDE.md §8, any
change to the security/access surface updates this file and the change register at
the bottom.

> Status legend: ✅ handled · ⚠️ needs review · ❓ unknown / needs owner input

---

## 1. Tools, services & integrations
What the project depends on or connects to, and what each can touch.

| Tool / Service | Purpose | Data it can access | Auth method | Owner | Status |
|----------------|---------|--------------------|-------------|-------|--------|
| _e.g. Figma_ | Design source / design-to-code | Design files | SSO / token | ❓ | ❓ |
| _e.g. Claude Code_ | AI coding agent | Repo files, configured MCP connectors | API key | ❓ | ❓ |
| _add each API, MCP connector, SaaS, hosting/CI service_ | | | | | |

## 2. Access & permissions
Who and what has access, and at what scope. Aim for least privilege.

| Identity / Role | What it can access | Scope / permission level | Notes | Status |
|-----------------|--------------------|--------------------------|-------|--------|
| _e.g. Admin_ | | | | ❓ |
| _e.g. CI service account_ | | | | ❓ |
| _e.g. Third-party connector token_ | | | | ⚠️ |

## 3. Secrets & configuration
Where secrets live — **names and storage location only, never values.**

| Secret / Key (name) | Used for | Where it's stored | Rotation cadence | Status |
|---------------------|----------|-------------------|------------------|--------|
| _e.g. STRIPE_API_KEY_ | Payments | Env / secret manager | ❓ | ⚠️ |
| | | | | |

- Secret storage location: ❓ (e.g. platform secret manager, `.env` ignored by git)
- `.env` / credentials excluded from git? ❓ (confirm `.gitignore` covers them)

## 4. Dependencies & supply chain
| Question | Answer / Status |
|----------|-----------------|
| How are dependencies tracked? | ❓ (package manager + lockfile) |
| Automated vulnerability scanning? | ❓ (e.g. Dependabot, npm/pip audit) |
| Review cadence for updates | ❓ |

## 5. Data flows & sensitivity
Where data goes, and whether any of it is personal/customer/sensitive.

| Data type | Sensitivity | Where it flows (in → store → out) | Third parties involved | Status |
|-----------|-------------|-----------------------------------|------------------------|--------|
| _e.g. customer contact info_ | PII | | | ⚠️ |
| _e.g. payment data_ | Sensitive | | | ⚠️ |

## 6. External / network access
Anything that calls out of the environment or sends data off-machine.

| What | Destination | Data sent | Why | Status |
|------|-------------|-----------|-----|--------|
| | | | | |

## 7. Needs review — start here (backlog for security/cyber)
The prioritized list of things to verify, tighten, or decide. This is the
"where to start" section for a reviewer.

- [ ] Confirm secrets are out of git and in a proper store (§3)
- [ ] Confirm least-privilege on all access and connector tokens (§2)
- [ ] Confirm vulnerability scanning is on for dependencies (§4)
- [ ] Map and classify any personal/customer data flows (§5)
- [ ] Review what each AI/MCP connector can read and send (§1, §6)
- [ ] _add items as the surface grows_

---

## Change register (append-only)
Newest at top. One line per change to the security/access surface: date + what
changed. Never edit or delete past entries.

```
## YYYY-MM-DD — what changed on the surface (tool/secret/scope/dependency/data flow)
```

## 2026-06-27 — Register created
- Established GOVERNANCE.md per CLAUDE.md §8. Sections seeded as templates; owner to
  fill in actual tools, access, secrets-location, and data flows.
