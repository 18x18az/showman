/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development'
  }
}

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true
})

module.exports = withPWA(nextConfig)
