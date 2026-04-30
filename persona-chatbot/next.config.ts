import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow local /avatars images (no external domains needed)
    unoptimized: false,
  },
};

export default nextConfig;
