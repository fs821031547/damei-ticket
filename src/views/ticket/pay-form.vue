<template>
  <my-pad-box>
    <div style="padding:0 15px">
      <h3 class="my-title">{{ title }}</h3>
      <div class="ticket-form">
        <p class="ticket-form-head">获得了仅需
          <span class="red" v-if="queryStatus==0">RMB{{code_info.money || '0'}}</span>
          <span class="red" v-else>RMB{{ticketSelect.money || '0'}}</span> 即可参加{{ code_info.title || '美国阳光西岸8日精品游' }}的宝贵资格1个。
        </p>
        <div class="ticket-form-body my-cell" v-if="status">
          <x-input title="姓名" textAlign="right" v-model="userInfo.name" placeholder="请输入联系人姓名"></x-input>
          <x-input title="手机" textAlign="right" v-model="userInfo.phone" placeholder="请输入联系人手机号" keyboard="number" is-type="china-mobile"></x-input>
          <x-input title="美容院"  textAlign="right" v-model="userInfo.deptName" placeholder="请输入美容院名称"></x-input>
          <cell title="所在省市" :class="userInfo.addr ? 'ticket' : ''" is-link :value="userInfo.addr || '请选择美容院所在省市'" @click.native="openAddress"></cell>
        </div>
        <div class="ticket-form-body my-cell" v-else>
          <cell title="姓名" :value="mine.name"></cell>
          <cell title="手机号码" :value="mine.phone"></cell>
          <cell title="美容院" :value="mine.deptName"></cell>
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
      <x-button type="primary" @click.native="fnPay">立即付款</x-button>
      <!--第一次兑奖的时候不显示放弃资格按钮，用户第一未付款退出后再进来的话 status==1的话 用户可以放弃资格-->
      <!--<x-button v-if="$route.query.status==1" @click.native="fnGiveup">放弃资格</x-button>-->
      <my-pad height="15"></my-pad>
      <div class="tip" @click="$router.push({name:'sign-false',query:{show:0}})">
        查看线路
      </div>
      <popup v-model="addressShow" height="400px" style="z-index:100000;background:#fff" width="100%">
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
      <toast v-model="toastShow" type="text" is-show-mask :text="toastMsg" position="middle"></toast>
      <my-footer></my-footer>
    </div>

  </my-pad-box>
</template>

<script>
  import Vue from 'vue'
  import { Clocker } from 'vux'
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

      }
    },
    components: {
      Clocker,
    },
    computed: {
      mine() {
        return this.$store.getters["mine/mine"];
      },
      ticketSelect() {
        return this.$store.getters["mine/ticketSelect"];  //正在兑奖的兑奖码
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
      code_info() {
        return this.$store.getters["mine/code_info"];
      }
    },
    created() {
      if (!this.mine.id) {
        this.$store.dispatch("mine/mine_request")
      }
      this.dateTime();
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
          'exchange_status',
          {
            status: 4,
            id: id,
          },
          { emulateJSON: true }
        ).then(res => {
          let body = res.body;
          if (!body) return;
          if (body.success) {
            this.fnToastMsg('操作成功');
            //放弃资格后需重新请求个人信息
            this.$store.dispatch('mine/mine_request');
            this.$router.push({ name: 'ticket', query: { status: true } });
          } else {
            this.fnToastMsg(body.msg || '');
          }
        })
      },
      fnPay() {
        if (!this.status) {
          this.$router.push({ name: 'pay-way', query: { names: 'ticket' }, params: { refresh: true } })
          return;
        }
        let userId = this.mine.id;
        let name = this.userInfo.name;
        let phone = this.userInfo.phone;
        let money = this.ticketSelect.money;
        let addr = this.userInfo.addr;
        let deptName = this.userInfo.deptName;
        if (!name) {
          this.fnToastMsg('请填写姓名');
          return;
        }
        if (!phone) {
          this.fnToastMsg('请填写手机号码');
          return;
        }

        if (!deptName) {
          this.fnToastMsg('请填写美容院名称');
          return;
        }
        if (!addr) {
          this.fnToastMsg('请选择所在省市');
          return;
        }
        if (phone.length != 11) {
          this.fnToastMsg('请填写正确的手机号码');
          return;
        }

        Vue.http.post(
          'complete-person-info',
          {
            name: name,
            phone: phone,
            id: userId,
            money: money,
            addr: addr,
            deptName: deptName,
          },
          { emulateJSON: true }
        ).then(res => {
          let body = res.body;
          if (!body) return;
          if (body.success) {
            this.$store.dispatch('mine/mine_request');
            if (body.fin_ids) {
              this.$store.dispatch('mine/fin_ids', body.fin_ids);
            }
            this.$router.push({ name: 'pay-way', query: { 'id': 'ticket' }, params: { refresh: true } })
          } else {
            this.fnToastMsg(body.msg || '');
          }
        })
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
      selProvince(item) {
        this.provinceSelect = item.cnName;
        this.userInfo.province = item.cnName;
        this.pickerShow = true;
        Vue.http.post(
          'city',
          {
            id: item.ID
          },
          { emulateJSON: true }).then(res => {
            if (!res.body) return;
            let data = res.body.rows;
            this.city = data;
          })
      },
      fnProvinceSelect(item) {
        this.citySelect = '';
        this.pickerShow = !this.pickerShow;
      },
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
</style>