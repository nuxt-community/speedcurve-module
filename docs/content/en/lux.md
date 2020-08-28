---
title: $lux
description: ''
position: 4
category: Guide
---


This module exposes a global plugin called `$lux`.  It's the central way you communicate with SpeedCurve LUX.

## Methods

### `pageLoading(isLoading)`

- `isLoading`
    - Type: `boolean`
    - Default: `true`

Starts and stops the LUX page load timers. If `logFirstHit` is `true`, this is ignored since LUX will take care of the first hit metrics.

### `label(name)`
- `name`
    - Type: `string`
    - ** Required**

Sets the label of the page in SpeedCurve.  By default the page's title is used.  This should be called before `pageLoading(false)`

### `addData(name, value)`
- `name`
    - Type: `string`
    - **Required**
    - The name of the property you are setting. Examples: `cartTotal`, `isLoggedIn`
- `value`
    - Type: `float`, `number`, `string`
    - ** Required**
    - The value you want to assign the property.

This adds custom data to the current user.  This is useful for segmenting performance metrics. 

<alert type="warning">In order for this data to show up in your charts, you need to set up the `name` used in your SpeedCurve account. Learn more about [customer data](https://support.speedcurve.com/en/articles/1262334-lux-customer-data).</alert>


### `mark(markName)`
- `markName`
    - Type: `string`
    - **Required**    

This function is identical to [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) from the User Timing spec for marking a specific time milestone in the page.

It's a shim for browsers that don't support `performance.mark`.

<alert type="warning">

If used, it must be called before `pageLoading(false)`.

</alert>


### `measure(name, startMark, endMark)`
- `label`
    - Type: `string`
    - **Required**    
- `startMark`
    - Type: `string`
- `endMark`
    - Type: `string`

This function is identical to [performance.measure](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure) from the User Timing spec for measuring the delta between two time milestones in the page.  

It's a shim for browsers that don't support `performance.measure`.

<alert type="warning">

If used, it must be called before `pageLoading(false)`.

</alert>

## ignoreLUX

Sometimes it's useful to update a page's url to reflect the current state of the page using `this.$router.push`. If the url's params change this would trigger LUX to record a new page hit.  To avoid this add `ignoreLUX:true` to the push params.  

This will disable LUX until the start of the next nav.

```js
this.$router.push({
  name: this.$route.name,
  params: {
    /* some updated params */
    ignoreLUX: true
  }
})
```
