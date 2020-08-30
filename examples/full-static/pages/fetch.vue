<template>
  <div>Fetch</div>
</template>
<script>

export default {
  async fetch () {
    if (!process.client) { return }
    console.log('fetch ?!')
  },
  mounted(){
    console.log('mounted')
    this.$lux.pageLoading(false)
  }
}
</script>
