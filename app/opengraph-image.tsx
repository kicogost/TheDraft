import { getNewsletterPage } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { newsletterCard } from "@/lib/og-newsletter";

/**
 * The homepage is the newsletter, so its card is the newsletter card. Pages
 * without a card of their own (content, advertise, legal) inherit it too.
 */
export const alt = `The Draft by Francisco Gost: ${getNewsletterPage().shareCard.tagline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return newsletterCard();
}
