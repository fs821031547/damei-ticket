<template>
  <div>
    <my-header>选择订单</my-header>
    <div class="my-orderlist-fixed">
      <my-pad></my-pad>
      <divider v-if="order.length==0">您还没有订单，请先去报名后就可以选择了</divider>
      <radio style="background: #fff" :options="order" @on-change="onchange"></radio>
    </div>
    <my-bottom-box>
      <x-button style="border-radius:0;" type="primary" @click.native="fnNext">下一步</x-button>
    </my-bottom-box>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        order: [],
        id: '',
        orderSelect: {},
      }
    },
    created() {
      if (!this.mine.id) {
        this.$store.dispatch('mine/mine_request','apply').then(x => {
          this.list();
        });
      } else {
        this.list();
      }
    },
    methods: {
      onchange(v) {
        this.id = v;
        let order = this.mine.order_data;
        let orderSelect = order.find(x => {
          return x.ordId == v;
        })
        this.orderSelect = orderSelect;
      },
      list() {
        let order = this.mine.order_data;
        let list = [];
        order.forEach(x => {
          if (x.is_change_plan == 0 && x.isOK == 1) {
            list.push(x.ordId);
          }
        })
        this.order = list.reverse();
      },
      fnNext() {
        if (!this.id) {
          this.$vux.toast.show({
            text: '请选择订单',
            time: 3000,
          });
          return;
        }
        let order = this.orderSelect;
        this.$store.dispatch('plan/change_order', order);
        this.$router.push({
          name: 'plan-select',
          query: {
            id: this.id
          }
        })
      }
    },
    components: {},
    computed: {
      mine() {
        let order = this.$store.getters["mine/mine"];
        return order;
      },
    },
    props: {}
  }

</script>
<style>

.my-orderlist-fixed{
  position: absolute;
  z-index:10000000000;
  top:46px;
  left:0;
  right:0;
  bottom:0;
  padding-bottom:60px;
  background:#f2f2f2;
}
.my-bottom-box{
  z-index:10000000001!important;
}

.weui-toast{
  z-index:10000000001!important;
}
.weui-dialog{
    z-index:10000000001!important;
  }
</style>
