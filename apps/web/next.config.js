// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')

// const CDN = 'https://static.chenyuanxiang.com/web/'
// const isProd = process.env.NODE_ENV === 'production'

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  publicRuntimeConfig: {
    apiBaseUrl: process.env.NX_AXIOS_BASE_URL,
    baiduKey: process.env.NX_BAIDU_TONGJI_KEY,
  },
  // assetPrefix: isProd ? CDN : undefined,
}

module.exports = withNx(nextConfig)
