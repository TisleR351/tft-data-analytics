/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/riot-api/europe/:path*',
        destination: 'https://europe.api.riotgames.com/:path*',
      },
      {
        source: '/riot-api/euw1/:path*',
        destination: 'https://euw1.api.riotgames.com/:path*',
      },
      {
        source: '/dragontail/:path*',
        destination: `/dragontail-${process.env.NEXT_PUBLIC_TFT_VERSION}/${process.env.NEXT_PUBLIC_TFT_VERSION}/:path*`,
      },
    ];
  },
  images: {
    domains: ['rerollcdn.com'],
  },
};

export default nextConfig;
