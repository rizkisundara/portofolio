import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  ...(process.env.PAGES_BUILD === "true" && {
    output: "export",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
    images: { unoptimized: true },
  }),
};
export default config;
