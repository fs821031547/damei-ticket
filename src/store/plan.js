import Vue from 'vue'



const state = {
  plan:[],
}

const getters = {
  plan: state => state.plan,
}

const actions = {
  request_plan({ state, commit, dispatch }) {
    return Vue.http.post(
      "get-other-plan",
      {
        date:'2017-09-01'
      },
      { emulateJSON: true }
    ).then(res => {
      if (!res.body) return;
      let data = res.body.rows;
      state.plan = data;
      return data;
    });
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
