# @nuxtjs/speedcurve

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> [Speedcurve LUX](https://speedcurve.com) integration for [Nuxt](https://nuxtjs.org)

- [✨ **Release Notes**](./CHANGELOG.md)
- [📖 **Documentation**](https://speedcurve.nuxtjs.org)

## Features
- Collect performance metrics from real users
- See Javascript errors in your Speedcurve dashboard
- Add user data to visits to cross reference cohorts and performance
- Create custom performance markers for deep insights
- Minimal configuration with sensible defaults
- On-the-fly runtime config support

## Setup

1. Add `@nuxtjs/speedcurve` dependency to your project

```bash
yarn add @nuxtjs/speedcurve # or npm install @nuxtjs/speedcurve
```

2. Add `@nuxtjs/speedcurve` to the `modules` section of `nuxt.config.js`
```js
{
  modules: [
    // Simple usage
    '@nuxtjs/speedcurve',

    // With options
    ['@nuxtjs/speedcurve', { /* module options */ }]
  ]
}
```
or add options to the `lux` property in your `nuxt.config.js`
```js
{
  modules: ['@nuxtjs/speedcurve'],

  lux: {
    // id: 'YOUR_LUX_ID'
    // debugMode: false,
    // enabled: true,
    // logFirstHit: true,
    // sampleRate: 100,
    // translateBool: true,
    // autoStartOnNav: true
  }
}
```
## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Josh Deltener <hecktarzuli@gmail.com>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/speedcurve/latest.svg
[npm-version-href]: https://npmjs.com/package/@nuxtjs/speedcurve

[npm-downloads-src]: https://img.shields.io/npm/dt/@nuxtjs/speedcurve.svg
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/speedcurve

[github-actions-ci-src]: https://github.com/nuxt-community/speedcurve-module/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/nuxt-community/speedcurve-module/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/nuxt-community/speedcurve-module.svg
[codecov-href]: https://codecov.io/gh/nuxt-community/speedcurve-module

[license-src]: https://img.shields.io/npm/l/@nuxtjs/speedcurve.svg
[license-href]: https://npmjs.com/package/@nuxtjs/speedcurve
