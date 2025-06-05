import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   compiler: {
    emotion: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com','res.cloudinary.com'],
  },
};

export default nextConfig;
