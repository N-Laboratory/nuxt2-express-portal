export default {
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

  css: ['@/assets/css/style.css', 'bulma/css/bulma.css'],
  plugins: ['@/plugins/axios-accessor', '@/plugins/vee-validate.ts'],
  components: true,
  buildModules: ['@nuxt/typescript-build'],
  modules: [
    '@nuxtjs/axios',
    'nuxt-fontawesome',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/auth',
  ],
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas'],
      },
    ],
  },
  build: {
    transpile: ['vee-validate/dist/rules', 'auth'],
  },
  srcDir: 'src/',
  axios: {
    proxy: true,
  },
  router: {
    middleware: ['router-option', 'auth'],
  },
  proxy: {
    // proxy http://localhost:3030/api/hoge to http://localhost:3000/hoge
    '/api/': {
      target: 'http://localhost:3000',
      pathRewrite: { '^/api/': '/' },
    },
  },
  loading: false,
  auth: {
    localStorage: false,
    redirect: {
      home: '/myPage',
      login: '/login',
      logout: '/login',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: false,
          user: { url: '/api/auth/user', method: 'get', propertyName: 'user' },
        },
      },
    },
  },
}
