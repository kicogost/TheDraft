import about from "@/content/about.json";
import call from "@/content/call.json";
import portfolio from "@/content/portfolio.json";
import dm from "@/content/resources/chief-of-staff-dm.json";
import first30 from "@/content/resources/first-30-days.json";
import site from "@/content/site.json";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type Site = typeof site;
export type About = typeof about;
export type Portfolio = typeof portfolio;

export function getSite(): Site {
  return site;
}

export function getAbout(): About {
  return about;
}

export function getPortfolio(): Portfolio {
  return portfolio;
}

/**
 * Social links come out of content/site.json with empty values until Francisco
 * supplies them, so every consumer filters the blanks rather than rendering a
 * dead link.
 */
export function getSocialLinks(): NavItem[] {
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

/**
 * The RallyUp booking link carries a per placement utm_content so the two
 * surfaces that point at it can be told apart in Cal.com.
 */
export function bookingUrl(placement: string): string {
  const base = site.company.bookingBase;
  if (!base) return "";
  const url = new URL(base);
  url.searchParams.set("utm_content", placement);
  return url.toString();
}


export type ResourceBlock = {
  type: string;
  text?: string;
  items?: string[];
};

export type Resource = {
  slug: string;
  template: string;
  title: string;
  description: string;
  kicker: string;
  formHeader: string;
  formEyebrow: string;
  submitLabel: string;
  disclosure?: string;
  insideLabel?: string;
  inside?: string[];
  blocks: ResourceBlock[];
  resourceUrl: string;
  automationId: string;
  /** Repo-relative path to the gated file, served only by the download route. */
  deliverable?: string;
};

/** Newest first, which is the order the nav dropdown reads as a changelog. */
const RESOURCES: Resource[] = [first30, dm];

export function getResources(): Resource[] {
  return RESOURCES;
}

export function getResource(slug: string): Resource | undefined {
  return RESOURCES.find((entry) => entry.slug === slug);
}

export function getOtherResources(slug: string): Resource[] {
  return RESOURCES.filter((entry) => entry.slug !== slug);
}

export function getCall() {
  return call;
}
