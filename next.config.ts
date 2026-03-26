import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["mir-s3-cdn-cf.behance.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/uc/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/d/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
