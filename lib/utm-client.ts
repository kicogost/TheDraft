const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const UTM_STORE = "draft-utm";

/**
 * The campaign tags from the link this visit started on. Read from the
 * address bar, and kept in sessionStorage so a reader who lands on one page
 * and signs up on another still counts against the link that brought them.
 * Browser only. The server cleans every value before it reaches beehiiv.
 */
export function readUtm(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }
  try {
    if (Object.keys(fromUrl).length) {
      sessionStorage.setItem(UTM_STORE, JSON.stringify(fromUrl));
      return fromUrl;
    }
    return JSON.parse(sessionStorage.getItem(UTM_STORE) ?? "{}");
  } catch {
    return fromUrl;
  }
}
