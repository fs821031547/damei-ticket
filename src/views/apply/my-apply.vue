<template>
  <!--<x-header title></x-header>-->
  <div style="padding-bottom:50px;">
    <div class="vux-header" style="position:fixed;width:100%">
      <h1 class="vux-header-title">
        <span>我的报名</span>
      </h1>
    </div>
    <div style="padding-top:46px">
      <my-pad></my-pad>
      <div class="box-details-list list-3" v-for="item in order_data" @click="orderClick(item)">
        <div class="box-order-list-header header">
          <div class="left-item">
            <span class="title-name">订单:{{item.ordId}}</span>
          </div>
          <div class="right-item red" v-if="item.isOK==0">余：
            <clocker :time="item.endTime || time" format="%H 小时 %M 分 %S 秒" class="red" slot="value">
              <span class="day">%_H1</span>
              <span class="day">%_H2</span>时
              <span class="day">%_M1</span>
              <span class="day">%_M2</span>分
              <span class="day">%_S1</span>
              <span class="day">%_S2</span>秒
            </clocker>
          </div>
          <div class="right-item" v-else>
            <span style="color:#09f" v-if="item.isOK==1">已付款</span>
            <span style="color:#666" v-else>订单超时</span>
          </div>
        </div>
        <div class="details-list-row row-2">
          <div class="left-item">{{item.lineName}}</div>
          <div class="right-item">
            {{item.personDates.length}}人
          </div>
        </div>
        <div class="details-list-row row-3">
          <div class="left-item">{{item.addTime}}</div>
          <div class="right-item">
            RMB {{ NumFmt(item.order.billBak,2)}}
          </div>
        </div>
        <div class="box-order-list-header footer">
          <div class="left-item" @click.stop="fnNext">
            <a class="title-name">查看行程>></a>
          </div>
          <div class="right-item">
            <x-button mini v-if="item.isOK==1" type="primary" size="small" @click.native.stop="$router.push({name:'visa-progress'})">查看签证</x-button>
            <x-button mini v-else type="primary" style="background:grey" @click.native.stop="fnNopay" size="small">查看签证</x-button>
          </div>
        </div>
      </div>
    </div>
    <toast v-model="toastShow" type="text" is-show-mask :text="toastMsg" position="middle"></toast>

    <my-bottom-box>
      <x-button style="border-radius:0;" type="primary" @click.native="$router.push({name:'sign-true'})">立即报名</x-button>
    </my-bottom-box>

  </div>

</template>
<script>
  import { Clocker } from 'vux'
  export default {
    data() {
      return {
        title: '兑奖记录',
        order_data: [],
        isPay: false,
        toastMsg: '',
        toastShow: false,
        time: DateFmt(new Date(), 'yyyy/MM/dd hh:mm:ss', 'd+2'),
      }
    },
    created() {
      this.fnInit();
    },
    methods: {
      orderClick(item) {
        this.$store.dispatch('mine/orderSelect', item);
        if (!item.isOK) {
          let qrcodeData = {};
          qrcodeData.money = item.order.billBak;
          qrcodeData.type = 1;
          qrcodeData.orderId = item.ordId;
          qrcodeData.code_id = item.code_id;
          this.$store.dispatch('mine/changeQrcodeData', qrcodeData);
          this.$router.push({ name: 'pay-no', query: { id: item.ordId } });
        } else {
          this.$router.push({ name: 'pay', query: { id: item.ordId } });
        }
      },
      fnToastMsg(msg) {
        this.toastShow = true;
        this.toastMsg = msg;
      },
      fnNext() {
        this.$router.push({ name: 'sign-true', query: { status: 1 } })
      },
      fnInit() {
        this.$store.dispatch("mine/mine_request").then(x => {
          // console.log(this.$route.name);
          this.fnOrder_data();
          console.log('fninit',this.mine);
        });
      },
      fnNopay() {
        this.fnToastMsg('未付款不能查看签证');
      },
      fnOrder_data() {
        this.mine.order_data = this.mine.order_data.reverse();
        this.order_data = this.mine.order_data;
        // this.mine.order_data.forEach(y => {
        //   y.endTime = DateFmt(new Date(y.endTime), 'yyyy/MM/dd hh:mm');
        //   y.addTime = DateFmt(new Date(y.addTime), 'yyyy/MM/dd hh:mm');
        // });
        for (var i = 0; i < this.order_data.length; i++) {
          this.order_data[i].endTime = DateFmt(this.order_data[i].endTime, 'yyyy/MM/dd hh:mm')
          this.order_data[i].addTime = DateFmt(this.order_data[i].addTime, 'yyyy/MM/dd hh:mm')
        }
      }
    },
    components: {
      Clocker,
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },


    },
    props: {
    }
  }

</script>
<style scoped>
  .box-details-list {
    padding: 0 10px;
    position: relative;
    background: #fff;
  }

  .box-details-list.list-3 {
    padding-bottom: 6px;
    margin-bottom: 8px;
  }

  .box-details-list.list-3::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: #d9d9d9;
    /*transform: scaleY(.5);*/
  }

  .details-list-title {
    padding: 8px 0 0px;
    font-size: 14px;
    line-height: 18px;
    font-weight: 700;
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 0);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 0);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: 0 0;
  }

  .details-list-row {
    width: 100%;
    overflow: hidden;
  }

  .box-order-list-header a.title-name {
    text-decoration: underline;
  }

  .details-list-row .left-item {
    color: rgb(107, 107, 107);
  }

  .details-list-row .right-item {
    text-align: right;
  }

  .details-list-row.row-1 .left-item {
    width: 70%;
    float: left;
    line-height: 24px;
    font-size: 14px;
    overflow: hidden;
  }

  .details-list-row.row-1 .right-item {
    width: 30%;
    float: left;
    text-align: right;
    font-size: 18px;
    color: rgb(255, 102, 0);
  }

  .details-list-row.row-2 {
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 4px;
    overflow: initial;
  }

  .details-list-row.row-2 .left-item {
    /*width: 50%;
    float: left;*/
    padding: 0px 0 2px;
    font-size: 13px;
    overflow: hidden;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    word-break: break-all;
  }

  .details-list-row.row-2 .right-item {
    /*width: 50%;
    float: left;
    margin-top: 1px;*/
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin-top: -6px;
  }

  .details-list-row.row-3 {
    line-height: 24px;
  }

  .details-list-row.row-3 .left-item {
    width: 50%;
    float: left;
    padding: 0px 0 2px;
    font-size: 13px;
  }

  .details-list-row.row-3 .right-item {
    width: 50%;
    float: left;
    margin-top: -1px;
    font-size: 13px;
    color: #6B6B6B;
  }

  .box-small-circle {
    padding: 0 4px;
    border-radius: 3px;
    font-size: 10px;
    margin: 0 2px;
    display: inline-block;
    border: 1px solid rgb(0, 153, 255);
    color: rgb(0, 153, 255);
    line-height: initial;
    vertical-align: middle;
    box-sizing: border-box;
  }

  .box-small-circle.no-normal {
    color: grey;
    border-color: grey;
  }

  .box-order-list-header {
    overflow: hidden;
    padding: 8px 0 3px;
    position: relative;
  }

  .box-order-list-header.footer {
    padding: 8px 0 3px;
  }

  .box-order-list-header .left-item {
    width: 50%;
    float: left;
    line-height: 24px;
    font-size: 14px;
    overflow: hidden;
    color: rgb(107, 107, 107);
  }

  .box-order-list-header.footer .left-item {
    line-height: 27px;
  }

  .box-order-list-header.header .left-item {

    color: #6B6B6B;
  }

  .box-order-list-header.header .left-item span {
    vertical-align: middle;
    margin-top: -1px;
  }

  .box-order-list-header .right-item {
    width: 50%;
    float: left;
    line-height: 24px;
    font-size: 14px;
    overflow: hidden;
    color: red;
    text-align: right;
  }

  .box-order-list-header.footer .left-item {
    color: #6B6B6B;
  }

  .box-order-list-header.footer::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1px;
    background: #d4d4d4;
    transform: scaleY(.5);
  }
</style>