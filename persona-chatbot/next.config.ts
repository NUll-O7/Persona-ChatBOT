import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Use regular <img> tags for pixel art avatars — unoptimized to preserve pixelation
    unoptimized: true,
  },
};

export default nextConfig;
