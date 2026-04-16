import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? "/3Xampleca" : "",
  assetPrefix: isGithubPages ? "/3Xampleca/" : undefined,
};

export default nextConfig;
