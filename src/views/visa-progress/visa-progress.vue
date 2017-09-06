<template>
  <div style="padding-bottom:50px;">
    <my-header>签证进度</my-header>
    <div style="padding-top:46px">
      <my-pad height="20"></my-pad>
      <div class="bg-white">
        <div>
          <cell :title="itemi.name" v-if="itemi.isOk!=null" v-for="itemi in list" :key="itemi.id" :class="itemi.qianzheng_result ? 'oranger-box' : 'color-true-box' "
            @click.native="fnPay(itemi)" :value="itemi.qianzheng_result" is-link></cell>
        </div>
      </div>
      <div class="visa-tips">
        ※注：如果进度为拒签的客人，可以点击跳转至付款重新下达签证。
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        visaStatus: { 20: '拒签', 0: '审核中' },
        visaColor: { 20: 'oranger-box', 0: 'color-true-box' },
        list: [],
        moneys: [0, 100, 1500, 2999],

      }
    },
    created() {
      let id = this.mine.id;
      let ordId = this.$route.query.id;
      // let id = 106448;
      let list = [];
      this.$store.dispatch('apply/visaPogress', { id: id }).then(x => {
        if (ordId) {
          let visaObj = this.visa.find(y => {
            return y.orderid == ordId;
          })
          if (visaObj) {
            visaObj.qianzheng.forEach(z => {
              z.orderid = visaObj.orderid;
              list.push(z);
            })
          }
          this.list = list;
          return;
        }
        this.visa.forEach(y => {
          y.qianzheng.forEach(z => {
            z.orderid = y.orderid;
            list.push(z);
          })
        })
        this.list = list;
      })

    },
    computed: {
      visa() {
        return this.$store.getters['apply/visa'];
      },
      mine() {
        return this.$store.getters["mine/mine"];
      },
    },
    methods: {
      fnPay(item) {
        if (item.qianzheng_result == '拒签') {
          let qrcodeData = {};
          let money = this.moneys[item.visa_type];
          // qrcodeData.money = money;
          qrcodeData.money = 1500;
          // qrcodeData.money = 0.02;
          qrcodeData.type = 2;
          qrcodeData.orderId = item.orderid;
          qrcodeData.id = this.mine.id;
          qrcodeData.userListId = item.id;
          // item.money=money;
          item.money = 1500;
          // item.money = 0.02;
          this.$store.dispatch('mine/changeQrcodeData', qrcodeData);
          this.$store.dispatch('apply/visaSelect', item);
          this.$router.push({ name: 'visa-info', query: { status: 'visa' } });
        }
      }
    },
    props: {
    }
  }

</script>
<style>
  .visa-tips {
    color: #666;
    font-size: 12px;
    line-height: 20px;
    padding: 12px;
  }

  .oranger-box .weui-cell__ft {
    color: orangered;
  }

  .color-true-box .weui-cell__ft {
    color: #0099ff
  }
</style>