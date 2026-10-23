/**
 * Campaign tags carried from a tracked link (a LinkedIn featured link, an
 * Instagram bio link) through the signup form to beehiiv.
 *
 * Everything arriving here came from the visitor's address bar, so each value
 * is cut down to lowercase letters, digits, underscores and hyphens, and
 * capped in length. Anything else is dropped rather than repaired.
 */

export type Utm = { source?: string; medium?: string; campaign?: string };

const TAG = /^[a-z0-9_-]{1,50}$/;
const PATH = /^\/[a-z0-9/_-]{0,100}$/;

function clean(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const tag = value.trim().toLowerCase();
  return TAG.test(tag) ? tag : undefined;
}

export function cleanUtm(body: {
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
}): Utm {
  return {
    source: clean(body.utm_source),
    medium: clean(body.utm_medium),
    campaign: clean(body.utm_campaign),
  };
}

/** The page the form sat on, e.g. "/newsletter", or undefined if malformed. */
export function cleanPath(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const path = value.toLowerCase();
  return PATH.test(path) ? path : undefined;
}
