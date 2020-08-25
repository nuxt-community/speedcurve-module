const { resolve } = require('path')

module.exports = function (moduleOptions) {
  const defaults = {
    debugMode: false, // LUX debug mode
    enabled: !this.options.dev, // don't poison metrics from devs
    logFirstHit: true, // should be false for SPA mode,
    sampleRate: 100, // if you have < 100 in your control panel, then this ignored
    translateBool: true, // looking at reports with true/false is pretty nasty for those viewing, SC recommends yes/no instead,
    autoStartOnNav: true
  }

  const options = {
    ...defaults,
    ...this.options.lux,
    ...moduleOptions,
    isDev: this.options.dev
  }

  const { dst } = this.addTemplate({
    src: resolve(__dirname, 'plugin.js'),
    options
  })

  this.options.plugins.push(resolve(this.options.buildDir, dst))
}

module.exports.meta = require('../package.json')
