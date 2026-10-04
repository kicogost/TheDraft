import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The download route reads these at runtime. Without this the tracer leaves
  // them out of the serverless bundle and every download 404s in production.
  outputFileTracingIncludes: {
    "/api/download/[slug]": ["./content/resources/files/*.pdf"],
    // Satori needs the real font files to draw the social cards.
    "/**/opengraph-image": ["./assets/fonts/*.ttf"],
  },
  async redirects() {
    return [
      // /portfolio was retired once the site narrowed to getting hired. It had
      // been linked from the nav and sitemap, so anything already indexed or
      // bookmarked lands on the homepage instead of a 404.
      { source: "/portfolio", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
