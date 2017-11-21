import Vue from 'vue'

const state = {
  mine: {},
  request_state: false,
  wage: [],
  test: 'hello fs heihei haha',
  ticketSelect: {},
  code_info: {},
  fin_ids: [],
  qrcodeInfo: {},
  orderSelect: {},
  qrcodeData: {  //二维码参数
    money: null,
    type: null,
  },
  code_id: '',
  userInfo: {  //个人信息
    name: '',
    phone: '',
    addr: '',
    deptName: '',
    province: '',
    city: '',
    remark:'',
  },
  lineID: '',
  clickStatus: false,  //按钮点击状态
  address: [],
}

const getters = {
  mine: state => state.mine,
  wage: state => state.wage,
  test: state => state.test,
  ticketSelect: state => state.ticketSelect,
  code_info: state => state.code_info,
  fin_ids: state => state.fin_ids,
  qrcodeInfo: state => state.qrcodeInfo,
  orderSelect: state => state.orderSelect,
  qrcodeData: state => state.qrcodeData,
  code_id: state => state.code_id,
  userInfo: state => state.userInfo,
  lineID: state => state.lineID,
  clickStatus: state => state.clickStatus,
  address: state => state.address,

}

const actions = {
  request_enter({ state, commit, dispatch }) {
    Vue.http.post(
      "/sys//main?xwl=3448FRF0MLLM",
      {
        openId:'openId'
      },
       { emulateJSON: true }
    ).then(res => {
    });
  },
  mine_request({ state, commit, dispatch }) {
    let data = {};
    // if (process.env.NODE_ENV !== 'production') {
    //   data.key = 'EC7121327EEC21702D0C71E0E19F0829381F22E89B5B763F1D5E26F785D93B23';
    // }
    return Vue.http.post(
      "get-person-info",
      data,
      { emulateJSON: true }
    ).then(res => {
      let body = res.body;
      if (!body) return;
      let mine = body;
      let code = mine.exchange_code;
      let ticketSelect;
      let qrcodeData = {};  //二维码参数
      let orderInfo = mine.order_data;
      for (var l = 0; l < orderInfo.length; l++) {
        if (typeof orderInfo[l].order == 'string') {
          mine.order_data[l].order = JSON.parse(orderInfo[l].order);
        } else {
          mine.order_data[l].order = {};
        }
      }
      for (var i = 0; i < code.length; i++) {
        if (code[i].status == 1) {
          ticketSelect = code[i];
          qrcodeData.money = ticketSelect.money;
          qrcodeData.type = 0;
          qrcodeData.code_id = ticketSelect.code_id;
          commit("ticketSelect", { ticketSelect });
          dispatch('changeQrcodeData', qrcodeData);  //二维码参数
          dispatch('fin_ids', ticketSelect.fin_id);  //预留单id
          dispatch('changeCodeId', ticketSelect.code_id);   //激活码id
          break;
        }
      }

      //[code_id:1,ordId:1,status:3,code_id:2,ordId:1,status:3,code_id:1,ordId:3,status:3]
      let ordIds = [];
      let codes = [];
      code.forEach(x => {
        if (x.status == 3) {
          codes.push(x);
        }
      });
      codes.forEach(x => {
        // ordIds=
        if (ordIds.length == 0) {

          ordIds.push({ ordId: x.order_id, code_id: '' });
        } else {
          let obj = { code_id: '' };
          obj.ordId = x.ordId;
          let noId = ordIds.find(y => {
            return y.ordId == x.order_id;
          })
          if (noId == undefined) {
            obj.ordId = x.order_id;
            ordIds.push(obj);
          }
        }
      })
      console.log('1111111111');
      console.log(ordIds);
      console.log('1111111111');
      code.forEach(x => {
        for (var j = 0; j < ordIds.length; j++) {
          if (ordIds[j].ordId == x.order_id) {
            if (!ordIds[j].code_id) {
              ordIds[j].code_id = x.code_id;
            } else {
              ordIds[j].code_id = ',' + x.code_id;
            }
          }
        }
      })
      // mine.order_data.forEach(x=>{
      //   ordIds.forEach(y=>{

      //   })
      // })
      // console.log();
      for (var k = 0; k < mine.order_data.length; k++) {
        ordIds.forEach(y => {
          if (y.ordId == mine.order_data[k].ordId) {
            mine.order_data[k].code_id = y.code_id;

          }
        })
      }
      console.log('order_data:', mine.order_data);
      // ordIds.forEach(x=>{

      // })
      commit("change_mine", { mine });
      return ticketSelect || {};
    });
    // dispatch("sys/sys_request", null, { root: true }); //请求系统配置
    // dispatch("sys/permit_request", null, { root: true }); //请求权限配置
  },
  code_info({ state, commit, dispatch }, data) {
    commit("code_info", data);
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
  search_exchange_code({ dispatch, commit }, data) {
    return Vue.http.post(
      "search-exchange-code",
      data,
      { emulateJSON: true }
    ).then(res => {
      let body = res.body;
      if (!body) return;
      if (body.code_info) {
        let qrcodeData = {};
        qrcodeData.money = body.code_info.money;
        qrcodeData.type = 0;
        qrcodeData.code_id = body.code_info.code_id;
        dispatch('changeQrcodeData', qrcodeData);
      }
      if (body.code_info && body.code_info.code_id != undefined && body.code_info.code_id != null) {
        dispatch('changeCodeId', body.code_info.code_id);
      }
      return body;
    })
  },
  mine_login({ dispatch, commit }) {
    let openID = "15A3B0724C7866C8BE8E5CB60EB9F7B87E7C5768F440745501A997CCBE6A8B54";
    let loginUrl = "/yun/main?xwl=342SNBWGIPJN";
    return Vue.http.post(
      loginUrl,
      { openID },
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
    })
  },
  fin_ids({ state, commit, dispatch }, data) {
    if (typeof data == "string") {
      data = data.split(',');
    }
    commit("fin_ids", data);
  },
  exchange_code_qrcode({ state, commit }, data) {
    //乘法函数，用来得到精确的乘法结果
    //说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
    //调用：accMul(arg1,arg2)
    //返回值：arg1乘以arg2的精确结果
    function accMul(arg1, arg2) {
      var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
      try { m += s1.split(".")[1].length } catch (e) { }
      try { m += s2.split(".")[1].length } catch (e) { }
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    }

    //给Number类型增加一个mul方法，调用起来更加方便。
    Number.prototype.mul = function (arg) {
      return accMul(arg, this);
    }
    return Vue.http.post(
      'exchange_code_qrcode',
      {
        amount: data.money && (Number(data.money)).mul(100),
        type: data.type,
        orderId: data.orderId || '',
        exchange_code: data.code_id || '',
        id: data.id || '',
        userListId: data.userListId || '',
        backUrl:data.backUrl,
      },
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      state.qrcodeInfo = res.body;
      return res.body;
    })
  },
  select_pay_status({ state, commit }, data) {
    return Vue.http.post(
      'isPay',
      {
        key: data,
      },
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      state.qrcodeInfo = res.body;
      return res.body;
    })
  },
  orderSelect({ state, commit }, data) {
    state.orderSelect = data;
  },
  update_ticket_status({ state, commit }, data) {
    return Vue.http.post(
      'exchange_status',
      {
        status: data.status,
        id: data.id,
      },
      { emulateJSON: true }
    ).then(res => {
      let body = res.body;
      if (!body) return;
      return body;
    })
  },
  changeQrcodeData({ state, commit }, data) {
    commit('changeQrcodeData', data);
  },
  changeCodeId({ state, commit }, data) {
    state.code_id = data;
  },
  changelineID({ state, commit }, data) {
    state.lineID = data;
  },
  clickStatus({ state, commit }, data) {
    state.clickStatus = data;
  },
  address_request({ state, commit }, ) {
    return Vue.http.post(
      "province",
      {
      },
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      let address = res.body.rows;
      commit("change_address", { address });
      return address;
    });
  },
}

const mutations = {
  change_mine(state, { mine }) {
    state.mine = mine;
  },
  ticketSelect(state, { ticketSelect }) {
    state.ticketSelect = ticketSelect;
  },
  code_info(state, code_info) {
    state.code_info = code_info;
  },
  fin_ids(state, fin_ids) {
    state.fin_ids = fin_ids;
  },
  changeQrcodeData(state, data) {
    state.qrcodeData = data;
  },
  change_address(state, { address }) {
    state.address = address;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
