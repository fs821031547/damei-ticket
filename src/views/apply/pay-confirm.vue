<template>
  <!--<x-header title></x-header>-->
  <div style="padding-bottom:50px;">
    <my-header>付款确认</my-header>
    <div style="padding-top:46px">
      <my-pad></my-pad>
      <div class="bg-white">
        <cell title="订单号" :value="preOrder.ordId"></cell>
        <cell title="付款金额" :value="NumFmt(preOrder.order.billBak,2)"></cell>
        <!--<cell title="付款明细" :value="order_data.dataDesc"></cell>-->
        <my-cell title="付款明细" :value="orderDesc"></my-cell>

      </div>
      <my-pad height="20"></my-pad>
      <!--<div class="ticket-form-foot" style="text-align:center">剩余有效付款时间：
        <span class="red">47小时59分59秒。</span>
        <clocker :time="time" format="%H 小时 %M 分 %S 秒" class="red" slot="value">
          <span class="day">%_H1</span>
          <span class="day">%_H2</span>时
          <span class="day">%_M1</span>
          <span class="day">%_M2</span>分
          <span class="day">%_S1</span>
          <span class="day">%_S2</span>秒
        </clocker>
      </div>-->
      <my-pad></my-pad>
      <my-pad></my-pad>
      <div style="padding:0 10px;">
        <x-button type="primary" @click.native="fnConfirmOrder">立即付款</x-button>
      </div>
      <!--<my-bottom-box>
        <div class="footer">
          <div class="footer-money">总金额：<span class="orange">RMB {{}}</span></div>
          <x-button type="primary" style="border-radius:0;width:50%;float:left;">下一步</x-button>
        </div>
      </my-bottom-box>-->
    </div>
  </div>

</template>
<script>
  import { Clocker } from 'vux'
  export default {
    data() {
      return {
        title: '激活记录',
        list: [{
          title: '游客信息',
        }],
        time: DateFmt(new Date(), 'yyyy-MM-dd hh:mm:ss', 'd+2'),
        order_data: {
          title: '欢乐美国阳光西岸8日精品游',
          fromCityName: '深圳',
          id: 10112,
          money: 2999,
          dataDesc: '1、签证大礼包* <br> 1,欢乐美国阳光西岸8日精品游'
        },
        visaBox: false,
        radio001: ['没有签证', '已有签证'],
        visaWay: false,
        visaWayList: ['已办EVUS', '办理EVUS（RMB100）'],
        visaWayList1: ['办理签证（RMB1500）', '签证保障套餐（RMB2999）'],
        visaWayList2: ['EVUS', '美国签证+EVUS', '签证大礼包'],
        checkBtn: false,
      }
    },
    created() {

    },
    components: {
      Clocker,
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
      order() {
        return this.$store.getters['apply/order'];
      },
      code_info() {
        return this.$store.getters["mine/code_info"]
      },
      preOrder() {
        return this.$store.getters['apply/preOrder'];
      },
      orderDesc() {
        let orderDesc = this.preOrder.order;
        let visaWayList2 = this.visaWayList2;
        let desc = '';
        if (orderDesc.group > 0) desc += this.preOrder.title + '*' + orderDesc.group + '<br>'
        if (orderDesc.variance > 0) {
          desc += '单房差' + '*' + orderDesc.variance + '<br>';
        }
        if (orderDesc.EVUS > 0) {
          desc += visaWayList2[0] + '*' + orderDesc.EVUS + '<br>';
        }
        if (orderDesc.visa > 0) {
          desc += visaWayList2[1] + '*' + orderDesc.visa + '<br>';
        }
        if (orderDesc.gifts > 0) desc += visaWayList2[2] + '*' + orderDesc.gifts;
        return desc;

      },

    },
    methods: {
      change(value, label) {
        console.log('change:', value, label)
      },
      fnOrderDate() {
        this.order.personDates(x => {

        })
      },
      fnConfirmOrder() {
        this.$router.push({ name: 'pay-way', query: { names: 'order' }, params: { refresh: true } })
      },
      fnIsPay() {
        // setInterval(() => {
        if (this.key) {
          let code_id = this.ticketSelect.code_id;
          let data = { id: code_id, status: 6 }
          this.$store.dispatch('mine/select_pay_status', this.key).then(x => {
            if (x.success) {
              this.$store.dispatch('mine/update_ticket_status', data).then(y => {
                if (y.success) {
                  this.$router.push({ name: 'pay-success' });
                }
              });
            } else {
              this.toastMsg(x.msg);
            }
          })
        }
        // }, 300);

      },
    },
    props: {
    }
  }

</script>
<style scoped>
  .hetong {
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    font-size: 15px;
    color: #666;
  }

  .checked {
    padding: 0 10px;
    height: 36px;
    display: inline-block;
  }
</style>