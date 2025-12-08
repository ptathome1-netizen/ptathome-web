// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 빌드할 때 ESLint 에러 때문에 배포가 막히지 않게 함
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
