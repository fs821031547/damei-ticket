import Vue from 'vue'

const order = {
  planID: '',    //团期ID
  pub_fromcity_id: '',  //出发城市
  fromCityId: '',       //起止城市
  policyId: '',          //联运政策
  baseTransportCityId: '', //联运城市ID
  name: '',        //个人档案姓名
  phone: '',        //个人档案电话
  exchangeIDs: '',     //化妆品公司联系人ID
  specilPerson: '',    //单独住人的名字
  personDates: '',

  // personDates:[       //报名游客数据包
  //   {
  //     id:1,
  //     name:'',          //名称
  //     phone:'',         //手机号码
  //     personCard:'',   //身份证
  //     visa:false,    //是否有签证
  //     visaStatus:'',    //签证办理情况
  //   }
  // ],
}
// const personDates=[];

const state = {
  mine: {},
  order: Object.assign({}, order),
  personDates: [{
    id: 1,
    name: '',
    phone: '',
    identification: '',
    visa: false,
    EVUS: '',
    visaStatusList: ['已有签证', '没有签证'],
    visaWayList: ['已办EVUS', '办理EVUS（RMB100）'],
    visaWayList1: ['办理签证（RMB1500）', '签证保障套餐（RMB2999）'],
    visaStatus: false,
    visaWayStatus: false,
    visaVal: '',
    visaWayVal: '',
    sex:'男',
  }],
  plan_info: [],    //团期信息
  plan_city: [],   //城市信息
  cityValue: [],    //所选城
  cityValues: [],   //城市
  ticketArrs: [],  //所选中兑奖码
  totalMoney: 0, //总金额
  preOrder: {},  //预留单成功数据
  visa: [],
  payInfo:{},
  orderSelect:{},  //所选订单
  visaSelect:{},
  checked:false,
  specialStatus:false,
  interview:[],
}

const getters = {
  mine: state => state.mine,
  order: state => state.order,
  personDates: state => state.personDates,
  plan_info: state => state.plan_info,
  plan_city: state => state.plan_city,
  cityValue: state => state.cityValue,
  cityValues: state => state.cityValues,
  ticketArrs: state => state.ticketArrs,
  totalMoney: state => state.totalMoney,
  preOrder: state => state.preOrder,
  visa: state => state.visa,
  interview: state => state.interview,
  payInfo: state => state.payInfo,
  orderSelect: state => state.orderSelect,
  visaSelect: state => state.visaSelect,
  checked: state => state.checked,
  specialStatus: state => state.specialStatus,
}

const actions = {
  code_info({ state, commit, dispatch }, data) {
    commit("code_info", data);
  },
  totalMoney({ state, commit, dispatch }, data) {
    commit("totalMoney", data);
  },
  request_wage({ state, commit, dispatch }) {
    Vue.http.post(
      "profile/me_wage",
      {},
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      let mine = res.body.rows;
      state.wage = mine;
    });
  },
  request_plan({ state, commit, dispatch }, lineID) {
    return Vue.http.post(
      "line-plan",
      {
        lineID: lineID || '166',
      },
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      let data = res.body.rows;
      commit('plan_info', data);
      return data;
    });
  },
  request_city({ state, commit, dispatch }, planID) {
    return Vue.http.post(
      "line-plan-city",
      {
        planID: planID,
      },
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      let data = res.body.rows;
      commit('plan_plan_city', data);
      return data;
    });
  },
  cityValue({ commit }, cityValue) {
    commit('cityValue', cityValue)
  },
  ticketArrs({ commit }, ticketArrs) {
    commit('ticketArrs', ticketArrs)
  },
  placeOrder({ state, commit, dispatch }, data) {
    return Vue.http.post(
      "/sys/api/dm904/dm-activity/pre-order",
      data,
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      let data = res.body;

      return res.body;
    });
  },
  confirmOrder({ state, commit, dispatch }, data) {
    return Vue.http.post(
      "confirm-order",
      data,
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      let data = res.body.rows;
      return res.body;
    });
  },
  visaPogress({ state, commit, dispatch }, data) {
    return Vue.http.post(
      "visa-progress",
      {
        id: data.id,
      },
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      let data = res.body;
      commit('changeVisa', data);
      return res.body;
    });
  },
  getNoticeData({ state, commit, dispatch }, data) {
    return Vue.http.post(
      "getNoticeData",
      {
        ordID: data.ordID,
      },
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      let data = res.body;
      return res.body;
    });
  },
  generatePdf({ commit }, data) {
    return Vue.http.post(
      "generate-pdf-set",
      data,
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      let data = res.body;
      //commit("confirmConfig", { data });
      return res.body;
    })
  },
  interview({ state,commit }, data) {
    return Vue.http.post(
      "interview",
      data,
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      let data = res.body;
      //commit("confirmConfig", { data });
      state.interview=data;
      return res.body;
    })
  },
  interviewPerson({ commit }, data) {
    return Vue.http.post(
      "interview-person",
      data,
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      let data = res.body;
      //commit("confirmConfig", { data });
      return res.body;
    })
  },
  preOrder({ state, commit, dispatch }, data) {
    state.preOrder = data;
  },
  payInfo({ state, commit, dispatch }, data) {
    state.payInfo = data;
  },
  orderSelect({state , commit , dispatch},data){
    state.orderSelect=data;
  },
  visaSelect({state , commit , dispatch},data){
    state.visaSelect=data;
  },
  changeChecked({state , commit , dispatch},data){
    state.checked=data;
  },
  specialStatus({state , commit , dispatch},data){
    state.specialStatus=data;
  },

}

const mutations = {
  change_mine(state, { mine }) {
    state.mine = mine;
  },
  plan_info(state, plan_info) {
    state.plan_info = plan_info;
  },
  plan_plan_city(state, plan_city) {
    state.plan_city = plan_city;
  },
  cityValue(state, cityValue) {
    state.cityValue = cityValue;
  },
  ticketArrs(state, ticketArrs) {
    state.ticketArrs = ticketArrs;
  },
  totalMoney(state, totalMoney) {
    state.totalMoney = totalMoney;
  },
  changeVisa(state, visa) {
    state.visa = visa
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
