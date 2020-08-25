const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: [
    { handler: require('../') }
  ],
  head: {
    title: 'Speedcurve LUX Test 1'
  },
  target: 'static',
  mode: 'universal',
  lux: {
    enabled: true,
    debugMode: true
  },
  publicRuntimeConfig: {
    lux: {
      id: '578536473'
    }
  }
}
