<template>
  <!--<x-header title></x-header>-->

  <div style="padding-bottom:50px;">
    <x-header :left-options="{backText: ''}" style="position:absolute;left: 0px; top: 0px;z-index: 10000001; width:100%;">已选团期信息</x-header>
    <div style="padding-top:46px">
      <my-pad></my-pad>
      <div class="plan-tips-box">
        <div class="title">下载出团通知书</div>
        <div class="desc">
          请回到公众号首页，点击下方菜单栏"报名"→"在线报名"<br> 按照订单号点击"附件下载"来进行查看和下载。
        </div>
      </div>
      <div class="bg-white">
        <cell title="产品名称" is-link :value="plan.lineName || '欢乐美国阳光西岸8日精品游'" class="applys"  @click.native="fnViewLine"></cell>
        <cell title="出发城市" :value="plan.to_go"></cell>
        <cell title="起止城市" :value="plan.to_travel"></cell>
        <cell title="出发日期" :value="plan.planDate"></cell>
        <cell title="回团日期" :value="DateFmt(plan.backDate,'yyyy-MM-dd')"></cell>
      </div>
      <group-title slot="title">报名信息</group-title>
      <div class="bg-white">
        <cell v-for="item in plan.personDates" v-if="item" :key="item.id" :title="item.name" :value="item.sex"></cell>
      </div>
    </div>
    <my-bottom-box>
      <x-button style="border-radius:0;" type="primary" @click.native="fnNext">查看已选团期</x-button>
    </my-bottom-box>
  </div>

</template>
<script>
  import {
    Loading,
    CheckIcon,
    Icon
  } from 'vux'
  export default {
    data() {
      return {
        // plan:{
        //   lineName:'换了美国有',
        //   fromCityName:'深圳',
        //   city:'广州',
        //   planDate:'2017-09-20',
        //   endPlanDate:'2017-09-20',

        // }
      }
    },
    components: {
      CheckIcon,
      Icon,
    },
    created() {

    },
    computed: {
      plan() {
        return this.$store.getters['plan/planSelect']
      },

    },
    methods: {
      fnViewLine() {
        // this.$router.push({name:'sign-true',query:{status:true}});
        this.$router.push({
          name: 'sign-true',
          query: {
            status: true
          }
        });

      },
      fnNext() {
        this.$router.push({name:'plan'});
      },

    },
    props: {}
  }

</script>
<style>
  .applys .vux-cell-primary {
    width: 24%;
    flex: initial;
  }

  .applys .weui-cell__ft {
    width: 76%;
  }

  .my-panel .weui-media-box__title {
    font-size: 15px;
  }

  .my-panel .weui-media-box__desc {
    font-size: 12px;
  }

  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }

  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }

  .my-switch .weui-cell_switch .weui-cell__ft {
    margin-top: -35px;
  }

  .weui-icon-checked.checked:before {
    display: block;
    content: '\EA08';
    color: #09BB07;
    font-size: 16px;
  }

  .hetong {
    height: 36px;
    line-height: 36px;
    /*padding: 0 10px 0 20px;*/
    font-size: 15px;
    color: #666;
  }

  .hetong .checked {
    padding: 0 0 0 10px;
    height: 36px;
    display: inline-block;
  }

  .hetong .checked .weui-icon-circle {
    font-size: 20px;
  }

  .hetong .checked .weui-icon-success-circle {
    font-size: 20px;
  }

  .plan-tips-box {
    padding: 0 15px;
    line-height: 24px;
  }

  .plan-tips-box .title {
    color: #333;
    font-size: 15px;
  }

  .plan-tips-box .desc {
    color: #999;
    font-size: 13px;
  }

</style>
