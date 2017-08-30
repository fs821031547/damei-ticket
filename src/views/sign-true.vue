<template>
  <div style="padding-bottom:50px">
    <div v-if="!status" class="noknow-box">
      <img src="../assets/sign_1.jpg" alt="">
      <img src="../assets/sign_2.jpg" alt="">
      <img src="../assets/sign_3.jpg" alt="">
      <img src="../assets/sign_4.jpg" alt="">
    </div>
    <div v-if="status" class="noknow-box">
      <img src="../assets/signfalse.png" alt="">
    </div>
    <div v-if="!$route.query.status && !status" class="baoming-btn" @click="$router.push({name:'apply',params:{refresh:true}})">立即报名</div>
    <div v-if="status" class="baoming-btn" @click="$router.push({name:'ticket'})">去兑奖</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        status: false,
      }
    },
    created() {
      if (!this.mine.id) {
        this.$store.dispatch('mine/mine_request').then(x => {
          this.fnInit()
          if (this.mine.order_data && this.mine.order_data.length != 0) {
            this.$router.push({ name: 'my-apply' });
          }
        });
      } else {
        this.fnInit()
      }

      // if(this.$route.query.status){
      //   this.status=true;
      // }
    },
    methods: {
      fnInit() {
        if (this.mine.exchange_code && this.mine.exchange_code.length>0) {
          this.status = false;
        } else {
          this.status = true;
        }
      }
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
    },
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