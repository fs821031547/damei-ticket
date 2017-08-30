<template>
  <!--<x-header title></x-header>-->
  <div style="padding-bottom:50px;">
    <x-header style="position:absolute;left: 0px; top: 0px;z-index: 1001; width:100%;">报名信息</x-header>
    <div style="padding-top:46px">
      <my-pad></my-pad>
      <group title="产品信息">
        <cell title="产品名称" :value="order.lineName" is-link @click.native="$router.push({ name: 'sign-true', query: { status: true } });">
        </cell>
        <cell title="出发地" :value="order.fromCityName"></cell>
        <cell title="订单号" :value="order.ordId"></cell>
      </group>
      <group>
        <group-title slot="title">报名信息({{ personDates && personDates.length }}人) </group-title>
        <cell v-for="item in personDates" :key="item.id" :title="item.name" :value="visaWayList[item.visa_status]"></cell>
      </group>
      <my-pad></my-pad>
    </div>
    <div class="daoji-time" v-if="order.isOK==0">※剩余有效付款时间：
      <!--<span class="red">47小时59分59秒。</span>-->
      <clocker :time="time" format="%H 小时 %M 分 %S 秒" class="red" slot="value">
        <span class="day">%_H1</span>
        <span class="day">%_H2</span>时
        <span class="day">%_M1</span>
        <span class="day">%_M2</span>分
        <span class="day">%_S1</span>
        <span class="day">%_S2</span>秒
      </clocker>
    </div>
    <my-bottom-box>
      <div class="footer">
        <div class="footer-money">总金额：<span class="orange">RMB {{ NumFmt(order.order.billBak,2)}}</span></div>
        <x-button type="primary" @click.native="fnConfirmOrder" style="border-radius:0;width:50%;float:left;">立即付款</x-button>
      </div>
    </my-bottom-box>
  </div>

</template>
<script>
  import { Clocker } from 'vux'
  export default {
    data() {
      return {
        showTicket: false,
        isPay: false,
        ordId: '',
        time: DateFmt(new Date(), 'yyyy/MM/dd hh:mm:ss', 'd+2'),
        order_data: {
        },
        personDates: [],
        visaWayList: ['已办EVUS', '办理EVUS（￥100）', '办理签证（￥1500）', '签证保障套餐（￥2999）'],
      }
    },
    components: {
      Clocker,
    },
    created() {
      if (!this.mine.id) {
        this.$store.dispatch("mine/mine_request").then(x => {
          // console.log(this.$route.name);
          this.fnOrderData();
        });
      } else {
        this.fnOrderData();
      }
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
      order() {
        return this.$store.getters["mine/orderSelect"];
      },
    },
    methods: {
      fnOrderData() {
        this.time = DateFmt(new Date(this.order.endTime), 'yyyy/MM/dd hh:mm');
        let personDates = this.order.personDates.map(y => {
          if (typeof y == 'string') {
            return JSON.parse(y);
          } else {
            return y
          }
        })
        this.personDates = personDates;
        // this.order_data.personDates = personDates;
        // this.$store.dispatch('mine/orderSelect', this.order_data);
      },
      fnConfirmOrder() {
        this.$router.push({ name: 'pay-way', query: { names: 'order' }, params: { refresh: true } })
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

  .daoji-time {
    position: fixed;
    bottom: 43px;
    width: 100%;
    left: 0;
    font-size: 13px;
    background: #fff;
    text-align: center;
    height: 24px;
    line-height: 24px;
  }
</style>