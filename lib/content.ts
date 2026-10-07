import about from "@/content/about.json";
import call from "@/content/call.json";
import legal from "@/content/legal.json";
import newsletterPage from "@/content/newsletter.json";
import dm from "@/content/resources/chief-of-staff-dm.json";
import first30 from "@/content/resources/first-30-days.json";
import builder from "@/content/builder.json";
import site from "@/content/site.json";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export type Site = typeof site;
export type About = typeof about;

export function getSite(): Site {
  return site;
}

export function getAbout(): About {
  return about;
}

export type NewsletterPage = typeof newsletterPage;

export function getNewsletterPage(): NewsletterPage {
  return newsletterPage;
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
  /** Retired resources stay reachable by URL but are no longer promoted. */
  retired?: boolean;
  resourceUrl: string;
  automationId: string;
  /** Repo-relative path to the gated file, served only by the download route. */
  deliverable?: string;
};

/** Newest first, which is the order the nav dropdown reads as a changelog. */
const RESOURCES: Resource[] = [first30, dm];

/**
 * Live resources only. A retired resource keeps its page and its download
 * route so that links in emails already sent still work, but it disappears
 * from the nav, the index, the sitemap and the "more resources" list.
 */
export function getResources(): Resource[] {
  return RESOURCES.filter((entry) => !entry.retired);
}

/** Includes retired resources. Used where a page must still render. */
export function getAllResources(): Resource[] {
  return RESOURCES;
}

export function getResource(slug: string): Resource | undefined {
  return RESOURCES.find((entry) => entry.slug === slug);
}

export function getOtherResources(slug: string): Resource[] {
  return getResources().filter((entry) => entry.slug !== slug);
}

export function getCall() {
  return call;
}

export type LegalDocument = {
  title: string;
  lead: string;
  sections: { heading: string; body: string[] }[];
};

export function getLegal(doc: "privacy" | "terms"): LegalDocument & { updated: string } {
  return { ...legal[doc], updated: legal.updated };
}

export type StageOption = { value: string; label: string };
export type StageQuestion = typeof site.stageQuestion;

export function getStageQuestion(): StageQuestion {
  return site.stageQuestion;
}

/**
 * Never trust the posted value. Only a value declared in content/site.json is
 * stored, so a tampered form cannot write arbitrary data onto a subscriber.
 */
export function validStage(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  return site.stageQuestion.options.some((o) => o.value === value) ? value : undefined;
}

export type Builder = typeof builder;

export function getBuilder(): Builder {
  return builder;
}

export function getThankYou() {
  return site.thankYou;
}
