const { resolve } = require('path')

module.exports = async function (moduleOptions) {
  const options = {
    ...this.options['@nuxtjs/speedcurve'],
    ...moduleOptions
  }

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: '@nuxtjs/speedcurve.js',
    options
  })
}

module.exports.meta = require('../package.json')
