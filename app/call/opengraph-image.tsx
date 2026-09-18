import { getSite } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, pageCard } from "@/lib/og";

const copy = getSite().og.pages.call;

export const alt = `Francisco Gost, ${copy.headline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return pageCard(getSite().og.kicker, copy.headline, copy.supporting);
}
