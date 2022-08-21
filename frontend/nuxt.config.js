export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vue-portal',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/style.css', 'bulma/css/bulma.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios-accessor',
    '@/plugins/vee-validate.ts',
    // { src: '@/plugins/router-option.ts', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', 'nuxt-fontawesome', 'vue-sweetalert2/nuxt'],
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas'],
      },
    ],
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
  },
  srcDir: 'src/',
  axios: {
    proxy: true,
  },
  router: {
    middleware: ['router-option'],
  },
  proxy: {
    // proxy http://localhost:3030/api/hoge to http://localhost:3000/hoge
    '/api/': {
      target: 'http://localhost:3000',
      pathRewrite: { '^/api/': '/' },
    },
  },
}
