<template>
  <!--<x-header title></x-header>-->
  <div>
    <x-header :left-options="{backText: ''}">选择支付方式</x-header>
    <!--<tab :line-width="2" :custom-bar-width="getBarWidth" style="border-top: 1px solid #e5e5e5;">
      <tab-item selected @on-item-click="onItemClick">二维码支付</tab-item>
    </tab>-->
    <!-- <my-pad height="8"></my-pad> -->
    <div class="qrcode-box" v-show="!qrcodeShow">
      <!-- <div class="qrcode-title">扫码或长按识别付款</div> -->
      <!--<div class="qrcode-head">{{ NumFmt(qrcodeData.money,2) || '0' }}</div>-->
      <div class="qrcode-body">
        <!-- <img :src="qrcode"> -->
        <!-- <iframe src="qrcode" style="width: 100%; height: 330px;display: block;" frameborder="0"></iframe> -->
      </div>
      <div class="qrcode-footer">
        <!-- <div class="img-box" style="margin-right:10px;">
          <img src="../assets/weixin.png" alt="">
          <img src="../assets/alipy.png" alt="">
        </div>
        <div class="qrcode-footer-content">
          微信、支付宝<br>均可直接支付
        </div> -->
      </div>
      <div style="padding:15px 15px;">
        <x-button type="primary" @click.native="fnIsPay(1)">付款完成</x-button>
        <p style="font-size:14px;color:#666;text-align:center;margin-top:10px;">如您已经完成付款，请点击付款完成</p>
      </div>
    </div>
    <div class="bank-list" v-show="qrcodeShow">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media">
          <a href="javascript:;" class="">
            <div class="mui-media-body">
              工商银行
            </div>
          </a>
        </li>
      </ul>
    </div>
    <toast v-model="toastShow" type="text" is-show-mask :text="toastMsg" position="middle"></toast>

  </div>

</template>
<script>
  import {
    Tab,
    TabItem
  } from 'vux'
  export default {
    data() {
      return {
        tabWay: ['二维码支付'],
        getBarWidth: function (index) {
          if (!index) {
            return '80px'
          } else {
            return '60px'
          }
        },
        qrcodeShow: 0,
        qrcode: '',
        key: '',
        toastMsg: '',
        toastShow: false,
      }
    },
    created() {

      let data = this.qrcodeData;
      let routerName = this.$route.query.names;
      console.log('qrcodeData:', data);
      data.backUrl=window.location.href;
      // let money = 0.01 * 100;
      this.$store.dispatch('mine/exchange_code_qrcode', data).then(x => {
        if (x && x.executeStatus == 0 && x.qrcode) {
          // console.log(x.qrcode);
          // this.qrcode = "http://pan.baidu.com/share/qrcode?w=240&h=240&url=" + x.qrcode;
          window.location.href = x.qrcode;
        }else{
          this.fnToastMsg(x.msg);
        }
      }).catch(x=>{
        this.fnToastMsg('接口异常');
      });
      // if (!this.$route.params.refresh) {
      //   this.fnIsPay();
      // }
      // setInterval(() => {
      this.fnIsPay();
      // }, 1000)
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
      ticketSelect() {
        return this.$store.getters["mine/ticketSelect"];
      },
      code_info() {
        return this.$store.getters["mine/code_info"]
      },
      preOrder() {
        return this.$store.getters["apply/placeOrder"]
      },
      qrcodeData() {
        return this.$store.getters["mine/qrcodeData"]
      },
      code_id() {
        return this.$store.getters["mine/code_id"]
      },


    },
    methods: {
      onItemClick(index) {
        this.qrcodeShow = index;
      },
      fnToastMsg(msg) {
        this.toastShow = true;
        this.toastMsg = msg;
      },
      fnIsPay(arg) {
        // setInterval(() => {
        let routerName = this.$route.query.names;
        if (this.key) {
          this.$store.dispatch('mine/select_pay_status', this.key).then(x => {
            if (x.success) {
              this.fnToastMsg(x.msg);
              if (routerName == 'ticket') {
                this.updateTicket(); //修改二维码状态
              } else if (routerName == 'order') {
                this.confirmOrder(); //确认订单
              }
            } else {
              this.fnToastMsg(x.msg);
            }
          })
        }
        // }, 300);

      },
      updateTicket() {
        this.$router.push({
          name: 'pay-success'
        });
      },
      confirmOrder() {
        this.$router.push({
          name: 'pay-complete'
        });
      }
    },
    components: {
      Tab,
      TabItem,
    },
  }

</script>
<style scoped>
  .qrcode-box {
    background: #fff;
    padding-bottom: 50%;
  }

  .qrcode-body {
    padding-top: 20px;
    text-align: center;
    width: 240px;
    height: 270px;
    margin: 10px auto 20px;
  }


  .qrcode-body img {
    height: 240px;
    width: 240px;
  }

  .qrcode-title {
    text-align: center;
    padding-top: 30px;
  }

  .qrcode-head {
    text-align: center;
    padding-top: 20px;
    color: orangered;
  }

  .qrcode-footer {
    width: 190px;
    margin: 0 auto;
    padding-left: 5px;
  }

  .qrcode-footer-content {
    line-height: 20px;
    font-size: 14px;
  }

  .img-box {
    width: 64px;
    float: left;
    overflow: hidden
  }

  .img-box img {
    width: 26px;
    padding: 0 3px;
    float: left;
    margin: 7px 0;
  }

  .mui-table-view {
    position: relative;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    background-color: #fff;
  }

  a {
    text-decoration: none;
  }

  .mui-table-view:before {
    position: absolute;
    right: 0;
    left: 0;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
    top: -1px;
  }

  .mui-table-view .mui-media,
  .mui-table-view .mui-media-body {
    overflow: hidden;
    /*background:#f76666;*/
  }

  .mui-table-view-cell {
    position: relative;
    overflow: hidden;
    padding: 11px 15px;
    -webkit-touch-callout: none;
  }

  .mui-table-view-cell>a:not(.mui-btn) {
    position: relative;
    display: block;
    overflow: hidden;
    margin: -11px -15px;
    padding: inherit;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: inherit;
  }

  .mui-table-view .mui-media-object.mui-pull-left {
    margin-right: 10px;
  }

  .mui-table-view .mui-media-object {
    line-height: 42px;
    max-width: 42px;
    height: 42px;
  }

  .mui-pull-left {
    float: left;
  }

  img {
    border: 0;
  }

  .mui-table-view .mui-media-body {
    box-sizing: border-box;
    overflow: hidden;
    font-family: 'Helvetica Neue', Helvetica, sans-serif;
    font-size: 17px;
    line-height: 21px;
    /*color:#fff;*/
  }

  .mui-table-view-cell p {
    margin-bottom: 0;
    font-size: 13px;
    margin-top: 0;
  }

  .mui-table-view-cell:after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 15px;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
  }

  .mui-table-view:after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
  }

</style>
