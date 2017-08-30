import Vuex from 'vuex'
import Vue from 'vue'
import mine from './mine'
import apply from './apply'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mine,
    apply,
  },
})