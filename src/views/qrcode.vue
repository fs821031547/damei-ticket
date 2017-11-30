<template>
  <!--<x-header title></x-header>-->
  <div>
    <!-- <div v-html="qrcodeHtml"></div> -->
  </div>

</template>
<script>
  export default {
    data() {
      return {

      }
    },
    created() {
      //document.getElementById('app').innerHTML='<script>'+alert("fs")+'<'+'/script>'

    },
    computed: {
      qrcodeHtml() {
        let str = this.$store.getters["mine/qrcodeHtml"];
        return eval(str)
      }
    },
    methods: {

    },
    components: {},
  }

</script>
<style scoped>


</style>
