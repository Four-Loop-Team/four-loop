import type { NextConfig } from 'next';
import { join } from 'path';

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  trailingSlash: true,

  sassOptions: {
    includePaths: [join(__dirname, 'styles')],
  },

  // SEO and Performance optimizations
  poweredByHeader: false,
  compress: true,

  // Image optimization (disabled for static export)
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Note: headers() and redirects() don't work with static export
  // These would need to be handled by your hosting provider
};

export default nextConfig;
