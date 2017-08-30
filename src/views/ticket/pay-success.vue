<template>
  <div class="weui-msg">
    <div class="weui-msg__icon-area">
      <icon type="success" is-msg></icon>
    </div>
    <div class="weui-msg__text-area">
      <h2 class="weui-msg__title">操作成功</h2>
    </div>
    <div class="weui-msg__text-area">
      <p class="weui-msg__desc">您已成功支付<span class="red">RMB {{ code_info.money || '0' }} </span>获得了精彩美国游资格1个。</p>
      <!--<p class="weui-msg__desc">您已成功支付RMB {{ code_info.money || '0' }} 获得了精彩{{ code_info.title || '美国游' }}资格1个。</p>-->
    </div>
    <div class="weui-msg__text-area">
      <p class="weui-msg__desc" style="font-size:14px;">※注：每个特价游美国的资格，只供1人享受。若想几个人同时报名，多出名额按原价收取。</p>
    </div>
    <div class="weui-msg__opr-area">
      <p class="weui-btn-area">
        <x-button type="primary" @click.native="$router.push({name:'sign-true'})">立即报名</x-button>
      </p>
    </div>
    <my-pad height="20"></my-pad>
    <!--<div class="tip" @click="$router.push({name:'ticket-list'})">
      查看付款信息
    </div>-->
    <!--<div class="weui-msg__extra-area">
      <div class="weui-footer">
        <p class="weui-footer__text">※本产品由中信国旅提供，最终解释权归广东中信国旅所有。</p>
      </div>
    </div>-->
    <my-footer></my-footer>
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
    computed: {
      code_info() {
        return this.$store.getters["mine/code_info"]
      }
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

  .weui-msg__text-area {
    padding: 10px 40px;
    color: #666;
    font-size: 16px;
  }
</style>