module.exports = {
  launch: {
    headless: false,
    slowMo: 100,
    defaultViewport: {
      width: 1280,
      height: 1024,
    },
    devtools: true,
    args: [`--window-size=1680,1024`]
  },

  server: {
    command: 'npm run start:all',
    port: 3030,
    launchTimeout: 50000
  }
}