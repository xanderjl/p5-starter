/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => {
    return [
      {
        source: '/sketches',
        destination: '/',
      },
    ]
  },
}

module.exports = nextConfig
