<template>
  <div :style="'height:'+height+'px'">
  </div>
</template>

<script>
  export default {
    name: 'my-pad',
    data() {
      return {
      }
    },
    created() {
      
    },
    props: {
      height: {
        type: String,
        default: '10'
      }
    }
  }

</script>

<style>

</style>