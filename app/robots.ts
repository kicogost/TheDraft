import type { MetadataRoute } from "next";
import { getSite } from "@/lib/content";

/**
 * The API routes are disallowed so the signed download links never end up in an
 * index, which would hand the gated PDFs out without an email.
 */
export default function robots(): MetadataRoute.Robots {
  const site = getSite();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/thank-you"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
