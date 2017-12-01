<template>
  <my-pad-box>
    <div style="padding:0 15px;">
      <h3 class="my-title">{{ title }}</h3>
      <div class="ticket-form">
        <p class="ticket-form-head" style="font-size:16px;text-align:center">
          <!--获得了仅需
          <span class="red" v-if="queryStatus==0">{{ NumFmt(code_info.money,0) || '0'}}</span>
          <span class="red" v-else>{{ticketSelect.money || '0'}}</span> 即可参加{{ code_info.title || '美国阳光西岸8日精品游' }}的宝贵资格1个。-->
          请完善以下信息，激活账户报名！
        </p>
        <div class="ticket-form-body my-cell" v-if="status">
          <x-input title="姓名" textAlign="right" v-model="userInfo.name" placeholder="请输入联系人姓名"></x-input>
          <x-input title="手机" textAlign="right" v-model="userInfo.phone" placeholder="请输入联系人手机号" keyboard="number" is-type="china-mobile"></x-input>
          <x-input title="美容院" textAlign="right" v-model="userInfo.deptName" placeholder="请输入美容院名称"></x-input>
          <x-input title="美容产品品牌" placeholder="请输入美容产品品牌" textAlign="right" v-model="userInfo.remark"></x-input>
          <cell title="所在省市" :class="userInfo.addr ? 'ticket' : ''" is-link :value="userInfo.addr || '请选择美容院所在省市'" @click.native="openAddress"></cell>
        </div>
        <div class="ticket-form-body my-cell" v-else>
          <cell title="姓名" :value="mine.name"></cell>
          <cell title="手机号码" :value="mine.phone"></cell>
          <cell title="美容院" :value="mine.deptName"></cell>
          <x-input title="美容产品品牌" placeholder="请输入美容产品品牌" textAlign="right" v-model="userInfo.remark"></x-input>
          <cell title="所在省市" :value="mine.addr"></cell>
        </div>
        <!--<div class="ticket-form-foot">※剩余有效付款时间：
          <clocker :time="time" format="%H 小时 %M 分 %S 秒" class="red" slot="value">
            <span class="day">%_H1</span>
            <span class="day">%_H2</span>时
            <span class="day">%_M1</span>
            <span class="day">%_M2</span>分
            <span class="day">%_S1</span>
            <span class="day">%_S2</span>秒
          </clocker>
        </div>-->
      </div>
      <x-button type="primary" @click.native="fnPay">下一步</x-button>
      <!--<x-button type="primary" v-if="qrcodeData.money == 0" @click.native="$router.push({name:'ticket-tip'})">下一步</x-button>-->
      <!--第一次激活的时候不显示放弃资格按钮，用户第一未付款退出后再进来的话 status==1的话 用户可以放弃资格-->
      <!--<x-button v-if="$route.query.status==1" @click.native="fnGiveup">放弃资格</x-button>-->
      <my-pad height="15"></my-pad>
      <div class="tip" @click="$router.push({name:'sign-false',query:{show:0}})">
        查看线路
      </div>
      <!-- <iframe :src="iframeHtml" style="display: none"></iframe> -->
      <div id="iframe"></div>
      <popup v-model="addressShow" height="400px" style="z-index:10000000;background:#fff" width="100%">
        <div class="vux-popup-picker-container">
          <div class="vux-popup-picker-header">
            <div class="vux-flexbox vux-flex-row">
              <div class="vux-flexbox-item vux-popup-picker-header-menu vux-popup-picker-cancel" style="line-height:36px;margin-left: 8px;text-align:center;color:#1AAD19">所在省市</div>
            </div>
          </div>
          <div class="address-content" style="height:360px;">
            <ul class="head-address-ul" id="headAddressUl">
              <li mytitle="0" @click="fnProvinceSelect" :class="pickerShow ? '' : 'head-address-li'">{{provinceSelect || '请选择'}}</li>
              <li mytitle="1" :class="pickerShow ? 'head-address-li' : ''">
                <span v-show="pickerShow">{{citySelect||'请选择'}}</span>
              </li>
              <li mytitle="2" class=""></li>
              <li mytitle="3"></li>
            </ul>
            <ul class="address-ul" v-show="!pickerShow">
              <li v-for="item in province" @click="selProvince(item)">{{item.cnName}}</li>
            </ul>
            <ul class="address-ul" v-show="pickerShow">
              <li v-for="item in city" @click="selCity(item)">{{item.cnName}}</li>
            </ul>
          </div>
        </div>
      </popup>
      <popup v-model="showTicketList" height="100%" position="" style="z-index:100000;background:#fff" width="100%">
        <div class="vux-header" @click="showTicketList=!showTicketList">
          <div class="vux-header-left">
            <div class="left-arrow"></div>
          </div>
          <h1 class="vux-header-title">
            <span>激活码激活须知及规范</span>
          </h1>
        </div>
        <div class="question-content">
          1. 激活码由创科国际提供，属于其出售美容产品组成部分，请尽早激活，以防遗失。
          <br> 2. 激活码属于该美容产品的组成部分，一旦激活，即视为使用，无法退还激活费用。
          <br> 3. 激活码的激活须同时缴纳一定的激活费用，激活后即可获得一个“美国阳光西岸8天游”的免费参团旅游资格。该旅游产品的行程内容、服务标准、参团规则由创科国际和广东中信国际旅行社有限公司（优胜旅行）所签订的旅游合同与协议进行规范。
          <br> 4. 赴美旅游资格有效期截止至2018年4月28日，请尽早报名使用，保证您的权益。
          <br> 5. 使用赴美旅游资格后，请尽早提供出游旅客合同约束的个人资料并选择出发日期，以便我司尽快安排出游事宜。
          <br> 6. 一旦选择出发日期，即视为认可且遵守创科国际与广东中信国际旅行社有限公司（优胜旅行）签署的旅游合同。
          <br> 7. 激活码及赴美旅游资格的规则、赴北美旅游的签证及其他全部事项均受创科国际与广东中信国际旅行社有限公司（优胜旅行）签署的旅游合同的拘束，属该合同不可分割的一部分。
          <br> 8. 本促销活动的最终解释权归创科国际和广东中信国际旅行社有限公司（优胜旅行）所有。
        </div>
        <my-bottom-box style="padding:20px 10px">
          <x-button type="primary" @click.native="fnNext">同意并确认付款</x-button>
        </my-bottom-box>
      </popup>
      <toast v-model="toastShow" type="text" is-show-mask :text="toastMsg" position="middle"></toast>
      <my-footer></my-footer>
    </div>

  </my-pad-box>
</template>

<script>
  import Vue from 'vue'
  import {
    Clocker,
    Loading
  } from 'vux'
  import mixin from '../mixin.js'
  export default {
    data() {
      return {
        title: '恭喜您',
        toastShow: false,
        toastMsg: '',
        time: DateFmt(new Date(), 'yyyy-MM-dd hh:mm:ss', 'd+2'),
        name: '',
        phone: '',
        addressShow: false,
        province: [],
        city: [],
        provinceSelect: '',
        citySelect: '',
        pickerShow: false,
        showTicketList: false, // 激活码须知
        formData: {},
      }
    },
    mixins: [mixin],
    components: {
      Clocker,
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
        // return {};
      },
      ticketSelect() {
        return this.$store.getters["mine/ticketSelect"]; //正在激活的激活码
      },
      userInfo() {
        return this.$store.getters["mine/userInfo"];
      },
      status() {
        if (!this.mine.name || this.mine.name == null) {
          return true
        }
        return false;
      },
      queryStatus() {
        return this.$route.query.status;
      },
      qrcodeData() {
        return this.$store.getters["mine/qrcodeData"]
      },
      code_info() {
        return this.$store.getters["mine/code_info"];
      }
    },
    created() {
      if (!this.mine.id) {
        this.$store.dispatch("mine/mine_request")
      }
      // this.dateTime();  //激活码过期倒计时
      this.$store.dispatch('mine/address_request').then(end => {
        this.province = end;
        if (this.userInfo.province && this.userInfo.city) {
          this.provinceCityDefault(this.userInfo.addr);
        }
      });
    },
    methods: {
      fnGiveup() {
        let id = this.ticketSelect.code_id;
        Vue.http.post(
          'exchange_status', {
            status: 4,
            id: id,
          }, {
            emulateJSON: true
          }
        ).then(res => {
          let body = res.body;
          if (!body) return;
          if (body.success) {
            this.fnToastMsg('操作成功');
            //放弃资格后需重新请求个人信息
            this.$store.dispatch('mine/mine_request');
            this.$router.push({
              name: 'ticket',
              query: {
                status: true
              }
            });
          } else {
            this.fnToastMsg(body.msg || '');
          }
        })
      },
      fnPay() {
        let data = {};
        if (!this.status) {
          data.name = this.mine.name;
          data.phone = this.mine.phone;
          data.addr = this.mine.addr;
          data.deptName = this.mine.deptName;
          data.remark = this.userInfo.remark;
          data.id = this.mine.id;
          data.code_id = this.code_info.code_id || this.ticketSelect.code_id || 0;
          if (!data.remark) {
            this.fnToastMsg('请输入美容产品品牌');
            return;
          }
          // this.showTicketList = true;
          this.formData = data;
          this.completeInfo(data);
          return;
        }

        data.id = this.mine.id;
        data.name = this.userInfo.name;
        data.phone = this.userInfo.phone;
        data.money = this.ticketSelect.money;
        data.addr = this.userInfo.addr;
        data.deptName = this.userInfo.deptName;
        data.remark = this.userInfo.remark;
        data.code_id = this.code_info.code_id || this.ticketSelect.code_id;

        if (!data.name) {
          this.fnToastMsg('请填写姓名');
          return;
        }
        if (!data.phone) {
          this.fnToastMsg('请填写手机号码');
          return;
        }

        if (!data.remark) {
          this.fnToastMsg('请输入美容产品品牌');
          return;
        }

        if (!data.deptName) {
          this.fnToastMsg('请填写美容院名称');
          return;
        }
        if (!data.addr) {
          this.fnToastMsg('请选择所在省市');
          return;
        }
        if (data.phone.length != 11) {
          this.fnToastMsg('请填写正确的手机号码');
          return;
        }
        this.formData = data;
        // this.showTicketList = true;
        this.completeInfo(data);
      },
      //完善信息
      completeInfo(data) {
        this.$vux.loading.show({
          text: '正在完善个人信息，请您耐心等待'
        });
        Vue.http.post(
          'complete-person-info', data, {
            emulateJSON: true
          }
        ).then(res => {
          let body = res.body;
          if (!body) return;
          this.$vux.loading.hide();
          if (body.success) {
            this.$store.dispatch('mine/mine_request');
            this.showTicketList = true;
            if (body.fin_ids) {
              this.$store.dispatch('mine/fin_ids', body.fin_ids);
            }
          } else {
            this.fnToastMsg(body.msg || '系统异常');
          }
        }).catch(x => {
          this.$vux.loading.hide();
          this.fnToastMsg('接口异常' || '');
        })
      },
      //确认单
      confirmOrder() {
        let exchange_code = this.code_info.code_id || this.ticketSelect.code_id || 0;
        Vue.http.post(
          'confirm-order-code', {
            exchange_code,
          }, {
            emulateJSON: true
          }
        ).then(res => {
          let body = res.body;
          if (body.success) {
            this.$router.push({
              name: 'pay-success'
            });
          } else {
            this.fnToastMsg(body.msg || '异常错误');
          }
        }).catch(x => {
          this.fnToastMsg('接口异常' || '');
        })
      },
      //跳转到下一页面
      fnNext() {
        // let data = this.formData;
        if (this.qrcodeData.money == 0) {   //激活码金额为0 不用支付，直接确认
              this.confirmOrder();
              return;
        }
        this.fnReqPay(1);   //请求支付  mixin.js
      },
      fnToastMsg(msg) {
        this.toastShow = true;
        this.toastMsg = msg;
      },
      dateTime() {
        let date;
        setTimeout(() => {
          let exist_time = DateFmt(this.ticketSelect.exist_time, 'yyyy/MM/dd hh:mm:ss');
          date = new Date(exist_time);
          if (date == 'Invalid Date' || date == null) {
            date = new Date();
          }
          date.add("d", 2);
          this.time = DateFmt(date, 'yyyy-MM-dd hh:mm:ss');
        }, 100)
      },
      openAddress() {
        this.addressShow = !this.addressShow;
      },
      //选择省份
      selProvince(item) {
        this.provinceSelect = item.cnName;
        this.userInfo.province = item.cnName;
        this.pickerShow = true;
        Vue.http.post(
          'city', {
            id: item.ID
          }, {
            emulateJSON: true
          }).then(res => {
          if (!res.body) return;
          let data = res.body.rows;
          this.city = data;
        })
      },
      fnProvinceSelect(item) {
        this.citySelect = '';
        this.pickerShow = !this.pickerShow;
      },
      //选择城市
      selCity(item) {
        this.addressShow = false;
        this.citySelect = item.cnName;
        this.userInfo.city = item.cnName;
        this.userInfo.addr = this.provinceSelect + ' ' + item.cnName;
        this.userInfo.ID = item.ID;

      },
      provinceCityDefault(data) {
        let arr = data.split(' ');
        if (arr[1]) {
          let province = this.province.find((x) => {
            return x.cnName == arr[0];
          });
          this.selProvince(province);
          this.citySelect = arr[1];
        }
      },
      onAddressChange(picker, values) {
        if (!values[0]) {
          return;
        }
        this.cpyCtCityID = values[0].ID;
        this.provinceCity = values[0].provinceCity;

      },
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      console.log(to.query.status);
      if (to.name == 'ticket' && !to.query.status) {
        next(false);
      } else {
        next()
      }

    }
  }

</script>

<style lang="less" scoped>
  .my-cell .weui-cell {
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .my-cell .weui-cells:before {
    z-index: -1;
  }

  .my-cell .weui-cell:before {
    z-index: -1;
  }

  .my-cell .weui-cells:after {
    z-index: -1
  }

  .provinceSelect {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    color: #1AAD19;
  }

  .head-address-ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    background-color: white;
    font-size: 15px;
    width: 100%;
    border-bottom: 1px solid #eaeaea;
  }

  .head-address-ul li {
    width: 25%;
    display: block;
    float: left;
    height: 40px;
    position: relative;
    line-height: 45px;
    text-align: center;
  }

  .head-address-li {
    color: #1AAD19;
  }

  .address-content {
    -webkit-transform: translate(0, 0) translateZ(0);
    height: 100%;
    -webkit-transition-property: transform;
    -webkit-transition-duration: 300ms;
    -webkit-transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
    overflow: hidden;
  }

  .address-ul {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
    height: 100%;
    overflow: auto;
    font-size: 15px;
    color: #232326;
  }

  .address-ul li {
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    position: relative;
    overflow: hidden;
  }

  .head-address-li:after {
    width: 60%;
    height: 1px;
    border-bottom: 2px solid #1AAD19;
    position: absolute;
    bottom: 1px;
    left: 50%;
    content: '';
    margin-left: -30%;
  }

  .address-ul li:after {
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    border-bottom: 1px solid #e3e5e9;
    left: 0;
    bottom: 0;
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
  }

  .ticket .weui-cell__ft {
    color: #000;
  }

  .question-content {
    color: #999;
    padding: 10px 10px 70px;
    font-size: 15px;
    background: #f4f4f4;
  }

</style>
<style>
  .vux-loading .weui-toast {
    z-index: 100000001;
  }

  .weui-mask_transparent {
    z-index: 100000001
  }

</style>
