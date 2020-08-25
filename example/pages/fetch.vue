<template>
  <div>Fetch</div>
</template>
<script>

export default {
  async fetch () {
    if (!process.client) { return }
    console.log('fetch start')
    // await fetch('https://jsonplaceholder.typicode.com/posts')
    console.log('fetch end')
    this.$lux.pageLoading(false)
  }
}
</script>
