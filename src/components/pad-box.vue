<template>
  <div style="height: calc(100% - 20px);padding:20px 15px 0">
    <div class="my-pad-box">
        <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'my-pad-box',
    data() {
      return {
      }
    },
    created() {
    },
    methods:{
    },
    props: {
    }
  }

</script>

<style>
  .my-pad-box {
    height: 100%;
    /*margin: 20px 15px 0;*/
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
    padding: 20px 0;
  }
  /*.my-pad-box-content{}*/
</style>