<template>
  <my-pad-box>
    <div style="padding:0 20px">
      <h3 class="my-title">{{ title }}</h3>
      <div class="ticket-form">
        <p class="ticket-form-head">获得了仅需<span class="red">RMB999</span>即可参加欢乐美国阳光西岸8日精品游的宝贵资格1个。若48小时内未付款，资格将自动取消。</p>
        <div class="ticket-form-body">
          <!--<x-input title="姓名" is-type="china-name" placeholder="请输入联系人姓名"></x-input>-->
          <group label-margin-right="2em" >
            <cell title="姓名"  value="value"  label-margin-right="2em"  value-align="left"></cell>
            <cell title="手机" value="value" value-align="left"></cell>
          </group>
          <!--<x-input title="手机" placeholder="请输入联系人手机号" keyboard="number" is-type="china-mobile"></x-input>-->
        </div>
        <div class="ticket-form-foot">※剩余有效付款时间：<span class="red">47小时59分59秒。</span></div>
      </div>
      <x-button type="primary" @click.native="fnPay">立即付款</x-button>
      <x-button @click.native="$router.push({name:'ticket'})">放弃资格</x-button>
      <div class="my-pad"></div>
      <div class="tip" @click="$router.push({name:'ticket-list'})">
        查看线路
      </div>
      <my-footer></my-footer>
    </div>
  </my-pad-box>

</template>

<script>
  import Vue from 'vue'
  import { Group, Cell } from 'vux'
  import mixin from '../mixin.js'
  export default {
    data() {
      return {
        title: '恭喜您'
      }
    },
    mixins:[mixin],
    created() {
      // Vue.http.post(
      //   "sys/main?xwl=343XORN1IN3S",
      // ).then(res => {
      //   if (!res.body) return;
      // })
    },
    methods: {
      fnPay(){
        this.fnReqPay(1);
      }
    },
    props: {
    },
    components: {
      Cell,
      Group
    },
  }

</script>

<style lang="less" scoped>

</style>
