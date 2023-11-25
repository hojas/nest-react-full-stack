const { composePlugins, withNx } = require('@nx/next')

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  publicRuntimeConfig: {
    apiBaseUrl: process.env.WEB_API_BASE_URL,
  },
}

const plugins = [
  withNx,
]

module.exports = composePlugins(...plugins)(nextConfig)
