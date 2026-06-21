import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow event cover images hosted on Partiful's image CDN
    // (used by app/events/events-data.ts for external event flyers).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "partiful.imgix.net",
      },
      {
        // Substack post cover images (used by app/thoughts for synced posts).
        protocol: "https",
        hostname: "substackcdn.com",
      },
    ],
  },
};

export default nextConfig;
