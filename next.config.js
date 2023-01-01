/** @type {import('next').NextConfig} */
module.exports = {
  source: "/",
  reactStrictMode: true,
  experimental: { esmExternals: true },
  env: {
    NETLIFY_NEXT_PLUGIN_SKIP: true,
  },
  publicRuntimeConfig: {},
  devIndicators: {
    buildActivity: false,
  },
}