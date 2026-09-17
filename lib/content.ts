import site from "@/content/site.json";

export type NavLink = {
  label: string;
  href: string;
};

export type Site = typeof site;

export function getSite(): Site {
  return site;
}

/**
 * Social links come out of content/site.json with empty values until Francisco
 * supplies them, so every consumer filters the blanks rather than rendering a
 * dead link.
 */
export function getSocialLinks(): NavLink[] {
  const labels: Record<string, string> = {
    linkedin: "LinkedIn",
    x: "X",
    youtube: "YouTube",
    instagram: "Instagram",
  };

  return Object.entries(site.social)
    .filter(([, href]) => href.length > 0)
    .map(([key, href]) => ({ label: labels[key] ?? key, href }));
}
