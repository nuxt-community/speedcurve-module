<template>
  <div>
    <nuxt-link to="/">
      Home
    </nuxt-link> |
    <nuxt-link to="/asyncMounted">
      Async/Mounted
    </nuxt-link>
    |
    <nuxt-link to="/fetch">
      Fetch
    </nuxt-link>
    |
    <nuxt-link to="/i-am-not-found">
      404
    </nuxt-link>

    <nuxt />
  </div>
</template>
<script>
export default {
  created () {
    console.log('created - layout')
  },
  mounted () {
    console.log('mounted - layout')
  }
}
</script>
