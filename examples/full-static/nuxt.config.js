const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: [
    { handler: require('../../lib/module') }
  ],
  head: {
    title: 'Speedcurve LUX - Full Static'
  },
  target: 'static',
  mode: 'universal',
  lux: {
    enabled: true,
    debugMode: true
  },
  publicRuntimeConfig: {
    lux: {
      id: process.env.LUX_ID
    }
  }
}
