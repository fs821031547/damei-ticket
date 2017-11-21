import Vue from 'vue'
export default {
  data() {
    return {
      toastShow: false,
      toastMsg: '',
    }
  },
  computed: {
    qrcodeData() {
      return this.$store.getters["mine/qrcodeData"]
    },
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
    fnReqPay(url) {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        if (url == 1) { //兑奖码
          url = 'pay-success'
        } else if (url == 2) { //订单
          url = 'pay-complete'
        }
        let data = this.qrcodeData;
        data.backUrl = window.location.origin + window.location.pathname + '#/' + url;
        return this.$store.dispatch('mine/exchange_code_qrcode', data).then(x => {
          if (x && x.executeStatus == 0 && x.qrcode) {
            // console.log(x.qrcode);
            // this.qrcode = "http://pan.baidu.com/share/qrcode?w=240&h=240&url=" + x.qrcode;
            // window.location.href = x.qrcode;
            window.location.href = '/sys/?xwl=144REY7M9Z3I&payid=' + x.key;
          } else {
            this.toastFn(x.msg);
          }
        }).catch(x => {
          this.toastFn('接口异常');
        });
      }
      if (url == 1) {
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

    }
  }
}
