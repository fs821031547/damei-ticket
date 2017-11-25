<template>
  <div style="padding-bottom:50px">
    <div v-if="!status" class="noknow-box">
      <!--<img class="previewer-demo-img" v-for="(item, index) in list" :src="item.src" @click="show(index)">-->
      <img class="previewer-demo-img" src="../assets/sign_1.jpg" @click="show(0)">
      <img class="previewer-demo-img" src="../assets/sign_2.jpg" @click="show(1)">
      <img class="previewer-demo-img" src="../assets/sign_3.jpg" @click="show(2)">
      <img class="previewer-demo-img" src="../assets/sign_4.jpg" @click="show(3)">
    </div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
    <div v-if="status" class="noknow-box">
      <img src="../assets/signfalse.jpg" alt="">
    </div>
    <div v-if="!$route.query.status && !status" class="baoming-btn" @click="$router.push({name:'apply',params:{refresh:true}})">立即报名</div>
    <div v-if="status" class="baoming-btn" @click="$router.push({name:'ticket'})">去激活</div>
  </div>
</template>
<script>
  import {
    Previewer,
    TransferDom
  } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Previewer
    },
    data() {
      return {
        status: false,
        // list: [{
        //   src: '../assets/sign_1.jpg',
        // },
        // {
        //   src: '../assets/sign_2.jpg'
        // }, {
        //   src: '../assets/sign_3.jpg'
        // }, {
        //   src: '../assets/sign_4.jpg'
        // }],
        options: {
          getThumbBoundsFn(index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {
              x: rect.left,
              y: rect.top + pageYScroll,
              w: rect.width
            }
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      }
    },
    created() {
      if (!this.mine.id) {
        this.$store.dispatch('mine/mine_request','apply').then(x => {
          this.fnInit()
          if (this.mine.order_data && this.mine.order_data.length != 0) {
            this.$router.push({
              name: 'my-apply'
            });
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
        if (this.mine.exchange_code && this.mine.exchange_code.length > 0) {
          this.status = false;
        } else {
          this.status = true;
        }
      },
      show(index) {
        this.$refs.previewer.show(index)
      }
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
      list() {
        let arr = [];
        setTimeout(() => {
          let img_dom = document.querySelectorAll('.previewer-demo-img');
          for (let i = 0; i < img_dom.length; i++) {
            let obj = {};
            obj.src = img_dom[i].src;
            arr.push(obj);
          }
        }, 100);

        return arr;
      }
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
