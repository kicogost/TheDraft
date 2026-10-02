import { createHmac, timingSafeEqual } from "node:crypto";

const TTL_MS = 7 * 24 * 60 * 60 * 1000;

function secret(): string {
  return process.env.RESOURCE_SIGNING_SECRET ?? "";
}

function digest(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex").slice(0, 32);
}

function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/**
 * Short lived token for the thank you page, which the reader reaches straight
 * after submitting the form.
 */
export function signResource(slug: string): string {
  const expires = Date.now() + TTL_MS;
  return `${expires}.${digest(`${slug}.${expires}`)}`;
}

export function verifyResource(slug: string, token: string): boolean {
  if (!secret() || !token) return false;
  const [expiresRaw, mac] = token.split(".");
  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || Date.now() > expires || !mac) return false;
  return safeEqual(mac, digest(`${slug}.${expires}`));
}

/**
 * Non expiring key for the download route. An automation email may be opened
 * months after it arrives, so the link inside it cannot carry an expiry, but
 * the file still must not be reachable by guessing a path. Rotating
 * RESOURCE_SIGNING_SECRET invalidates every key ever issued.
 */
export function downloadKey(slug: string): string {
  return digest(`download.${slug}`);
}

export function verifyDownloadKey(slug: string, key: string): boolean {
  if (!secret() || !key) return false;
  return safeEqual(key, downloadKey(slug));
}

/**
 * Carries the verified email from the signup request to the follow up
 * questions on the thank you page. It travels in an httpOnly cookie rather
 * than the URL, so it never reaches browser history, the referrer header or
 * analytics. Short lived, because its only job is to survive one redirect.
 */
const SIGNUP_TTL_MS = 60 * 60 * 1000;

export function signSignup(email: string): string {
  const expires = Date.now() + SIGNUP_TTL_MS;
  return `${email}.${expires}.${digest(`signup.${email}.${expires}`)}`;
}

export function verifySignup(raw: string | undefined): string | undefined {
  if (!secret() || !raw) return undefined;
  // Cookies are percent encoded on write, so an address arrives as
  // name%40host. Decoding before splitting is what makes the digest match.
  let token: string;
  try {
    token = decodeURIComponent(raw);
  } catch {
    return undefined;
  }
  const parts = token.split(".");
  const mac = parts.pop();
  const expiresRaw = parts.pop();
  const email = parts.join(".");
  const expires = Number(expiresRaw);
  if (!email || !mac || !Number.isFinite(expires) || Date.now() > expires) return undefined;
  return safeEqual(mac, digest(`signup.${email}.${expires}`)) ? email : undefined;
}
