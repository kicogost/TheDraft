import { createHmac, timingSafeEqual } from "node:crypto";

const TTL_MS = 30 * 60 * 1000;

function secret(): string {
  return process.env.RESOURCE_SIGNING_SECRET ?? "";
}

/** Signs a slug so the thank you page can reveal a download the form earned. */
export function signResource(slug: string): string {
  const expires = Date.now() + TTL_MS;
  const mac = createHmac("sha256", secret())
    .update(`${slug}.${expires}`)
    .digest("hex")
    .slice(0, 32);
  return `${expires}.${mac}`;
}

export function verifyResource(slug: string, token: string): boolean {
  if (!secret() || !token) return false;
  const [expiresRaw, mac] = token.split(".");
  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || Date.now() > expires || !mac) return false;

  const expected = createHmac("sha256", secret())
    .update(`${slug}.${expires}`)
    .digest("hex")
    .slice(0, 32);

  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
