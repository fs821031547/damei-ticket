<template>
  <div>
    <my-header>选择订单</my-header>
    <div style="padding-top:46px">
      <my-pad></my-pad>

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
        orderSelect:{},
      }
    },
    created() {
      if (!this.mine.id) {
        this.$store.dispatch('mine/mine_request').then(x => {
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
        let orderSelect=order.find(x => {
          return x.ordId==v;
        })
        this.orderSelect=orderSelect;
      },
      list() {
        console.log('this.mine:', this.mine);
        let order = this.mine.order_data;
        let list = [];
        order.forEach(x => {
          if (x.is_change_plan == 0) {
            list.push(x.ordId);
          }
        })
        this.order = list;
      },
      fnNext(){
        let order= this.orderSelect;
        this.$store.dispatch('plan/change_order',order);
        this.$router.push({name:'plan-select',query:{id:this.id}})
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


</style>
