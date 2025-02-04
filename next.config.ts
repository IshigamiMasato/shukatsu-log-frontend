import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // 2度トークンリフレッシュAPIを叩かれるとバグるため
  /* config options here */
};

export default nextConfig;
