<template>
  <!--<x-header title></x-header>-->
  <div style="padding-bottom:50px;">
    <div class="vux-header" style="position:fixed;width:100%">
      <h1 class="vux-header-title" >
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
            {{NumFmt(item.order.billBak,2)}}
          </div>
        </div>
        <div class="box-order-list-header footer">
          <div class="left-item" @click.stop="fnNext" style="width:30%">
            <a class="title-name">查看行程>></a>
          </div>
          <div class="right-item" style="width:70%">
            <x-button mini type="primary" size="small" @click.native.stop="$router.push({name:'file',query:{id:item.ordId}})">附件下载
            </x-button>
            <x-button mini v-if="item.isOK==1" style="margin-top:0" type="default" size="small" @click.native.stop="$router.push({name:'visa-progress',query:{id:item.ordId}})">查看签证</x-button>
            <x-button mini v-else type="default" style="background:grey;margin-top:0" @click.native.stop="fnNopay" size="small">查看签证</x-button>
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
        // this.mine.order_data = this.mine.order_data.reverse();
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

</style>
