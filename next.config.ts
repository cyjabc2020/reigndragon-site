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
    ],
  },
};

export default nextConfig;
