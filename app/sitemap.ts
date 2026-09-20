import type { MetadataRoute } from "next";
import { getResources, getSite } from "@/lib/content";

/**
 * Only pages worth landing on from search. The thank you page is excluded on
 * purpose: it is a post conversion surface and carries a noindex of its own.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSite();
  const lastModified = new Date();

  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/portfolio", priority: 0.8 },
    { path: "/resources", priority: 0.8 },
    { path: "/call", priority: 0.7 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  const resources = getResources().map((resource) => ({
    path: `/resources/${resource.slug}`,
    priority: 0.9,
  }));

  return [...pages, ...resources].map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
