<template>
  <div>Fetch</div>
</template>
<script>

export default {
  async fetch () {    
    // fetchStart is reserved?! https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/fetchStart
    this.$lux.mark("fetchStarting")
    
    if(process.client)
      await fetch('https://jsonplaceholder.typicode.com/posts')    

    this.$lux.mark("fetchEnding")
    this.$lux.measure("fetchTime", "fetchStarting", "fetchEnding")

    this.$lux.pageLoading(false)    
  }
}
</script>
