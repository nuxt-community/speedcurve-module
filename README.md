# nuxt-speedcurve

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

> [Speedcurve LUX](https://speedcurve.com) integration for [Nuxt](https://nuxtjs.org)

[📖 **Release Notes**](./CHANGELOG.md)

## Features
- Collect performance metrics from real users
- See Javascript errors in your Speedcurve dashboard
- Add user data to visits to cross reference cohorts and performance
- Create custom performance markers for deep insights
- Minimal configuration with sensible defaults
- On-the-fly runtime config support

## Setup

1. Add `nuxt-speedcurve` dependency to your project

```bash
yarn add nuxt-speedcurve # or npm install nuxt-speedcurve
```

2. Add `nuxt-speedcurve` to the `modules` section of `nuxt.config.js`
```js
{
  modules: [
    // Simple usage
    'nuxt-speedcurve',

    // With options
    ['nuxt-speedcurve', { /* module options */ }]
  ]
}
```
or add options to the `lux` property in your `nuxt.config.js`
```js
{
  modules: ['nuxt-speedcurve'],

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
[npm-version-src]: https://img.shields.io/npm/v/nuxt-speedcurve/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-speedcurve

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-speedcurve.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-speedcurve

[github-actions-ci-src]: https://github.com/hecktarzuli/nuxt-speedcurve/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/hecktarzuli/nuxt-speedcurve/actions?query=workflow%3Aci

[codecov-src]: https://img.shields.io/codecov/c/github/hecktarzuli/nuxt-speedcurve.svg
[codecov-href]: https://codecov.io/gh/hecktarzuli/nuxt-speedcurve

[license-src]: https://img.shields.io/npm/l/nuxt-speedcurve.svg
[license-href]: https://npmjs.com/package/nuxt-speedcurve
