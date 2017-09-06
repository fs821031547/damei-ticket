<template>
  <div>
    <div class="noknow-box" style="padding-bottom:50px">
      <img src="../assets/visa-step.jpg" alt="">
    </div>
    <!--<a class="baoming-btn" href="./static/visa.docx" @click="formWord" download="visa.docx">下载</a>-->
    <a class="baoming-btn" v-if="isIos" @click="fnTip">下载</a>
    <a class="baoming-btn" v-if="!isIos" @click="formWord">下载</a>

  </div>
</template>
<script>
  export default {
    created() {

    },
    computed: {
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
    methods: {
      formWord(id) {
        var form = document.createElement('form');
        form.setAttribute('action', './static/visa.docx');
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
          cancelText:"null",
          confirmText:'知道了',
        })
      }
    }
  }

</script>
<style>
  .noknow-box {
    width: 100%;
    overflow: hidden;
  }

  .noknow-box img {
    width: 100%;
  }

  .baoming-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: #f2f2f2;

    font-size: 16px;
    color: #000;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
</style>