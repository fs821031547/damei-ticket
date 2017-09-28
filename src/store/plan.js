import Vue from 'vue'



const state = {
  plan:[],
  orderSelect:{},
  planSelect:[],
}

const getters = {
  plan: state => state.plan,
  orderSelect: state => state.orderSelect,
  planSelect: state => state.planSelect,
}

const actions = {
  request_plan({ state, commit, dispatch },date) {
    return Vue.http.post(
      "get-other-plan",
      {
        date,
      },
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      let data = res.body.rows;
      state.plan = data;
      return data;
    });
  },
  order_change_plan({ state, commit, dispatch },data) {
    return Vue.http.post(
      "order-change-plan",
      data,
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      return res.body;
    });
  },
  change_order({state,commit},order){
    state.orderSelect=order;
  },
  change_plan_select({state,commit},plan){
    state.planSelect=plan;
  },
}

const mutations = {
  change_mine(state, { mine }) {
    state.mine = mine;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
