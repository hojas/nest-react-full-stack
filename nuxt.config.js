module.exports = {
  mode: 'universal',
  srcDir: 'src',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['view-design/dist/styles/iview.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/iview'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    ['@nuxtjs/eslint-module', { cache: true }],
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  dotenv: {
    path: '.',
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // add iview-loader
      const rules = config.module.rules.map(rule => {
        if (/vue/.test(rule.test.toString())) {
          return {
            test: rule.test,
            use: [
              {
                loader: rule.loader,
                options: rule.options,
              },
              {
                loader: 'iview-loader',
                options: {
                  prefix: true,
                },
              },
            ],
          }
        }
        return rule
      })
      config.module.rules = rules
    },
  },
}
