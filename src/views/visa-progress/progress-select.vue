<template>
  <div style="padding-bottom:50px;">
    <my-header>进度查询</my-header>
    <div style="padding-top:46px">
      <my-pad height="20"></my-pad>
      <div class="bg-white">
        <cell title="出团通知书" is-link @click.native="$router.push({name:'order-plan-book'})"></cell>
      </div>
      <my-pad height="20"></my-pad>
      <div class="bg-white">
        <cell title="面谈通知书" is-link @click.native="$router.push({name:'interview'})"></cell>
      </div>
      <my-pad height="20"></my-pad>
      <div class="bg-white">
        <cell title="签证进度" @click.native="$router.push({name:'visa-progress'})" is-link></cell>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    created() {
      this.$store.dispatch("mine/mine_request")
    },
    computed:{
      mine() {
        return this.$store.getters["mine/mine"];
      },
    },
    props: {
    }
  }

</script>
<style scoped>

</style>