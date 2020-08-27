---
title: Options
description: ''
position: 3
category: Guide
---

Out of the box, all you need is your `LUX Id` to start using this module.  You can change the default behavior using the following options:

```js[nuxt.config.js]
lux: {
  id: 'YOUR_LUX_ID',
  // debugMode: false,
  // enabled: true,
  // logFirstHit: true,
  // sampleRate: 100,
  // translateBool: true,
  // autoStartOnNav: true
}

```

## Properties

### `id`
- **Required**
- Type: **string**

<alert>
You can find your LUX ID by going to `Settings > Edit LUX Settings` in your SpeedCurve account.  Then scroll to the bottom and copy the numbers at the bottom of the LUX snippet.
</alert>

<img src="/lux-id.png" width="688" height="148" loading="lazy"/>

### `debugMode`
- Type: **boolean**
- Default: `false`

Turns on verbose console logging for the module and the native LUX code snippet.

### `enabled`
- Type: **boolean**
- Default: `false` for dev mode, otherwise `true`

Turns on the functionality of the module.  Useful for conditional usage or when you don't want dev environments to interfere with your SpeedCurve metrics.

### `logFirstHit`
- Type: **boolean**
- Default: `true`

By default LUX will automatically log a visitor's first hit to your site.  Turn this to `false` when you have additional content to load and want to trigger the page load `stop` yourself.

### `sampleRate`
- Type: **number**
- Default: `100`

Lowers your sample rate.  This is handy if your site gets a lot of traffic and you don't need performance metrics for every user.
<alert type="warning">Note: If the sample rate setup in your SpeedCurve account is not 100, this value is ignored.</alert>

### `translateBool`
- Type: **boolean**
- Default: `true`

Automatically converts `true/false` to `Yes/No` when using `addData` to insert customer data into the LUX session.  This is recommended by SpeedCurve so your dashboard is more readable.

### `autoStartOnNav`
- Type: **boolean**
- Default: `true`

Automatically issues a `pageLoading(true)` before each route navigation after the first page load.  This allows you to only have to tell LUX when a page is done loading on your pages.

<alert type="warning">

By design, this will not trigger when going to a url with a query string.

</alert>