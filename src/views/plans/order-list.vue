<template>
  <div>
    <my-header>选择订单</my-header>
    <div style="padding-top:46px">
      <my-pad></my-pad>

      <radio style="background: #fff" :options="list" @on-change="onchange"></radio>
    </div>
    <my-bottom-box>
      <x-button style="border-radius:0;" type="primary" @click.native="$router.push({name:'plan-select'})">下一步</x-button>
    </my-bottom-box>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: ['10000', '10001', '10002']
      }
    },
    created() {

    },
    methods: {
      onchange() {

      }
    },
    components: {},
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
    },
    props: {}
  }

</script>
<style>

</style>
