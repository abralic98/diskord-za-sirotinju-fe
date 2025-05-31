import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["fra.cloud.appwrite.io"],
    //samo zbog jebenog dockera dok en nadjem fix
    unoptimized: true,
  },
};

export default nextConfig;
