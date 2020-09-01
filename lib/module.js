const { resolve } = require('path')
const { readFileSync } = require('fs')
const semver = require('semver')

module.exports = function (moduleOptions) {
  if (this.options.mode === 'spa') {
    throw new Error('Speedcurve LUX Module - SPA Mode is not supported.')
  }

  const currentVersion = semver.coerce(this.nuxt.constructor.version)
  const requiredVersion = semver.coerce('2.12.0')

  if (semver.lt(currentVersion, requiredVersion)) {
    throw new Error('Speedcurve LUX Module - Due to a memory leak, Nuxt 2.12.0 or higher is required.')
  }

  const defaults = {
    debugMode: false, // LUX debug mode
    enabled: !this.options.dev, // don't poison metrics from devs
    logFirstHit: true, // should be false for SPA mode,
    sampleRate: 100, // if you have < 100 in your control panel, then this ignored
    translateBool: true, // looking at reports with true/false is pretty nasty for those viewing, SC recommends yes/no instead,
    autoStartOnNav: true
  }

  const config = {
    ...defaults,
    ...this.options.lux,
    ...moduleOptions,
    isDev: this.options.dev
  }

  const { dst } = this.addTemplate({
    src: resolve(__dirname, './templates/plugin.js'),
    options: {
      config,
      luxInit: readFileSync(resolve(__dirname, './luxInit.js'))
    }
  })

  this.options.plugins.unshift(resolve(this.options.buildDir, dst))
}

module.exports.meta = require('../package.json')
