import { getResource, getResources } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, resourceCard } from "@/lib/og";

export const alt = "A free resource from Francisco Gost";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getResources().map((resource) => ({ slug: resource.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) throw new Error(`Unknown resource: ${slug}`);

  return resourceCard(resource.kicker, resource.title, resource.description);
}
