import { getSite } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, defaultCard } from "@/lib/og";

export const alt = "Francisco Gost, I turn overlooked people into hires";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  const { og } = getSite();
  return defaultCard(og.kicker, og.headline, og.supporting);
}
