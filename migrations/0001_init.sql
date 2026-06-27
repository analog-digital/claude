-- Box It Up Storage — CMS / CRM schema (Cloudflare D1 / SQLite)

-- Editable page content. One row per section; `data` holds the section's JSON
-- payload (same shape as the defaults in lib/content.ts). The public site reads
-- these and falls back to the bundled defaults when a key is missing.
CREATE TABLE IF NOT EXISTS sections (
  key        TEXT PRIMARY KEY,
  data       TEXT NOT NULL,            -- JSON
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_by TEXT
);

-- Inquiry / "Request a Quote" form submissions from the public site.
CREATE TABLE IF NOT EXISTS submissions (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  name       TEXT,
  email      TEXT,
  phone      TEXT,
  box_size   TEXT,
  service    TEXT,
  message    TEXT,
  source     TEXT,                     -- which page/form the submission came from
  status     TEXT NOT NULL DEFAULT 'new',  -- new | contacted | won | archived
  raw        TEXT                      -- full raw payload (JSON), for safety
);
CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions (status);

-- Onboarded clients (platform expansion). Created when someone completes the
-- onboarding flow; stripe_* fields populate once live payments are wired.
CREATE TABLE IF NOT EXISTS clients (
  id                     INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at             TEXT NOT NULL DEFAULT (datetime('now')),
  name                   TEXT NOT NULL,
  email                  TEXT NOT NULL,
  phone                  TEXT,
  plan                   TEXT,         -- e.g. "Daily Mini Storage"
  box_size               TEXT,
  monthly_amount_cents   INTEGER,      -- billed amount in cents
  status                 TEXT NOT NULL DEFAULT 'pending', -- pending | active | past_due | canceled
  stripe_customer_id     TEXT,
  stripe_subscription_id TEXT,
  submission_id          INTEGER,      -- optional link to originating submission
  notes                  TEXT,
  FOREIGN KEY (submission_id) REFERENCES submissions (id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_clients_created ON clients (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients (status);
