<template>
  <div style="padding-bottom:80px">
    <my-header>选择团期</my-header>
    <div style="top:46px;position: fixed; height:345px;left:0;right:0;z-index:10000000000;overflow: hidden">
      <my-pad></my-pad>
      <div style="color:#999;padding: 0 10px;font-size:14px"><span style="color:#333">温馨提示：</span>为了您的正常出行，建议您选择出发距离您美国签证的面谈时间20天以上的团期。</div>
      <my-pad></my-pad>
      <inline-calendar ref="calendar" @on-change="onChange" @on-view-change="onViewChange" class="inline-calendar-demo" :show.sync="show"
        v-model="value" start-date="2016-04-01" end-date="2020-05-30" :range="range" :show-last-month="showLastMonth" :show-next-month="showNextMonth"
        :highlight-weekend="highlightWeekend" :return-six-rows="return6Rows" :hide-header="hideHeader" :hide-week-list="hideWeekList"
        :replace-text-list="replaceTextList" :weeks-list="weeksList" :render-function="buildSlotFn" :disable-past="disablePast"
        :disable-future="disableFuture" :marks="marks">
      </inline-calendar>
    </div>
    <!--<div class="plan-list-row" v-for="item in list">
      <div class="column1">
        <div>{{item.date}}</div>
        <div style="text-align:left">{{item.week}}</div>
      </div>
      <div class="column2">
        <div>{{item.plan}}</div>
        <div>{{item.city}}</div>
      </div>
      <div class="column3">
        <span style="color: orange">{{item.yuwei}}</span>
      </div>
    </div>-->
    <my-pad height="391"></my-pad>
    <divider v-if="planList.length==0">没有团期信息</divider>
    <div class="plan-list plan-list-row" v-for="item ,index in planList" @click="fnSelectPlan(item,index)">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"></span>
        </div>
        <div class="mint-cell-value">
          <div class="column">
            <icon v-if="planSelect==index" type="success"></icon>
            <icon v-else type="circle"></icon>
            <label>　</label>
          </div>
          <div class="column1">
            <div>{{ DateFmt(item.PlanDate , 'MM-dd' )}}</div>
            <div style="text-align: left;">{{item.weekday}}</div>
          </div>
          <div class="column2">
            <div>团：{{item.planCode}}</div>
            <div>{{item.fromcityName}}</div>
          </div>
          <div class="column3"><span style="color: orange;">余位：{{ item.endNum >=9? '≥9' : item.endNum}}</span></div>
        </div>
      </div>
    </div>
    <my-pad height="20"></my-pad>

    <my-bottom-box style="z-index:10000000000">
      <!--<div class="bg-white hetong">
        <span class="checked" @click.stop.prevent="checkBtn">
          <check-icon :value="checked" type="plain"></check-icon>
          </span> 我已阅读
        <span @click="toVisaTip"><a style="text-decoration:underline;color:#0fa3ed">电子合同内容</a></span>
      </div>-->
      <x-button style="border-radius:0;" type="primary" @click.native="fnNext">确认所选出发日期</x-button>
      <!--<x-button v-else style="border-radius:0;background:#adadad" type="primary">确认所选出发日期</x-button>-->
    </my-bottom-box>
  </div>
</template>
<script>
  import {
    InlineCalendar,
    Icon,
    CheckIcon
  } from 'vux'
  export default {
    data() {
      return {
        show: true,
        value: '',
        listValue: '',
        range: false,
        showLastMonth: true,
        showNextMonth: true,
        highlightWeekend: false,
        return6Rows: true,
        hideHeader: false,
        hideWeekList: false,
        replaceTextList: {},
        replace: false,
        changeWeeksList: false,
        weeksList: [],
        useCustomFn: false,
        buildSlotFn: () => '',
        disablePast: false,
        disableFuture: false,
        marks: [],
        list: [],
        planList: [],
        planSelect: 0,
        checked: true,
        planObj: {}, //所选转团团期信息
      }
    },
    created() {
      let now = DateFmt(new Date(), 'yyyy-MM-dd');
      this.fnInit(now);
    },
    methods: {
      fnInit(now) {
        this.$store.dispatch('plan/request_plan', now).then(end => {
          let marks = [];
          this.list = end;
          //如果x.num大于0为不满团 等于0满团
          end.forEach(x=>{
            x.num=0;
            end.forEach(y=>{
              if(x.PlanDate==y.PlanDate){
                x.num+=y.endNum;
              }
            })
          })
          // console.log('end:',end);
          end.forEach(x => {
            let obj = {};
            obj.date = DateFmt(x.PlanDate, 'yyyy-MM-dd');
            if (x.num == 0) {
              obj.color = 'red';
              obj.bottomDot = true;
            } else {
              obj.color = '#04BE02';
              obj.bottomDot = true;
            }
            if (now == DateFmt(new Date(), 'yyyy-MM-dd')) {
              if (new Date(obj.date).getDate() >= new Date().getDate()) {
                marks.push(obj);
              }
            } else {
              marks.push(obj);
            }
          })
          this.onChange(now);
          this.marks = marks;
        });
      },
      onChange(val) {
        let planList = [];
        this.list.forEach(x => {
          let PlanDate = DateFmt(x.PlanDate, 'yyyy-MM-dd');
          if (val == PlanDate) {
            planList.push(x);
          }
        });
        this.planList = planList;
        this.planObj = planList[0];
        this.planSelect = 0;
      },
      fnNext() {
        let _this = this;
        if (!this.planList.length || this.planSelect == -1) {
          this.$vux.toast.show({
            text: '请选择团期'
          })
          return;
        }
        if (this.planObj.endNum < this.orderSelect.personDates.length) {
          this.$vux.toast.show({
            text: '订单人数大于团期余位人数，不能选团'
          })
          return;
        }
        this.$vux.confirm.show({
          title: '温馨提示',
          content: '请谨慎选择您的团期<br>一经确认无法修改!',
          cancelText: "取消",
          confirmText: '确认',
          onConfirm() {
            _this.orderChangePlan();
          }
        })
      },
      orderChangePlan() {
        this.$vux.loading.show({
          text: '正在选团，请勿重新操作！'
        })
        let data = {};
        let oldOrder = this.orderSelect;
        data.ordID = oldOrder.ordId;
        data.planCode = oldOrder.planCode;
        data.planID = oldOrder.planID;
        data.newPlanCode = this.planObj.planCode;
        data.newPlanID = this.planObj.id;
        this.$store.dispatch('plan/order_change_plan', data).then(end => {
          this.$vux.loading.hide()
          if (end.success) {
            this.$vux.toast.show({
              text: '选团成功',
            });
            let plan = {};
            plan = data;
            plan.personDates = oldOrder.personDates;
            plan.lineName = end.lineName;
            plan.to_go = end.to_go; //出发城市
            plan.to_travel = end.to_travel; //起止城市
            plan.planDate = end.planDate; //出团日期
            plan.backDate = DateFmt(end.planDate, 'yyyy-MM-dd', 'd+' + (end.days - 1)); //天数
            this.$store.dispatch('plan/change_plan_select', plan);
            this.$router.push({
              name: 'plan-info'
            })
          } else {
            this.$vux.toast.show({
              text: end.msg || '选团失败'
            });
          }
        }).catch(end => {
          this.$vux.loading.hide()
          this.$vux.toast.show({
            text: '接口异常'
          });
        })
      },
      fnSelectPlan(item, index) {
        this.planSelect = index;
        this.planObj = item;
        console.log(item);
      },
      onViewChange(val) {
        let month = new Date().getMonth() + 1;
        let now = DateFmt(new Date(), 'yyyy-MM-dd');
        if (month == val.month) { //选中今天的团期
          this.fnInit(now);
        } else {
          this.fnInit(val.firstCurrentMonthDate);
        }

        console.log('onViewChange:', val);
      },
      toVisaTip() {
        this.$router.push('visa-tip');
      },
      // checkBtn() {
      //   this.checked = !this.checked;
      // },
    },
    components: {
      InlineCalendar,
      Icon,
      CheckIcon
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
      plan() {
        return this.$store.getters["plan/plan"];
      },
      orderSelect() {
        return this.$store.getters["plan/orderSelect"];
      }
    },
    props: {}
  }

</script>
<style>
  .is-disabled {
    pointer-events: none
  }

  .vux-calendar-dot {
    background-color: #000;
  }

  .mint-cell-wrapper {
    background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 0);
    background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 0);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-origin: content-box;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    padding: 0 10px;
    width: 100%;
  }

  .mint-cell-wrapper {
    -webkit-transition: -webkit-transform .15s ease-in-out;
    transition: -webkit-transform .15s ease-in-out;
    transition: transform .15s ease-in-out;
    transition: transform .15s ease-in-out, -webkit-transform .15s ease-in-out;
  }

  .plan-list .mint-cell-title {
    -webkit-box-flex: 0;
    -ms-flex: none;
    flex: none;
  }

  .mint-cell-wrapper {
    background-origin: border-box;
  }

  .mint-cell-wrapper {
    position: relative;
  }

  .mint-cell-value {
    color: #888;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .plan-list .mint-cell-value {
    width: 100%;
    font-size: smaller;
  }

  .plan-list-row {
    display: flex;
    height: 68px;
  }

  .plan-list-row .column1 div:nth-child(1) {
    padding: 12px 0px 6px 0px;
    color: #000;
    /*font-size: 1.17em;*/
  }

  .plan-list-row .column1 div:nth-child(2) {
    padding: 6px 0px 12px 0px;
  }

  .plan-list-row .column2 div:nth-child(1) {
    padding: 12px 0px 6px 0px;
    color: #000;

    /*width: 14em;*/
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .plan-list-row .column2 div:nth-child(2) {
    padding: 6px 0px 12px 0px;
    /*width: 16em;*/
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .plan-list-row {
    background-color: #FFFFFF;
  }

  .plan-list .column {
    flex: 1.5;
  }

  .plan-list .column1 {
    flex: 2;
    height: 58px;
  }

  .plan-list .column2 {
    flex: 6;
    height: 58px;
  }

  .plan-list .column3 {
    flex: 3;
    font-size: 1em;
    /*margin-right: 15px;*/
  }

  .hetong {
    height: 36px;
    line-height: 36px;
    /*padding: 0 10px 0 20px;*/
    font-size: 15px;
    color: #666;
  }

  .hetong .checked {
    padding: 0 0 0 10px;
    height: 36px;
    display: inline-block;
  }

  .hetong .checked .weui-icon-circle {
    font-size: 20px;
  }

  .hetong .checked .weui-icon-success-circle {
    font-size: 20px;
  }
  .weui-toast{
  z-index:10000000001!important;
}

  .weui-dialog{
    z-index:10000000001!important;
  }
</style>
