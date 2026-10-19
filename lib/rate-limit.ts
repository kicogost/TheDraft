type Bucket = { tokens: number; updated: number };

const BUCKETS = new Map<string, Bucket>();
const CAPACITY = 5;
const REFILL_MS = 60_000;

/**
 * Token bucket per IP and route. In memory on purpose: it resets on a cold
 * start, which is fine for the traffic these routes see and keeps the site
 * dependency free, as the brief asks.
 *
 * The bucket is keyed by route as well as address because one person signing
 * up and then answering the questions on the thank you page touches two
 * routes, and a single shared bucket spent their signup budget on the answers.
 */
export function allow(ip: string, route = "default"): boolean {
  const key = `${route}:${ip}`;
  const now = Date.now();
  const bucket = BUCKETS.get(key) ?? { tokens: CAPACITY, updated: now };

  const refill = ((now - bucket.updated) / REFILL_MS) * CAPACITY;
  bucket.tokens = Math.min(CAPACITY, bucket.tokens + refill);
  bucket.updated = now;

  if (bucket.tokens < 1) {
    BUCKETS.set(key, bucket);
    return false;
  }

  bucket.tokens -= 1;
  BUCKETS.set(key, bucket);
  return true;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
