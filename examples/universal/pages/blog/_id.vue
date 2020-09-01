<template>
    <div>
        {{ $route.params.id }}
    </div>
</template>
<script>
export default {
  
   head(){
        return {
            title: 'Blog Post # ' + this.$route.params.id,
  
        }
    },
    mounted(){
        this.$lux.pageLoading(false)
    },
   
}
</script>