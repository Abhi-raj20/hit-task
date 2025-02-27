import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript : {
    ignoreBuildError : true
  },
  eslint : {
    ignoreDuringBuilds : true
  },
};

export default nextConfig;
