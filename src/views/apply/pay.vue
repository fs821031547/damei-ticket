<template>
  <!--<x-header title></x-header>-->
  <div style="padding-bottom:50px;">
    <x-header style="position:absolute;left: 0px; top: 0px;z-index: 1001; width:100%;">报名信息</x-header>
    <div style="padding-top:46px">
      <my-pad></my-pad>
      <group title="产品信息">
        <cell title="产品名称" :value="order.lineName"></cell>
        <cell title="出发地" :value="order.fromCityName"></cell>
        <cell title="订单号" :value="order.ordId"></cell>
      </group>
      <group>
        <group-title slot="title">报名信息({{personDates.length}}人)<span style="float:right;" @click="toPayInfo">查看付款>></span></group-title>
        <cell v-for="item in personDates" v-if="item" :key="item.id" :title="item.name" :value="visaWayList2[item.visa_status]"></cell>
      </group>
      <my-pad></my-pad>
      <div class="visa-tips" v-show="!isPay">
        ※签证说明：<br> 1、已有美国签证并且已经办理EVUS的客人,将  以下资料发送客服：有效护照首页复印件、有效美国签证页复印件、EVUS确认页。
        <br> 2、需要办理美国签证的客人，请按报名成功后推送的消息，点击“详情”查看签证办理流程和下载文档。
        <br> 3、如有任何疑问，请直接联系公众号客服。
      </div>
    </div>
    <my-bottom-box v-show="isPay">
      <div class="footer">
        <div class="footer-money">总金额：<span class="orange">{{NumFmt(order.order.billBak,2)}}</span></div>
        <x-button type="primary" style="border-radius:0;width:50%;float:left;">下一步</x-button>
      </div>
    </my-bottom-box>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        title: '激活记录',
        showTicket: false,
        ticketOpt: ['..', 'heheh'],
        isPay: false,
        personDates: [],
        visaWayList2: ['已办EVUS', '办理EVUS（100.00）', '办理签证（1500.00）', '签证保障套餐（2999.00）'],
      }
    },
    created() {
      if (!this.mine.id) {
        this.$store.dispatch("mine/mine_request").then(x => {

          this.fnOrderData();
        });
      } else {
        this.fnOrderData();
      }
    },
    methods: {
      // fnOrder_data() {
      //   this.mine.order_data.forEach(y => {
      //     y.endTime = DateFmt(new Date(y.endTime), 'yyyy/MM/dd hh:mm');
      //     y.addTime = DateFmt(new Date(y.addTime), 'yyyy/MM/dd hh:mm');
      //   });
      // },
      fnOrderData() {
        // this.order_data = this.mine.order_data;
        let personDates = this.order.personDates.map(y => {
          if (typeof y == 'string') {
            return JSON.parse(y);
          } else {
            return y;
          }
        })
        this.personDates = personDates;
        // this.$store.dispatch('mine/orderSelect', this.order_data);
      },
      toPayInfo() {
        // this.$store.dispatch('mine/orderSelect', this.);
        this.$router.push({ name: 'pay-info' })
      },
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
      order() {
        return this.$store.getters["mine/orderSelect"];
      },
    },
    props: {
    }
  }

</script>
<style scoped>
  .visa-tips {
    color: #666;
    font-size: 12px;
    line-height: 20px;
    padding: 12px;
  }
</style>