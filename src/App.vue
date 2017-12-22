<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'app',
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      }
    },
    created() {
        //请求后处理
      Vue.http.interceptors.push((req, next) => {
        // console.log('req:',req)
        next((res) => {
          console.log('res:', res)
          let body={};
          if(res.status!==200){
            if(res.bodyText.length>200){
              res.bodyText=res.bodyText.slice(0,200)
            }
            body.errorMsg= res.bodyText;
            body.sysName = req.url;
            this.toBad('errored',body)
          }else{
            let url=['search-exchange-code'];
            if(url.includes(req.url)&&res.bodyText==='新用户,无数据'){
              return res;
            }
            if(url.includes(req.url)&&res.bodyText==''){
              body.errorMsg= '未知错误！';
              body.sysName = req.url;
              this.toBad('errored',body);
              return res;
            }
            if(url.includes(req.url)&&res.bodyText[0]!='{'){
              body.errorMsg= '未知错误！';
              body.sysName = req.url;
              this.toBad('errored',body)
            }
          }
          return res;
        });
      });
      let mine = this.$store.getters["mine/mine"];
      // console.log(process.env);
      if (process.env.NODE_ENV == 'development') {
        this.$store.dispatch('mine/request_enter');
      }
      // this.$store.dispatch('mine/requestPayType');
      // console.log(this.$route);

    },
    methods: {
      toBad(view, body) {
        if (view && body) {
          setTimeout(() => {
            this.$router.replace({
              name: view,
              params: {
                errorCode: body.errorCode,
                errorMsg: body.errorMsg,
                sysName: body.sysName,
                domain: body.domain,
                sign: body.sign || false,
              }
            })
          }, 0); //使请求流程走完，再进行页面跳转
        }
      },
    }
  }

</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  html {
    height: 100%;
    overflow-x: hidden;
  }

  body {
    background-color: #f2f2f2;
    height: 100%;
    position: relative;
  }

  #app {
    height: 100%;
  }

  div,
  p {
    box-sizing: border-box;
  }

  .my-pad {
    height: 40px;
  }
  /*color*/

  .red {
    color: #FF0000;
  }

  .green {
    color: #02B202;
  }

  .green1 {
    color: #03A203;
  }

  .blue {
    color: #006699;
  }

  .orange {
    color: #FF6600;
  }

  .yellow {
    color: #F5CC0A;
  }

  .gray {
    color: #8F8F8F;
  }

  .black {
    color: #000000;
  }

  .white {
    color: #FFFFFF;
  }

  .bg-white {
    background: #fff;
  }

  .my-title {
    text-align: center;
    font-size: 17px;
    margin-top: 10px;
    color: red;
    font-weight: 500
  }

  .ticket-form {
    padding: 10px 0px 30px;
    color: #666;
  }

  .tip {
    color: #666;
    text-align: center;
    font-size: 15px;
  }

  .ticket-form-head {
    font-size: 14px;
    color: #666;
    line-height: 20px;
    padding: 0 15px;
  }

  .ticket-form-body {
    /*padding: */
    padding: 10px 0;
  }

  .ticket-form-foot {
    padding: 0 15px;
    font-size: 13px;
  }

  .weui-footer {
    color: #999999;
    font-size: 12px;
    text-align: center;
  }
  /*.ticket-input*/

  .footer {
    width: 100%;
  }

  .footer-money {
    width: 50%;
    text-align: center;
    height: 42px;
    line-height: 42px;
    color: #666;
    font-size: 16px;
    background: #fff;
    float: left;
  }

  .vux-header {
    background-color: #fff!important;
  }

  .vux-header .vux-header-title {
    color: #000!important;
  }

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
