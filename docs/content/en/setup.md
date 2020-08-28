---
title: Setup
description: ''
position: 2
category: Guide
---

<alert>To use the module, you need a [SpeedCurve](https://speedcurve.com/) account first. Register for a free 30 day trial to get started.</alert>

## Installation

1. Add `nuxt-speedcurve` dependency to your project:

  <code-group>
    <code-block label="Yarn" active>

    ```bash
    yarn add nuxt-module
    ```

    </code-block>
    <code-block label="NPM">

    ```bash
    npm install nuxt-module
    ```

    </code-block>
  </code-group>

2. Add `nuxt-module` to the `modules` section of `nuxt.config.js`

  ```js[nuxt.config.js]
  export default {
    modules: [
      'nuxt-speedcurve'
    ]
  }
  ```

## Configure
Add a section called `lux` to your `nuxt.config.js` and set `id` to the Speedcurve LUX Id from your dashboard.

```js[nuxt.config.js]
export default {
  modules: [
    'nuxt-speedcurve'
  ],
  lux: {
    id: 'YOUR_LUX_ID',
    // more options
  }  
}
```

See [options](/options) section for all available options.

## Runtime Configs
Runtime configs are also supported.  Just create a `lux` section in your `nuxt.config.js`:

```js[nuxt.config.js]
export default {
  publicRuntimeConfig: {
    lux: {
      id: 'YOUR_LUX_ID'
    }
  }
}
```
All other runtime config methods are also supported.  For more information visit the [Runtime Config](https://nuxtjs.org/guide/runtime-config/) section of the Nuxt docs.
