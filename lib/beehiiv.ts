import type { Utm } from "./utm";

const API = "https://api.beehiiv.com/v2";
const TIMEOUT_MS = 8000;
const SITE = "https://franciscogost.com";

type SubscribeInput = {
  email: string;
  /** Where on the site the signup came from, e.g. "homepage" or a slug. */
  medium: string;
  campaign?: string;
  sendWelcomeEmail?: boolean;
  /** Publication level custom fields, e.g. the stage question on the forms. */
  customFields?: Record<string, string>;
  /**
   * Tags from the link the visitor arrived on. When present they replace the
   * site defaults, so a signup from the Instagram bio reads as instagram / bio
   * in beehiiv rather than website / newsletter.
   */
  utm?: Utm;
  /** The page the form sat on. Keeps the location once utm has replaced it. */
  path?: string;
};

export type SubscribeResult =
  | { ok: true; skipped?: boolean }
  | { ok: false; reason: "config" | "rejected" | "network" };

function config() {
  return {
    key: process.env.BEEHIIV_API_KEY ?? "",
    publication: process.env.BEEHIIV_PUBLICATION_ID ?? "",
    enabled: process.env.BEEHIIV_ENABLED !== "false",
  };
}

async function call(path: string, body: unknown): Promise<Response> {
  const { key } = config();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(`${API}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Creates or reactivates a subscription. beehiiv error bodies never reach the
 * client: the caller gets a reason code and writes its own message.
 */
export async function subscribe(
  input: SubscribeInput,
): Promise<SubscribeResult> {
  const { key, publication, enabled } = config();

  if (!enabled) return { ok: true, skipped: true };
  if (!key || !publication) {
    console.warn("beehiiv is not configured, signup accepted but not stored");
    return { ok: false, reason: "config" };
  }

  try {
    const response = await call(`/publications/${publication}/subscriptions`, {
      email: input.email,
      reactivate_existing: true,
      send_welcome_email: input.sendWelcomeEmail ?? true,
      utm_source: input.utm?.source ?? "website",
      utm_medium: input.utm?.medium ?? input.medium,
      ...(input.utm?.campaign || input.campaign
        ? { utm_campaign: input.utm?.campaign ?? input.campaign }
        : {}),
      ...(input.path ? { referring_site: `${SITE}${input.path}` } : {}),
      ...(input.customFields && Object.keys(input.customFields).length
        ? {
            custom_fields: Object.entries(input.customFields).map(
              ([name, value]) => ({ name, value }),
            ),
          }
        : {}),
    });

    if (!response.ok) {
      console.warn("beehiiv rejected a subscription", response.status);
      return { ok: false, reason: "rejected" };
    }
    return { ok: true };
  } catch (error) {
    console.warn("beehiiv call failed", error);
    return { ok: false, reason: "network" };
  }
}

/**
 * Starts a resource specific automation journey. Optional: a resource with no
 * automation still returns ok, so the site never breaks on a missing id.
 */
export async function startJourney(
  automationId: string,
  email: string,
): Promise<boolean> {
  const { key, publication, enabled } = config();
  if (!enabled || !automationId || !key || !publication) return false;

  try {
    const response = await call(
      `/publications/${publication}/automations/${automationId}/journeys`,
      { email },
    );
    if (!response.ok) {
      console.warn("beehiiv rejected a journey", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.warn("beehiiv journey failed", error);
    return false;
  }
}

export type Post = {
  title: string;
  subtitle: string;
  url: string;
  thumbnail: string;
  /** Unix seconds. */
  publishedAt: number;
};

/**
 * Published web posts, newest first. Cached for an hour by Next, so a new
 * issue reaches /content within the hour without a deploy. Returns an empty
 * list when beehiiv is off or unreachable, and the page shows its empty state.
 */
export async function listPosts(): Promise<Post[]> {
  const { key, publication, enabled } = config();
  if (!enabled || !key || !publication) return [];

  const params = new URLSearchParams({
    status: "confirmed",
    platform: "all",
    order_by: "publish_date",
    direction: "desc",
    limit: "50",
  });

  try {
    const response = await fetch(`${API}/publications/${publication}/posts?${params}`, {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) {
      console.warn("beehiiv rejected a posts request", response.status);
      return [];
    }
    const { data } = (await response.json()) as {
      data: {
        title: string;
        subtitle?: string;
        web_url: string;
        thumbnail_url?: string;
        publish_date: number;
      }[];
    };
    return data.map((post) => ({
      title: post.title.trim(),
      subtitle: post.subtitle?.trim() ?? "",
      url: post.web_url,
      thumbnail: post.thumbnail_url ?? "",
      publishedAt: post.publish_date,
    }));
  } catch (error) {
    console.warn("beehiiv posts call failed", error);
    return [];
  }
}

/**
 * Active subscribers, for the "Read by N founders" line. Cached for a week,
 * so the number on the site moves weekly without a deploy. Returns null when
 * beehiiv is off or unreachable, and the line drops the number.
 */
export async function getSubscriberCount(): Promise<number | null> {
  const { key, publication, enabled } = config();
  if (!enabled || !key || !publication) return null;

  try {
    const response = await fetch(`${API}/publications/${publication}?expand[]=stats`, {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: 60 * 60 * 24 * 7 },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) {
      console.warn("beehiiv rejected a stats request", response.status);
      return null;
    }
    const { data } = (await response.json()) as {
      data: { stats?: { active_subscriptions?: number } };
    };
    return data.stats?.active_subscriptions ?? null;
  } catch (error) {
    console.warn("beehiiv stats call failed", error);
    return null;
  }
}
