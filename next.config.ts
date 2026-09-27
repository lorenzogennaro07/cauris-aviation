import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: { qualities: [75, 85] },
  devIndicators: false,
  async headers() {
    return [{
      source: process.env.VERCEL_ENV === "preview" ? "/:path*" : "/api/:path*",
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }];
  },
};
export default nextConfig;
