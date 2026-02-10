import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true, // Fixes 404 errors on GitHub Pages routing
    basePath: '/amator_telsizcilik', // Necessary for GitHub Pages deployment
    images: {
        unoptimized: true,
    },
};

// Use explicit path for better CI compatibility
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
