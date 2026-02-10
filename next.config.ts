import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request");

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // basePath: '/repo-name', // Eğer site root domain (kullaniciadi.github.io) değilse burayı açın ve repo adını yazın
};

export default withNextIntl(nextConfig);
