---
title: Basic usage
description: ''
position: 5
category: Examples
---

In order to get accurate results, it's critical that `this.$lux.pageLoading(false)` is placed in your page where it's considered done loading.

## Universal Mode (SSR)
target: `server`, mode: `universal`, using `build`

### fetch
In universal mode, fetch starts just before mounted and can end at any time.  If you are fetching information that will be displayed on the screen and it's not well below the fold, consider placing the loading-done tag here.

```js[products.vue]
export default {
  async fetch() { 
      const data = await fetch('https://some-api.io/products')
      this.$lux.pageLoading(false)
  }
}
```

### mounted

If you aren't using fetch to load data or are just using asyncData then you should consider placing the loading-done tag here.

## Full Static Mode
target: `static`, mode: `universal`, using `generate`

### mounted

Since all asyncData and fetch hits are cached in full static mode and `fetch()` isn't called, you should place the loading-done tag here.

## Static Mode
target: `server`, mode: `universal`, using `generate`

Follow the same rules as Universal (SSR)

## Performance Marking
Sometimes it's useful to mark timing events to help track down client-side page lag.

```js[products.vue]
export default {
  async fetch() { 
      this.$lux.mark("fetchStart")
      const data = await fetch('https://some-api.io/products')
      this.$lux.mark("fetchEnd")
      this.$lux.measure("fetchTime", "fetchStart", "fetchEnd")

      this.$lux.pageLoading(false)
  }
}
```