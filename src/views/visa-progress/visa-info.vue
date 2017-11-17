<template>
  <div style="padding-bottom:50px;">
    <my-header>付款信息</my-header>
    <div style="padding-top:46px">
      <my-pad height="20"></my-pad>
      <div class="bg-white">
        <cell title="订单号" :value="visaSelect.orderid"></cell>
        <cell title="付款金额" class="my-money" :value="NumFmt(visaSelect.money,2)"></cell>
        <!--<cell title="付款明细" :value="order_data.dataDesc"></cell>-->
        <my-cell title="付款明细" :value="orderDesc"></my-cell>
      </div>
      <my-pad height="40"></my-pad>
      <div style="padding:0 10px;" v-if="$route.query.status=='visa'">
        <x-button type="primary" @click.native="fnPay">立即付款</x-button>
      </div>
    </div>
  </div>
</template>
<script>
  import mixin from '../mixin.js'
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
          visaWayList2: ['已办EVUS','EVUS', '美国签证+EVUS', '签证大礼包'],
      }
    },
    mixins:[mixin],
    created() {
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
      visaSelect() {  //所选签证
        return this.$store.getters["apply/visaSelect"];
      },
      orderDesc() {
        let desc = '';
        let visa=this.visaSelect;   //所选签证
        return '美国签证+EVUS'+'*1';
      },
    },
    methods: {
      fnPay() {
        this.fnReqPay(2);
        // this.$router.push({ name: 'pay-way', query: { names: 'order' }, params: { refresh: true } })
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
