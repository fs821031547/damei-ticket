<template>
  <!--<x-header title></x-header>-->
  <div style="padding-bottom:50px;overflow-x:hidden;">
    <my-header>在线报名</my-header>
    <div id="vux-apply-box" style="padding-top: 46px">
      <my-pad></my-pad>
      <div class="bg-white">
        <cell title="产品名称" class="apply applys" :value="code_info.title || '欢乐美国阳光西岸8日精品游'" @click.native="fnViewLine" is-link></cell>
        <!--<cell title="出发地" value="请选择出发地" is-link></cell>-->
        <popup-picker title="出发地" :data="cityList" v-model="cityValue" @on-show="onShow" @on-hide="onHide" @on-change="onChange"
          placeholder="请选择出发地"></popup-picker>
        <cell title="使用激活" @click.native="fnShowTicket()" :class="exchangeValue ? 'apply':''" :value="exchangeValue ||'请选择'" is-link></cell>
        <cell title="美国签证介绍" class="sign" @click.native="$router.push({name:'visa'})" value="查看详情" is-link></cell>
      </div>
      <panel :list="list" class="my-panel" style="background-color: #f2f2f2;margin-top:0"></panel>
      <group class="my-group" :title="'※游客'+(index+1)" v-for="item,index in personDates" :key="item.id">
        <x-input class="my-cell" title="姓名" v-model="item.name" textAlign="right" placeholder="请输入姓名"></x-input>
        <!--<cell is-link class="my-cell" title="性别" :value="item.sex" textAlign="right" placeholder="请输入性别"></cell>-->
        <popup-radio class="my-cell" title="性别" :options="sexArr" v-model="item.sex"></popup-radio>
        <x-input title="手机号" v-model="item.phone" keyboard="number" is-type="china-mobile" textAlign="right" placeholder="请输入手机号"></x-input>
        <x-input title="身份证号" v-model="item.identification" textAlign="right" placeholder="请输入身份证号"></x-input>
        <div class="my-delete-btn" @click="showPlugin(index)"></div>
        <div class="my-delete-border"></div>
      </group>
      <my-pad></my-pad>
      <div class="bg-white" v-if="personDates.length % 2 == 1">
        <x-switch class="my-switch" title="※是否需单独入住一间房<br>（需补房差支付1680.00）" v-model="specialStatus" inline-desc="（本次出行统一安排双人房，若是单独1人出行，且不愿意拼房，可选单独入住1人间）"></x-switch>
        <x-input title="单独入住人" v-show="specialStatus" v-model="order.specilPerson" textAlign="right" placeholder="请输入单独入住人姓名"></x-input>
      </div>
      <my-pad></my-pad>
      <div class="add-tour">
        <x-button type="default" @click.native="addTour">添加报名</x-button>
      </div>
      <my-pad></my-pad>
      <my-pad></my-pad>
      <my-pad></my-pad>
      <my-pad></my-pad>
      <my-bottom-box>
        <button class="weui-btn weui-btn_primary" @click="fnNext" style="border-radius: 0px;"> 下一步</button>
        <!-- <x-button type="primary" style="border-radius:0;" @click.native="fnNext">下一步</x-button> -->
      </my-bottom-box>
      <popup v-model="showTicket" height="100%" position="" style="z-index:100000009!important;background:#fff" width="100%">
        <div class="vux-header" @click="fnShowTicket">
          <div class="vux-header-left">
            <div class="left-arrow"></div>
          </div>
          <h1 class="vux-header-title">
            <span>选择激活</span>
          </h1>
        </div>
        <!--<radio :options="ticketOpt" :value="ticketValue"></radio>-->
        <checklist label-position="left" :options="ticketOpt" :max=20 v-model="ticketValue" @on-change="checkChange"></checklist>
        <divider v-if="!ticketOpt.length">我是有底线的</divider>
        <my-bottom-box style="padding:20px 10px">
          <x-button type="primary" @click.native="fnShowTicket">确认</x-button>
        </my-bottom-box>
      </popup>

      <toast class="sign" v-model="toastShow" type="text" is-show-mask :text="toastMsg" position="middle"></toast>
    </div>
  </div>

</template>
<script>
  import {
    PopupPicker,
    Picker,
    Checklist,
    PopupRadio,
    Confirm
  } from 'vux'
  export default {
    data() {
      return {
        title: '激活记录',
        list: [{
          title: '订单填写要求',
          desc: '※注：游客年龄需满足①18~70间②＜75岁，且同时报名人数最多不超过9人；激活码生效需满足，1张激活码只激活1人出游，多出名额，按正价报名。',
        }],
        showTicket: false,
        ticketOpt: [''],
        ticketValue: [],
        showPopup: 1,
        cityList: [
          ['']
        ],
        cityValue: [],
        exchangeValue: '请选择',
        toastShow: false,
        toastMsg: '',
        specialStatus: false,
        sexArr: ['男', '女'],
        islock: [], //存放禁用激活码
      }
    },
    components: {
      PopupPicker,
      Checklist,
      Picker,
      PopupRadio,
      Confirm,
    },
    watch: {
      specialStatus() {
        this.$store.dispatch('apply/specialStatus', this.specialStatus);
      }
    },
    computed: {
      cityValues() {
        return this.$store.getters['apply/cityValue'];
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
      plan_info() {
        return this.$store.getters['apply/plan_info'];
      },
      plan_city() {
        return this.$store.getters['apply/plan_city'];
      },
      mine() {
        return this.$store.getters["mine/mine"];
      },
      ticketSelect() {
        return this.$store.getters["mine/ticketSelect"];
      },
      ticketArrs() {
        return this.$store.getters["apply/ticketArrs"];
      },
      specStatus() {
        return this.$store.getters["apply/specialStatus"];
      }
    },
    created() {
      window.scroll(0, 0);
      this.specialStatus = this.specStatus;
      this.cityValue = this.cityValues; //城市列表
      // this.exchangeValue=this.ticketArrs;
      console.log('ticketvalue:' + this.exchangeValue);
      // this.setTicketOpt();
      this.fnInit();
      var signCount = 0;

      function aa() {
        var tag = document.getElementsByTagName('*');
        for (var i = 0; i < tag.length; i++) {
          //  if(tag[i].id)console.log(tag[i].id);
          if (tag[i].id && tag[i].id != 'app' && tag[i].id.indexOf('vux') < 0) {
            tag[i].style.display = 'none';
            signCount++;
            clearInterval(timeFn);
          }
        }
      }
      var timeFn = setInterval(aa, 200);
      setTimeout(aa, 1000);
      setTimeout(aa, 1500);
    },
    methods: {
      fnInit() {
        if (!this.mine.id || this.$route.params.refresh) {
          this.$store.dispatch("mine/mine_request").then(x => {
            // console.log(this.$route.name);
            this.requestPlan();
            this.setTicketOpt();
          });
        } else {
          this.requestPlan();
          this.setTicketOpt();
        }
      },
      fnShowTicket() {
        this.showTicket = !this.showTicket;
        let applyBox = document.getElementById('vux-apply-box');
        if (this.showTicket) {
          applyBox.style.zIndex = '10000002';
        } else {
          applyBox.style.zIndex = '10000000';
        }

      },
      fnViewLine() {
        // this.$router.push({name:'sign-true',query:{status:true}});
        this.$router.push({
          name: 'sign-true',
          query: {
            status: true
          }
        });

      },
      fnToastMsg(msg) {
        this.toastShow = true;
        this.toastMsg = msg;
      },
      requestPlan() { //获得团期计划信息 如果没有线路ID先得到线路ID
        // let lineID = this.code_info.lineID || this.ticketSelect.lineId;  //线路ID
        let lineID = this.mine.exchange_code[0] && this.mine.exchange_code[0].lineId;
        this.$store.dispatch('apply/request_plan', lineID).then(x => {
          this.$store.dispatch('apply/request_city', x[0].planID).then(y => {
            let arr = [],
              arr1 = [];
            y.forEach(z => {
              arr.push(z.fromCityName)
            });
            arr1[0] = arr;
            this.cityList = arr1;
          })
        });
      },
      setTicketOpt() {
        let ticketArr = [];
        let code_id = []; //激活码ID
        let codeSelect = []; //所选值
        this.mine.exchange_code.forEach(code => {
          if (code.status == 2) {
            ticketArr.push(code.exchang_code);
          }
        })
        ticketArr.forEach(ticket => {
          this.mine.exchange_code.forEach(code => {
            if (code.exchang_code == ticket) {
              code_id.push(code.code_id); //筛选得到所选激活码ID
            }
          })
        })
        this.ticketOpt = ticketArr; //激活码列表
        this.ticketValue = this.ticketArrs; //激活码所选值
      },
      delTour(i) { //删除游客
        // this.showPlugin();
        if (this.personDates.length == 1) {
          this.fnToastMsg('游客人数至少有1位');
          return;
        }
        this.personDates.splice(i, 1);
      },
      addTour() { //添加游客
        if (this.personDates.length == 9) {
          this.fnToastMsg('游客最多只能有9位');
          return;
        }
        this.personDates.push({
          name: '',
          phone: '',
          identification: '',
          visa: false,
          EVUS: '',
          visaStatusList: ['已有签证', '没有签证'],
          visaWayList: ['已办EVUS', '办理EVUS（100.00）'],
          visaWayList1: ['办理签证（1500.00）', '签证保障套餐（2999.00）'],
          visaStatus: false,
          visaWayStatus: false,
          visaVal: '',
          visaWayVal: '',
          sex: '男'
        });
      },
      fnChange(v) {
        console.log('val:', 111);

      },
      checkChange(val) { //选择激活码
        let codeArr = [];
        let codeSelect = [];
        // let v=val.split('');
        let str = '';
        val.forEach(x => {
          if (!str) {
            str += x;
          } else {
            str += ',' + x
          }

        })
        this.islock = []; //清空已禁用的激活码
        this.exchangeValue = str; //存放需要显示的激活码字符串
        this.$store.dispatch('apply/ticketArrs', val); //存放所选激活码数组
        val.forEach(ticket => {
          this.mine.exchange_code.forEach(code => {
            if (code.exchang_code == ticket) {
              if (code.islock == 1) {
                this.islock.push(code); //存放禁用激活码
                this.fnToastMsg(code.exchang_code + '激活码不可用');
              }
              codeSelect.push(code.code_id); //筛选得到所选激活码ID
            }
          })
        })
        this.order.exchangeIDs = JSON.stringify(codeSelect); //所选激活码ID
      },
      fnNext() {
        let data = {}; //请求参数
        let dataStatus = {
          status: true,
          msg: ''
        }; //用户输入数据状态是否正确
        let personDates = []; //游客信息
        let exchangeIDs = this.order.exchangeIDs && JSON.parse(this.order.exchangeIDs);
        let count = 0;
        // let personDates = JSON.stringify(this.personDates);
        data = this.order;

        if (data.exchangeIDs && exchangeIDs.length > this.personDates.length) {
          dataStatus.msg = '激活码数量不能大于游客人数'
        }

        if (this.order.specilPerson != '' && this.specialStatus) {
          let result = this.personDates.find(x => {
            return x.name == this.order.specilPerson;
          })
          if (!result) {
            dataStatus.msg = '单独入住人必须与所填游客姓名一致';
          }
        }

        this.personDates.forEach(x => {
          let y = {};
          let birth = '';
          let now = DateFmt(new Date(), 'yyyy');
          y.name = x.name;
          y.phone = x.phone;
          count++;
          y.identification = x.identification;
          if (y.identification.length == 15) {
            birth = y.identification.toString();
            birth = '19' + birth.slice(6, 8);
            if (now - birth >= 75) {
              dataStatus.msg = '游客年龄不能大于75岁'
            }
            if (count == 1 && (now - birth < 18 || now - birth > 70)) {
              dataStatus.msg = '第一位游客年龄不能小于18岁或不能大于70岁'
            }
          }
          if (y.identification.length == 18) {
            birth = y.identification.toString();
            birth = birth.slice(6, 10);
            if (now - birth >= 75) {
              dataStatus.msg = '游客年龄不能大于75岁'
            }
            if (count == 1 && (now - birth < 18 || now - birth > 70)) {
              dataStatus.msg = '第一位游客年龄不能小于18岁或不能大于70岁'
            }
          }
          if (y.identification.length != 18 && y.identification.length != 15) {
            dataStatus.msg = '身份证输入不正确'
          }
          if (!y.identification) {
            dataStatus.msg = '请填写身份证号码'
          }
          if (x.phone && x.phone.length != 11) {
            dataStatus.msg = '请填写正确的手机号码'
          }
          if (!y.phone) {
            dataStatus.msg = '请填写手机号码'
          }
          if (!y.name) {
            dataStatus.msg = '请填写用户姓名'
          }
          if (!y.name && !y.phone && !y.identification) {
            dataStatus.msg = '游客信息必须填写'
          }
          personDates.push(y);
        });
        if (data.fromCityId == undefined || data.fromCityId == '') {
          dataStatus.msg = '请选择出发地'
        }
        if (dataStatus.msg != '') {
          dataStatus.status = false;
        }
        if (!dataStatus.status) {
          this.fnToastMsg(dataStatus.msg);
          return;
        }
        if (this.islock.length > 0) {
          this.fnToastMsg('有选择的激活码不可用');
          return;
        }
        if (exchangeIDs.length == 0) {
          this.fnToastMsg('需选择激活码才能进行下一步');
          return;
        }
        this.$router.push({
          name: 'visa-select'
        });
      },
      onChange(val) { // 所选出发城市的变化
        this.$store.dispatch('apply/cityValue', val); //保存所选择的城市
        let fromCityId = this.plan_city.find(x => {
          return x.fromCityName == val.join();
        })
        //所选城市的ID写到预留单的参数中
        this.order.fromCityId = fromCityId.fromCityID;
        this.order.pub_fromcity_id = fromCityId.pub_fromcity_id;
        this.order.baseTransportCityId = fromCityId.transport_city_id;
        this.order.policyId = fromCityId.policy_id;
        console.log('val change', val)
      },
      onShow() {
        console.log('on show')
      },
      onHide(type) {
        console.log('on hide', type)
      },
      showPlugin(i) {
        let _this = this;
        this.$vux.confirm.show({
          title: '提示',
          content: '是否删除此游客信息？',
          onShow() {},
          onHide() {},
          onCancel() {},
          onConfirm() {
            _this.delTour(i);
          }
        })
      },

    },
    props: {},
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
    font-size: 16px;
  }

  .weui-cell.sign .vux-label {
    color: red;
  }

  .my-switch.weui-cell_switch .weui-cell__ft {
    margin-top: -37px;
  }

  .my-panel .weui-media-box__desc {
    font-size: 12px;
    display: initial;
    line-height: 16px;
  }

  .add-tour {
    padding: 20px 10px;
  }

  .my-switch .weui-label {
    margin-top: 10px;
    width: 100%!important;
  }

  .my-switch .vux-label-desc {
    /*margin-top:5px;*/
    font-size: 12px;
  }

  .weui-toast_text .weui-toast__content {
    padding-left: 10px;
    padding-right: 10px;
  }

  .my-group .weui-cells .weui-cell.my-cell {
    width: 84%;
  }

  .my-group .weui-cells .my-delete-btn {
    position: absolute;
    right: 15px;
    top: 32px;
    height: 28px;
    width: 28px;
    background: url('../../assets/delete.png');
    background-size: 100% 100%;
  }

  .my-group .weui-cells .my-delete-border {
    position: absolute;
    right: 15%;
    top: 15px;
    bottom: 106px;
    width: 1px;
    background: #d9d9d9;
    transform: scaleX(.5);
  }

  .apply .weui-cell__ft {
    color: #000;
  }

  .sign .weui-toast {
    z-index: 100002;
  }

  .vux-popup-dialog {
    z-index: 10000009!important;
  }

  .vux-popup-mask {
    /*z-index: 10000001!important;*/
  }

  .weui-dialog {
    z-index: 10000002!important;
  }

  .vux-popup-mask.vux-popup-show {
    z-index: 10000001!important;
  }

  .weui-mask {
    z-index: 10000001!important;
  }

</style>
