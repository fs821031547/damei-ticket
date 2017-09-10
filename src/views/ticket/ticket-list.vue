<template>
  <!--<x-header title></x-header>-->
  <div>
    <x-header :left-options="{backText: ''}">兑奖记录</x-header>
    <!--<panel header="图文组合列表" :right="right" :list="list" :type="type"></panel>-->
    <div class="weui-panel weui-panel_access" v-for="item in list" @click="fnNext(item)">
      <div class="weui-panel__hd" style="overflow: hidden;">
        <div style="width: 70%; float: left; font-size: 15px; color: rgb(0, 0, 0);">美国游1个</div>
        <div style="width: 30%; float: left; font-size: 15px; text-align: right;">
          <span style="color:#0099FF" v-if="item.status==1 || item.status==2">{{status[item.status]}}
            </span>
          <span class="grey" v-else>{{status[item.status]}}
            </span>
        </div>
      </div>
      <div class="weui-panel__bd">
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__bd">
            <p class="weui-media-box__desc">兑换时间：{{item.exist_time}}</p>
            <p class="weui-media-box__desc" style="margin-top:6px">兑奖码需在2017年10月31日前激活<br>在2018年2月28日前使用</p>
          </div>
        </a>
      </div>
      <div class="weui-panel__ft"></div>
    </div>


    <divider v-if="list.length==0">我是有底线的</divider>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        title: '兑奖记录',
        type: '1',
        right: '<span style="color:#0099FF">已兑奖</span>',
        list: [],
        status:['', '兑奖中', '已兑换', '使用中', '已放弃', '已失效', '已使用'],
      }
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
    },
    created() {
      let mine = this.$store.getters["mine/mine"];
      if (!mine.id) {
        this.$store.dispatch("mine/mine_request").then(x => {
          this.fnInit();
        });
      } else {
        this.fnInit();
      }

    },
    methods: {
      fnInit() {
        let list = this.mine.exchange_code;
        let status = ['', '兑奖中', '已兑换', '已使用', '已放弃', '已失效', '已使用'];
        list.forEach(x => {
          if (x.status != 1) {
            let exist_time = DateFmt(x.exist_time, 'yyyy/MM/dd hh:mm:ss');
            let date = new Date(exist_time);
            date.add("d", 2);
            x.exist_time = DateFmt(date, 'yyyy-MM-dd hh:mm:ss');
            x.str = status[x.status];
          }
        })
        this.list = list;
      },
      fnNext(item){
        if(item.status==2){
          this.$router.push({name:'ticket-complete'});
        }
      }
    },
    props: {
    }
  }

</script>
<style>

</style>
