<template>
  <div>Page </div>
</template>
<script>

export default {
  async asyncData () {
    console.log('asyncData start')
    await fetch('https://jsonplaceholder.typicode.com/posts')
    console.log('asyncData end')
  },

  mounted () {
    console.log('mounted')
    this.$lux.pageLoading(false)
  }
}
</script>
