import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Abaikan semua error ESLint ketika build
    ignoreDuringBuilds: true,
  },
  compiler: {
    // ✅ Aktifkan dukungan styled-components (jika dipakai)
    styledComponents: true,
  },
};

export default nextConfig;
