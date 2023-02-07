const { withNx } = require('@nrwl/next/plugins/with-nx')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  publicRuntimeConfig: {
    apiBaseUrl: process.env.NX_AXIOS_BASE_URL,
  },
}

module.exports = withNx(nextConfig)
