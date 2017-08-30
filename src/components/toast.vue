<template>
  <toast v-model="toastShow" type="text" time="1500" is-show-mask :text="toastMsg" position="middle"></toast>
</template>

<script>
  export default {
    name: 'my-toast',
    data() {
      return {
        toastShow: false,
        toastMsg: '',
      }

    },
    created() {
    },
    methods: {
      // toastFn(msg) {
      //   this.toastShow = true;
      //   this.toastMsg = msg;
      // },
    },
    props: {
 
    }
  }

</script>

<style>

</style>