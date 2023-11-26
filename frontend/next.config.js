/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          'https://sofit-backend-deae0731d2dc.herokuapp.com/api/:path*'
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, immutable' // 1 year cache with immutability
          }
        ]
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Powered-By',
            value: 'Next.js' // Set to an empty string or remove to hide the X-Powered-By header
          },
          {
            key: 'Server',
            value: '' // Set to an empty string or remove to hide the Server header
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload' // Example for HSTS header
          }
          // Add more headers as needed
        ]
      }
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: [
      'www.edamam.com',
      'edamam-product-images.s3.amazonaws.com',
      'www.thecocktaildb.com'
    ]
  }
};

module.exports = nextConfig;
