<template>
  <!--<x-header title></x-header>-->
  <div style="padding-bottom:50px;">
    <x-header :left-options="{backText: ''}" style="position:absolute;left: 0px; top: 0px;z-index: 1001; width:100%;">选择签证</x-header>
    <div style="padding-top:46px">
      <my-pad></my-pad>
      <div class="bg-white">
        <cell title="产品名称" class="applys" :value="code_info.title || '欢乐美国阳光西岸8日精品游'" @click.native="fnViewLine"></cell>
        <cell title="人数" :value="personDates.length+'人'"></cell>
        <cell title="出发地" :value="fromCityName"></cell>
      </div>
      <group :title="'游客'+(index+1)" v-for="item,index in personDates" :key="item.id">
        <cell title="姓名" textAlign="right" :value="item.name"></cell>
        <cell title="性别" textAlign="right" :value="item.sex"></cell>
        <cell title="手机号" type="number" :value="item.phone" textAlign="right"></cell>
        <cell title="身份证号" textAlign="right" :value="item.identification"></cell>
        <cell title="签证情况" :value="item.visaVal || '请选择'" is-link :border-intent="false" :arrow-direction="item.visaStatus ? 'up' : 'down'"
          @click.native="item.visaStatus = !item.visaStatus"></cell>
        <div class="slide" :class="item.visaStatus ? 'animate':'' ">
          <label v-for="visa,visaIndex in item.visaStatusList" @click="visaBoxChange(index,visaIndex)" class="weui-cell weui-cell_radio weui-check__label">
            <div class="weui-cell__bd"><p> <span class="vux-radio-label">{{ visa }}</span></p></div>
            <div class="weui-cell__ft"><input type="radio"  class="weui-check">
              <span class="weui-icon-checked" :id="'visa'+index+visaIndex"></span></div>
          </label>
        </div>
        <cell title="签证办理" :value="item.visaWayVal || '请选择'" is-link :border-intent="false" :arrow-direction="item.visaWayStatus ? 'up' : 'down'"
          @click.native="item.visaWayStatus = !item.visaWayStatus"></cell>
        <div v-if="item.visaVal=='已有签证'" class="slide" :class="item.visaWayStatus ? 'animate':'' ">
          <label v-for="way,wayIndex in item.visaWayList" @click="visaWayChange(index,wayIndex)" class="weui-cell weui-cell_radio weui-check__label">
            <div class="weui-cell__bd"><p> <span class="vux-radio-label">{{ way }}</span></p></div>
            <div class="weui-cell__ft"><input type="radio"  class="weui-check">
              <span class="weui-icon-checked" :id="'label'+index+wayIndex"></span></div>
          </label>
        </div>
        <div v-else class="slide" :class="item.visaWayStatus ? 'animate':'' ">
          <label v-for="way,wayIndex in item.visaWayList1" style="padding:0" class="weui-cell weui-cell_radio weui-check__label">
            <div class="weui-cell__bd"  style="pointer-events:all;padding:10px 15px 10px 0"  @click="visaWayChange(index,wayIndex)"><p> <span class="vux-radio-label">{{ way }}</span></p></div>
            <div class="weui-cell__ft"><input type="radio"  class="weui-check">
              <span class="weui-icon-checked" style="pointer-events:all" @click="visaWayChange(index,wayIndex)" :id="'label'+index+wayIndex"></span></div>
              <!--<icon  type="info-circle"></icon>-->
              <i v-if="item.visaVal=='没有签证'" style="pointer-events: all;" @click.stop.prevent="$router.push({name:'visa'})" class="weui-icon weui_icon_info-circle weui-icon-info-circle"></i>
          </label>
        </div>
      </group>
      <my-pad></my-pad>
      <div class="bg-white hetong">
        <span class="checked" @click.stop.prevent="checkBtn">
          <check-icon :value="checked" type="plain"></check-icon>
          </span>
        <span @click="toVisaTip"> <a style="text-decoration:underline;color:#0fa3ed">已阅签证服务说明并同意</a></span>
      </div>
      <my-bottom-box>
        <div class="footer">
          <div class="footer-money">总金额：<span class="orange">{{ totalMoney ||　money}}</span></div>
          <x-button v-if="checked" type="primary" @click.native="placeOrder" style="border-radius:0;width:50%;float:left;">提交</x-button>
          <x-button v-else type="primary" ref="submit" style="border-radius:0;float:left;width:50%;background:#adadad">提交</x-button>
        </div>
      </my-bottom-box>
      <toast v-model="toastShow" type="text" is-show-mask :text="toastMsg" position="middle"></toast>
    </div>
  </div>

</template>
<script>
  import {
    Loading,
    CheckIcon,
    Icon
  } from 'vux'
  export default {
    data() {
      return {
        title: '兑奖记录',
        list: [{
          title: '游客信息',
        }],
        visaBox: false,
        visaStatus: ['已有签证', '没有签证'],
        visaVal: false,
        visaWayVal: false,
        visaWay: false,
        visaWayList: ['已办EVUS', '办理EVUS（100.00）'],
        visaWayList1: ['办理签证（1500.00）', '签证保障套餐（2999.00）'],
        fromCityName: '',
        toastShow: false,
        toastMsg: '',
        demo1: false,
        checked: false,
        clickStatus: false,
      }
    },
    components: {
      CheckIcon,
      Icon,
    },
    created() {
      let fromCityName = this.cityValue.join();
      this.fromCityName = fromCityName;
    },
    computed: {
      totalMoney() {
        let personMoney = 0;
        let specilMoney = 0;
        let visaMoney = 0;
        let totalMoney = 0;
        let personLen = this.personDates.length;
        let planMoney = this.plan_info[0].sadultPrice || 8400;
        let exchangeIDs = this.order.exchangeIDs;
        let ticketLen = '';
        if (exchangeIDs.indexOf('[') > -1) {
          exchangeIDs = exchangeIDs && JSON.parse(exchangeIDs).join();
        }
        if (exchangeIDs != '') {
          ticketLen = exchangeIDs.split(',').length;
        } else {
          ticketLen = 0;
        }
        // console.log(this.order.exchangeIDs);
        if (this.specStatus && this.order.specilPerson != '' && this.order.specilPerson != undefined && this.order.specilPerson !=
          null) {
          specilMoney = 1680;
        } else {
          this.order.specilPerson = '';
        }
        // if (ticketLen > 0) {
        //   ticketLen = JSON.parse(ticketLen).length;
        // }
        console.log('tatalMoney:', ticketLen + 'personLen:', personLen);
        personMoney = (planMoney * personLen) - (planMoney * ticketLen);
        visaMoney = this.fnVisaPrice();
        totalMoney = personMoney + specilMoney + visaMoney;
        totalMoney = NumFmt(totalMoney, 2);
        this.$store.dispatch('apply/totalMoney', totalMoney);
        return totalMoney;
      },
      order() {
        return this.$store.getters['apply/order'];
      },
      code_info() {
        return this.$store.getters["mine/code_info"]
      },
      personDates() {
        return this.$store.getters['apply/personDates'];
      },
      cityValue() {
        return this.$store.getters['apply/cityValue']
      },
      plan_info() {
        let plan_info = this.$store.getters['apply/plan_info'];
        if (!plan_info[0]) {
          plan_info[0] = {};
          plan_info[0].sadultPrice = 8400;
        }
        return plan_info;
      },
      mine() {
        return this.$store.getters["mine/mine"];
      },
      money() { //获得存储的金额
        return this.$store.getters["apply/totalMoney"];
      },
      specStatus() {
        return this.$store.getters["apply/specialStatus"];
      },
      // checked(){
      //   return this.$store.getters["apply/checked"];
      // }
    },
    methods: {
      fnViewLine() {
        this.$router.push({
          name: 'sign-true',
          query: {
            status: true
          }
        });
      },
      toVisaTip() {
        this.$router.push('visa-tip');
      },
      checkBtn() {
        // this.$store.dispatch('apply/changeChecked',);
        this.checked = !this.checked;
      },
      fnToastMsg(msg) {
        this.toastShow = true;
        this.toastMsg = msg;
      },
      visaBoxChange(index, wayIndex) {
        this.updateDom('visa', index, wayIndex);
        document.getElementById('label' + index + 1).className = "weui-icon-checked";
        document.getElementById('label' + index + 0).className = "weui-icon-checked";
        this.personDates[index].visaStatus = false;
        this.personDates[index].visaVal = this.personDates[index].visaStatusList[wayIndex];
        this.personDates[index].visaWayVal = '';
        console.log('change:', this.personDates[index].visaStatusList[wayIndex]);
      },
      visaWayChange(index, wayIndex) {
        this.updateDom('label', index, wayIndex);
        this.personDates[index].visaWayStatus = false;
        //已有签证 选择evus数组  没有签证  选择办理签证
        if (this.personDates[index].visaVal == '已有签证') {
          this.personDates[index].visaWayVal = this.personDates[index].visaWayList[wayIndex];
        } else {
          this.personDates[index].visaWayVal = this.personDates[index].visaWayList1[wayIndex];
        }
        // this.$refs['label'+index+wayIndex].checked=true;
        console.log('change', 'value:' + index, 'label:' + wayIndex);
        console.log('change:', this.personDates[index].visaWayList[wayIndex]);
        // console.log(this.$refs['label'+index+wayIndex]);
      },
      updateDom(str, index, wayIndex) {
        if (wayIndex == 0) {
          document.getElementById(str + index + 1).className = "weui-icon-checked";
          document.getElementById(str + index + wayIndex).className = "weui-icon-checked checked";
        } else {
          document.getElementById(str + index + 0).className = "weui-icon-checked";
          document.getElementById(str + index + wayIndex).className = "weui-icon-checked checked";
        }
      },
      placeOrder() {
        this.checked = !this.checked;
        let data = {}; //请求参数
        let dataStatus = {
          status: true,
          msg: ''
        }; //用户输入数据状态是否正确
        let personDates = []; //游客信息
        // let personDates = JSON.stringify(this.personDates);
        this.order.personDates = personDates;
        data = this.order;
        if (data.fromCityId == undefined || data.fromCityId == '') {
          dataStatus.status = false;
          dataStatus.msg = '请选择出发地'
        }
        // if (data.exchangeIDs && !data.exchangeIDs.length) {
        //   dataStatus.status = false;
        //   dataStatus.msg = '请选择兑奖码'
        // }
        this.personDates.forEach(x => {
          let y = {};
          y.name = x.name;
          y.phone = x.phone;
          y.sex = x.sex;
          y.identification = x.identification;
          if (!x.visaVal) {
            // this.fnToastMsg('请填写签证情况');
            dataStatus.status = false;
            dataStatus.msg = '请填写签证情况'
          }
          if (!x.visaWayVal) {
            // this.fnToastMsg('请填写签证办理');
            dataStatus.status = false;
            dataStatus.msg = '请填写签证办理'
          }
          //0-有签证有EVUS 1-有签证没有EVUS 3-没有签证办理1500的 4-没有签证办理2999的
          if (x.visaVal == this.visaStatus[0] && x.visaWayVal == this.visaWayList[0]) {
            y.visa_status = 0
          }
          if (x.visaVal == this.visaStatus[0] && x.visaWayVal == this.visaWayList[1]) {
            y.visa_status = 1;
          }
          if (x.visaVal == this.visaStatus[1] && x.visaWayVal == this.visaWayList1[0]) {
            y.visa_status = 2;
          }
          if (x.visaVal == this.visaStatus[1] && x.visaWayVal == this.visaWayList1[1]) {
            y.visa_status = 3;
          }
          personDates.push(y);
        });
        if (!dataStatus.status) {
          this.fnToastMsg(dataStatus.msg);
          return;
        }
        this.$vux.loading.show({
          text: '正在下单，请勿重新操作！'
        })
        data.fromCityName = this.cityValue.join();
        data.ordTypeName = this.plan_info[0].ordTypeName || '公共';
        data.planID = this.plan_info[0].planID;
        data.orderTypeID = this.plan_info[0].plan_type_id || 174;
        data.name = this.mine.name;
        data.phone = this.mine.phone;
        data.id = this.mine.id;
        data.saleId = this.plan_info[0].saleId;
        data.saleName = this.plan_info[0].saleName;
        if (data.exchangeIDs.indexOf('[') > -1) {
          data.exchangeIDs = data.exchangeIDs && JSON.parse(data.exchangeIDs).join();
        }
        personDates = JSON.stringify(personDates);
        data.personDates = personDates;
        data.bill = this.totalMoney || this.money;
        this.$store.dispatch('apply/placeOrder', data).then(x => {
          if (x.success) {
            this.fnToastMsg(x.msg);
            this.$store.dispatch('apply/preOrder', x);
            let qrcodeData = {};
            qrcodeData.money = x.order.billBak;
            qrcodeData.type = 1;
            qrcodeData.orderId = x.ordId;
            qrcodeData.code_id = data.exchangeIDs;
            this.$store.dispatch('mine/changeQrcodeData', qrcodeData);
            if (data.bill == 0 || x.money == 0) {
              this.$store.dispatch("apply/confirmOrder", {
                ordId: x.ordId,
                exchange_code: data.exchangeIDs
              }).then(y => {
                this.$vux.loading.hide()
                if (y.success) {
                  this.$router.push({
                    name: 'pay-complete'
                  }); //跳转到付款成功页
                } else {
                  this.fnToastMsg('订单确认失败');
                }
              });
            } else {
              this.$vux.loading.hide()
              this.$router.push({
                name: 'pay-confirm'
              }); //跳转到付款确认页
            }
          } else {
            this.$vux.loading.hide()
            let errorCode = {
              "10001": "无效数据",
              "10002": "数据格式错误",
              "10003": "授权校验未通过",
              "10004": "参数错误",
              "10005": "文件类型不符",
              "10006": "上传文件失败",
              "11001": "余位不足",
              "11002": "无效的公司信息",
              "11003": "无效的开放方团期信息",
              "11004": "下单失败",
              "11005": "无效的订单人数",
              "11006": "客户欠款总额超过授信额度，订单状态将自动变更为预留单",
              "11007": "销售欠款总额超过授信额度，订单状态将自动变更为预留单",
              "11008": "订单信息异常",
              "11010": "订单类型不存在，已取消下单请求",
              "11011": "仅允许状态为正常的团才可以下单",
              "11012": "团期信息不存在",
              "11013": "对方版本太低，暂不支持下单!",
              "11014": "出发城市异常",
              "11015": "占位信息异常",
              "11016": "单位名称必须从系统中选择，否则不能添加!",
              "11017": "erpId信息无效",
              "11018": "当前下单人数过多，占位失败，请刷新重试!",
              "11019": "已存在的手机号码，请重试!",
              "11020": "团状态非正常",
              "11021": "非预留订单不允许修改人数",
              "11022": "对不起，共享计划的订单不能更改人数，请重新预订",
            }
            this.fnToastMsg(x.msg || errorCode[x.code]);
          }
        }).catch(x=>{
          this.$vux.loading.hide();
          this.fnToastMsg('系统异常！');
        })
      },
      fnVisaPrice() {
        let price = 0;
        this.personDates.forEach(x => {
          //0-有签证有EVUS 1-有签证没有EVUS 3-没有签证办理1500的 4-没有签证办理2999的
          let y = 0;
          if (x.visaVal == this.visaStatus[0] && x.visaWayVal == this.visaWayList[0]) {
            y = 0;
          }
          if (x.visaVal == this.visaStatus[0] && x.visaWayVal == this.visaWayList[1]) {
            y = 100;
          }
          if (x.visaVal == this.visaStatus[1] && x.visaWayVal == this.visaWayList1[0]) {
            y = 1500;
          }
          if (x.visaVal == this.visaStatus[1] && x.visaWayVal == this.visaWayList1[1]) {
            y = 2999;
          }
          // priceArr.push(y);
          price = y + price;
        });
        return price;

      }
    },
    props: {}
  }

</script>
<style>
    .applys .vux-cell-primary {
    width: 32%;
    flex: initial;
  }
  .applys .weui-cell__ft {
    width: 68%;
  }
  .my-panel .weui-media-box__title {
    font-size: 15px;
  }

  .my-panel .weui-media-box__desc {
    font-size: 12px;
  }

  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }

  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }

  .my-switch .weui-cell_switch .weui-cell__ft {
    margin-top: -35px;
  }

  .weui-icon-checked.checked:before {
    display: block;
    content: '\EA08';
    color: #09BB07;
    font-size: 16px;
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

</style>
