<template>
  <div>
    Home Page (mounted)
    <br>
    <button type="button" @click="test(true)">
      Push to Fetch (ignoreLUX: true)
    </button> |
    <button type="button" @click="test(false)">
      Push to Fetch (ignoreLUX: false)
    </button>
  </div>
</template>

<script>

export default {
  mounted () {
    this.$lux.label(' My Label')
    this.$lux.pageLoading(false)
  },
  methods: {
    test (ignoreLUX) {
      this.$router.push({
        name: 'fetch',
        params: {
          ignoreLUX
        }
      })
    }
  }

}
</script>
