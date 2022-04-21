import { createStore } from 'vuex'
import storesData from './storesData'
import ws from './ws'
import cursorState from './cursorState'
export default createStore({
  state: {
    isShow: false
  },
  mutations: {
    showBtn (state, bool) {
      state.isShow = bool
    }
  },
  actions: {
    showBtn ({ commit }, bool) {
      commit('showBtn', bool)
    }
  },
  getters: {},
  modules: {
    storesData,
    ws,
    cursorState
  }
})
