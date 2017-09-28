<template>
  <div>
    <my-header>我的团期</my-header>
    <!--<div style="height:46px;"></div>
    <div style="padding:20px;text-align: center">暂无此功能</div>-->
    <div style="padding-top:46px">
      <my-pad></my-pad>
      <divider v-if="order_data.length==0">您还没有选择团期，请点击下方按钮去选择</divider>
      <div class="box-details-list list-3" v-for="item in order_data" @click="orderClick(item)">
        <div class="box-order-list-header header">
          <div class="left-item" style="width:70%">
            <span class="title-name">{{item.lineName || '欢乐美国阳光西岸8日精品游'}}</span>
          </div>
          <div class="right-item" style="color:#666;width:30%">订单：{{item.ordId}}
          </div>
        </div>
        <div class="details-list-row row-2">
          <div class="left-item">出发：{{item.planDate}}</div>
          <div class="right-item">
            {{item.personDates.length}}人

          </div>
        </div>
        <div class="details-list-row row-3">
          <div class="left-item">回团：{{ DateFmt(item.backDate,'yyyy-MM-dd')}}</div>
          <div class="right-item">
            {{item.to_travel}}
          </div>
        </div>
        <div class="box-order-list-header footer">
          <div class="left-item" @click.stop="fnNext">
            {{DateFmt(item.updateTime,'yyyy-MM-dd hh:mm:ss')}}
          </div>
          <div class="right-item">
            <a class="title-name" style="color:#666" @click.stop="fnViewLine">查看行程>></a>
          </div>
        </div>
      </div>
    </div>
    <my-bottom-box>
      <x-button style="border-radius:0;" type="primary" @click.native="$router.push({name:'order-list'})">选择订单</x-button>
    </my-bottom-box>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        order_data: [
          // {
          //   ordid: 10001,
          //   startTime: DateFmt(new Date(), 'yyyy-MM-dd hh:mm'),
          //   endTime: DateFmt(new Date(), 'yyyy-MM-dd hh:mm'),
          //   num: 3,
          //   fromCity: '广州出发',
          // },
        ],
      }
    },
    created() {
      // if(!this.mine.id){
      this.$store.dispatch('mine/mine_request').then(end => {
        let order = this.mine.order_data;
        let list = [];
        order.forEach(x => {
          if (x.is_change_plan == 1) {
            list.push(x);
          }
        })
        this.order_data = list;
      });
      // }
    },
    methods: {
      orderClick(item) {
        this.$store.dispatch('plan/change_plan_select', item);
        this.$router.push({
          name: 'plan-info',
          query: {
            id: item.ordId
          }
        });
      },
      fnViewLine() {
        this.$router.push({
          name: 'sign-true',
          query: {
            status: true
          }
        });

      },
    },
    components: {},
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
    },
    props: {}
  }

</script>
<style>
  .plan-tips {
    padding-top: 40%;
    text-align: center;
    font-size: 16px;
    color: #666;
  }

</style>
