/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: 'edge',
  },
  swcMinify: true,
}

module.exports = nextConfig
