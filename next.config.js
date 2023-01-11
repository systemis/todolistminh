/** @type {import('next').NextConfig} */
module.exports = {
  source: "/",
  reactStrictMode: true,
  experimental: { esmExternals: true, images: {
    unoptimized: true,
  }, },
  env: {
    NETLIFY_NEXT_PLUGIN_SKIP: true,
  },
  publicRuntimeConfig: {},
  devIndicators: {
    buildActivity: false,
  },
  assetPrefix: '.',
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/auth': { page: '/auth' },
    }
  },
}