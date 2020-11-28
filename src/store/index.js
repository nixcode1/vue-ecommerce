import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    num: 0
  },
  mutations: {
    increment (state, payload) {
      state.count += payload
      state.num++
    }
  },
  actions: {
  },
  modules: {
  }
})
