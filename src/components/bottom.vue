<template>
  <div class="my-bottom-box">
      <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'my-bottom-box',
    data() {
      return {
      }
    },
    created() {
    },
    props: {
    }
  }

</script>

<style>
  .my-bottom-box {
    position: fixed;
    bottom:0;
    width:100%;
    left:0;
    z-index:1000000;
  }
  /*.my-pad-box-content{}*/
</style>
