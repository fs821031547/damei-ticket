<template>
  <div>
    <div class="noknow-box">
      <img src="../assets/signfalse.png" alt="">
    </div>
    <div v-show="show==1" @click="$router.push({name:'ticket'})" class="baoming-btn">去兑奖</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        title: '恭喜您',
      }
    },
    computed: {
      show() {
        if (this.$route.query.show == 0) {
          return 0;
        } else {
          return 1;
        }

      }
    },
    created() {
      // Vue.http.post(
      //   "sys/main?xwl=343XORN1IN3S",
      // ).then(res => {
      //   if (!res.body) return;
      // })
    },
    props: {
    },
    beforeRouteLeave(to, from, next) {
      next();
    }

  }

</script>
<style scoped>
  .noknow-box {
    width: 100%;
    overflow: hidden;
  }

  .noknow-box img {
    width: 100%;
    display: inherit;
  }

  .baoming-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: #f2f2f2;
    text-align: center;
    font-size: 16px;
    color: #000;
    height: 50px;
    line-height: 50px;
  }
</style>