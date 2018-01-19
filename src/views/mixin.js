import Vue from 'vue'
export default {
  data() {
    return {
      toastShow: false,
      toastMsg: '',
      iframeHtml:'',
    }
  },
  computed: {
    qrcodeData() {
      return this.$store.getters["mine/qrcodeData"]
    },
    //支付渠道
    payType(){
      return this.$store.getters["mine/payType"]
    }
  },
  methods: {
    toastFn(msg) {
      this.toastShow = true;
      this.toastMsg = msg;
    },
    loadData(fn) {
      // console.log('[TTX] 发送参数：', body);
      let url = this.postUrl;
      let data = this.postData;
      Vue.http.post(
        url,
        data, {
          emulateJSON: true
        }
      ).then(res => {
        let body = res.body;
        if (!body) return;
        let rows = body.rows;
        for (var key in rows) {
          this.$set(key, rows[key])
        }
        if (fn) {
          fn();
        }
      });

    },
    onBridgeReady(arg) {   //调用微信支付接口
      let data=arg;
      // let packages=data.package_info;
      // let packageStr= packages.slice(0,10)+packages.slice(26);
      function onBridgeReady() {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": data.appId,
            "timeStamp": data.timeStamp,
            "nonceStr": data.nonceStr,
            "package": data.package_info,
            "signType": data.signType, //微信签名方式：
            "paySign": data.paySign,
          },
          function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          }
        );
      }
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      } else {
        onBridgeReady();
      }
    },
    fnQrcodePay(url){
      if (url == 1) {
        this.$vux.loading.hide();
        this.$router.push({
          name: 'pay-way',
          query: {
            'names': 'ticket'
          },
          params: {
            refresh: true
          }
        })

      } else {
        this.$vux.loading.hide();
        this.$router.push({
          name: 'pay-way',
          query: {
            names: 'order'
          },
          params: {
            refresh: true
          }
        })
      }
    },
    fnWeiXinPay(url){
      if (url == 1) { //兑奖码
        url = 'pay-success'
      } else if (url == 2) { //订单
        url = 'pay-complete'
      }
      let data = this.qrcodeData;
      data.backUrl = window.location.origin + window.location.pathname + '#/' + url;
      return this.$store.dispatch('mine/exchange_code_qrcode', data).then(x => {
        this.$vux.loading.hide();
        if(x.success){
          x.backUrl=data.backUrl;  //支付成功的回调的地址
          let payInfo=JSON.stringify(x);
          window.localStorage.setItem('payInfo',payInfo);
          window.location.href='pay.html';
        }else{
          this.toastFn(x.msg || '操作失败');
        }
        // if (x && x.executeStatus == 0 && x.qrcode) {
          // console.log(x.qrcode);
          // this.qrcode = "http://pan.baidu.com/share/qrcode?w=240&h=240&url=" + x.qrcode;
          // window.location.href = x.qrcode;
          // window.location.href = '/sys/?xwl=144REY7M9Z3I&payid=' + x.key;
        // } else {
          // this.toastFn(x.msg);
        // }
      }).catch(x => {
        this.$vux.loading.hide();
        this.toastFn('接口异常');
      });
    },
    //跳转到支付接口
    fnReqPay(url) {
      this.$vux.loading.show({
        text: '正在跳转到付款页，请您耐心等待'
      });
      // this.fnQrcodePay(url);
      // if(this.payType==1){
      //   //微信支付
        this.fnWeiXinPay(url);
      // }else{
      //   //扫码付
      //   this.fnQrcodePay(url);
      // }
    }
  }
}
