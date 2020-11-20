import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingObj: null,
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || null
  },
  mutations: {
    setLoadingObj(state, data) {
      state.loadingObj = data;
    },
    setUserInfo(state, data) {
      state.userInfo = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
