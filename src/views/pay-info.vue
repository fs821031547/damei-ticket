<template>
  <div style="padding-bottom:50px;">
    <my-header>付款信息</my-header>
    <div style="padding-top:46px">
      <my-pad height="20"></my-pad>
      <div class="bg-white">
        <cell title="订单号" :value="order.ordId"></cell>
        <cell title="付款金额" :value="NumFmt(order.order.billBak,2)"></cell>
        <!--<cell title="付款明细" :value="order_data.dataDesc"></cell>-->
        <my-cell title="付款明细" :value="orderDesc"></my-cell>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
          title: '欢乐美国阳光西岸8日精品游',
          fromCityName: '深圳',
          id: 10112,
          money: 2999,
          dataDesc: '1、签证大礼包*1 2、欢乐美国阳光西岸8日精品游*1 3、单房差*1',
          visaWayList: ['已办EVUS', '办理EVUS（RMB100）'],
          visaWayList1: ['办理签证（RMB1500）', '签证保障套餐（RMB2999）'],
          visaWayList2: ['EVUS', '美国签证+EVUS', '签证大礼包'],
      }
    },
    created() {
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
      order() {
        return this.$store.getters["mine/orderSelect"];
      },

      orderDesc() {
        let orderDesc = this.order.order;
        let visaWayList2 = this.visaWayList2;
        let desc = '';
        if (orderDesc.group > 0) desc += this.order.lineName + '*' + orderDesc.group + '<br>'
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
      fnPay() {
        this.$router.push({ name: 'pay-way', query: { names: 'order' }, params: { refresh: true } })
      }
    },
    props: {
    }
  }

</script>
<style >
  .visa-tips {
    color: #666;
    font-size: 12px;
    line-height: 20px;
    padding: 12px;
  }
  .my-money .weui-cell__ft{
    color:red;
  }
</style>