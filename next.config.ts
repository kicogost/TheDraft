import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The download route reads these at runtime. Without this the tracer leaves
  // them out of the serverless bundle and every download 404s in production.
  outputFileTracingIncludes: {
    "/api/download/[slug]": ["./content/resources/files/*.pdf"],
  },
};

export default nextConfig;
