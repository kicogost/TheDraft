import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The download route reads these at runtime. Without this the tracer leaves
  // them out of the serverless bundle and every download 404s in production.
  outputFileTracingIncludes: {
    "/api/download/[slug]": ["./content/resources/files/*.pdf"],
    // Satori needs the real font files to draw the social cards.
    "/**/opengraph-image": ["./assets/fonts/*.ttf"],
    "/email/issue": ["./assets/fonts/*.ttf"],
  },
  async redirects() {
    return [
      // The newsletter became the homepage. Links in bios, posts and the
      // LinkedIn featured section still point at /newsletter, and Next keeps
      // the query string on a redirect, so their utm tags survive the hop.
      { source: "/newsletter", destination: "/", permanent: true },
      // /portfolio was retired once the site narrowed to getting hired. It had
      // been linked from the nav and sitemap, so anything already indexed or
      // bookmarked lands on the homepage instead of a 404.
      { source: "/portfolio", destination: "/", permanent: true },
      // /call sold a paid workshop and /message-builder was a tool, both
      // retired. The beehiiv site and older emails still point at them, so
      // they land somewhere useful instead of on a 404.
      { source: "/call", destination: "/resources/launch-playbook", permanent: true },
      {
        source: "/message-builder",
        destination: "/resources/chief-of-staff-dm",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
