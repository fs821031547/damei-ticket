<template>
  <div>
    <my-header>我的团期</my-header>
    <div style="padding:20px;text-align: center">暂无此功能</div>
    <!--<div style="padding-top:46px">
      <my-pad></my-pad>
      <div class="box-details-list list-3" v-for="item in order_data" @click="orderClick(item)">
        <div class="box-order-list-header header">
          <div class="left-item">
            <span class="title-name">欢乐美国阳光西岸8日精品游</span>
          </div>
          <div class="right-item" style="color:#666">订单：{{item.ordid}}
          </div>
        </div>
        <div class="details-list-row row-2">
          <div class="left-item">{{item.startTime}}</div>
          <div class="right-item">
            {{item.num}}人
          </div>
        </div>
        <div class="details-list-row row-3">
          <div class="left-item">{{item.endTime}}</div>
          <div class="right-item">
            {{item.fromCity}}
          </div>
        </div>
        <div class="box-order-list-header footer">
          <div class="left-item" @click.stop="fnNext">
            {{item.startTime}}
          </div>
          <div class="right-item">
            <a class="title-name" style="color:#666">查看行程>></a>
          </div>
        </div>
      </div>
    </div>
    <my-bottom-box>
      <x-button style="border-radius:0;" type="primary" @click.native="$router.push({name:'order-list'})">选择订单</x-button>
    </my-bottom-box>-->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        order_data: [{
            ordid: 10001,
            startTime: DateFmt(new Date(), 'yyyy-MM-dd hh:mm'),
            endTime: DateFmt(new Date(), 'yyyy-MM-dd hh:mm'),
            num: 3,
            fromCity: '广州出发',
          },
          {
            ordid: 10002,
            startTime: DateFmt(new Date(), 'yyyy-MM-dd hh:mm'),
            endTime: DateFmt(new Date(), 'yyyy-MM-dd hh:mm'),
            num: 3,
            fromCity: '深圳出发',
          },
        ],
      }
    },
    created() {
    },
    methods: {

    },
    components: {},
    computed: {

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
