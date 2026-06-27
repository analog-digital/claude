/**
 * Minimal admin authentication for the CMS.
 *
 * A single admin password (Worker secret ADMIN_PASSWORD) is exchanged for an
 * HMAC-signed session cookie (signed with SESSION_SECRET). No DB rows, no
 * external service — sufficient for a single operator and easy to extend to
 * per-user accounts later.
 */
import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getEnv } from "./cms";

export const SESSION_COOKIE = "biu_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function b64urlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlToBytes(s: string): Uint8Array {
  const pad = s.length % 4 ? "=".repeat(4 - (s.length % 4)) : "";
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return b64urlEncode(new Uint8Array(sig));
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Build a signed token: base64url(JSON payload) + "." + signature. */
async function sign(secret: string): Promise<string> {
  const payload = b64urlEncode(
    new TextEncoder().encode(
      JSON.stringify({ sub: "admin", exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS })
    )
  );
  const sig = await hmac(secret, payload);
  return `${payload}.${sig}`;
}

async function verify(token: string, secret: string): Promise<boolean> {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = await hmac(secret, payload);
  if (!timingSafeEqual(sig, expected)) return false;
  try {
    const data = JSON.parse(new TextDecoder().decode(b64urlToBytes(payload)));
    return data.sub === "admin" && typeof data.exp === "number" && data.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

/** Verify the password and, if correct, set the session cookie. */
export async function login(password: string): Promise<boolean> {
  const env = getEnv();
  const expected = env.ADMIN_PASSWORD;
  const secret = env.SESSION_SECRET;
  if (!expected || !secret) throw new Error("Admin auth is not configured (missing secrets).");
  if (!password || !timingSafeEqual(password, expected)) return false;
  const token = await sign(secret);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return true;
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
}

/** True if the current request carries a valid admin session. */
export async function isAuthed(): Promise<boolean> {
  const env = getEnv();
  if (!env.SESSION_SECRET) return false;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verify(token, env.SESSION_SECRET);
}

/** Guard for protected admin pages/actions — redirects to login if not authed. */
export async function requireAuth() {
  if (!(await isAuthed())) redirect("/admin/login");
}
