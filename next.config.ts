import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   compiler: {
    emotion: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

export default nextConfig;
