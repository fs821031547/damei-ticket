<template>
  <div style="padding-bottom:50px;">
    <my-header>附件</my-header>
    <div style="padding-top:46px">
      <div class="bg-white" v-for="item,index in row">
        <my-pad height="10" style="background:#f2f2f2"></my-pad>
        <cell :title="item.title" v-if="isIos" is-link @click.native="fnTip">
          <div slot="value">
            <x-button mini type="primary" size="small">下载</x-button>
          </div>
        </cell>
        <cell :title="item.title" v-else @click.native="formWord(index)">
          <div slot="value">
            <x-button mini type="primary" size="small">下载</x-button>
          </div>
        </cell>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    data() {
      return {
        row: [],
        href: '',
      }
    },
    created() {
      this.$store.dispatch("mine/mine_request");
      let ordID = this.$route.query.id;
      Vue.http.post(
        "get-files", {
          ordID
        }, {
          emulateJSON: true
        }
      ).then(res => {
        if (!res.body) return;
        let data = res.body.rows;
        if (data) {
          this.row = data;
          // this.href = data.files;
        }
        //commit("confirmConfig", { data });
        return res.body;
      })
    },
    methods: {
      formWord(index) {
        let href = this.row[index].files;
        if(!href){
          this.$vux.toast.show({text:'该附件无可下载的内容'})
          return;
        }
        var form = document.createElement('form');
        form.setAttribute('action', href);
        form.setAttribute("method", "get");
        form.setAttribute('target', '_blank');
        form.style.display = 'none';
        document.body.appendChild(form);
        form.submit();
        // form.remove();
        document.body.removeChild(form);
      },
      fnTip() {
        // 显示
        this.$vux.confirm.show({
          title: '提示',
          content: '请点击右上角在浏览器中打开并点击下载',
          cancelText: "null",
          confirmText: '知道了',
        })
      }
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
      isIos() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          var u = navigator.userAgent;
          var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
          var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
          if (isAndroid) {
            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }

      }
    },
    props: {}
  }

</script>
<style scoped>


</style>
