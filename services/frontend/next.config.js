/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*'
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
