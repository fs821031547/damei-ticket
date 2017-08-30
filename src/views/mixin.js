import Vue from 'vue'
export default {
  data() {
    return {
      toastShow: false,
      toastMsg: '',
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
        data,
        { emulateJSON: true }
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

    }
  }
}