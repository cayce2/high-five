// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {

  
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: [
        'localhost', 'api.placeholder.com',
        'www.instagram.com',      // Main Instagram domain
        'instagram.com',          // Base Instagram domain
        'scontent.cdninstagram.com', // Instagram CDN for content
        'scontent-iad3-1.cdninstagram.com', // Regional Instagram CDN
        'scontent-iad3-2.cdninstagram.com',
        'graph.instagram.com',    // Instagram Graph API
        'cdninstagram.com',       // Base CDN domain
        'static.cdninstagram.com' // Static content CDN
      ],
      // Placeholder image configuration
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    // Enable TypeScript
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: false,
    },
    // Redirect configuration if needed
    async redirects() {
      return [];
    },
    // Header configuration for security
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
          ],
        },
      ];
    },
  }
  
  module.exports = nextConfig;