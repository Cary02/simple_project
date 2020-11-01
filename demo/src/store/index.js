import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name:'pengLiang',
    age:24
  },
  mutations: {
    handelAge (state) {
      state.age = 42;
    }
  },
  actions: {
  },
  modules: {
  }
})
