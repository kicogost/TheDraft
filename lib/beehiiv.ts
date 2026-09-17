const API = "https://api.beehiiv.com/v2";
const TIMEOUT_MS = 8000;

type SubscribeInput = {
  email: string;
  /** Where on the site the signup came from, e.g. "homepage" or a slug. */
  medium: string;
  campaign?: string;
  sendWelcomeEmail?: boolean;
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
      utm_source: "website",
      utm_medium: input.medium,
      ...(input.campaign ? { utm_campaign: input.campaign } : {}),
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
