type Bucket = { tokens: number; updated: number };

const BUCKETS = new Map<string, Bucket>();
const CAPACITY = 5;
const REFILL_MS = 60_000;

/**
 * Token bucket per IP. In memory on purpose: it resets on a cold start, which
 * is fine for the traffic these two routes see and keeps the site dependency
 * free, as the brief asks.
 */
export function allow(ip: string): boolean {
  const now = Date.now();
  const bucket = BUCKETS.get(ip) ?? { tokens: CAPACITY, updated: now };

  const refill = ((now - bucket.updated) / REFILL_MS) * CAPACITY;
  bucket.tokens = Math.min(CAPACITY, bucket.tokens + refill);
  bucket.updated = now;

  if (bucket.tokens < 1) {
    BUCKETS.set(ip, bucket);
    return false;
  }

  bucket.tokens -= 1;
  BUCKETS.set(ip, bucket);
  return true;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
