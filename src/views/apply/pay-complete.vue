<template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area">
      <icon type="success" is-msg></icon>
    </div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title">操作成功</h2>
    </div>
    <div class="weui-msg__text-area">
      <!--<p class="weui-msg__desc">您已成功付款：{{ code_info.title || '美国阳光西岸8日精品游' }}</p>-->
    </div>
    <my-pad height="20"></my-pad>
    <div style="padding:0 15px">
      <x-button class="tip" plain type="primary" @click.native="$router.push({name:'my-apply'})">
      我的报名
      </x-button>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'
  import { Icon } from 'vux'
  export default {
    data() {
      return {
        title: '恭喜您'
      }
    },
    created() {
      // Vue.http.post(
      //   "sys/main?xwl=343XORN1IN3S",
      // ).then(res => {
      //   if (!res.body) return;
      // })
    },
    computed:{
      code_info(){
        return this.$store.getters["mine/code_info"]
      },
      
    },
    props: {
    },
    components: {
      Icon
    }
  }

</script>

<style lang="less" scoped>
  .weui-msg {
    padding-top: 36px;
    text-align: center;
    background: #fff;
    height: 100%;
  }

  .weui-msg__icon-area {
    margin-bottom: 30px;
  }

  .weui-msg__title {
    font-weight: 500;
  }



</style>