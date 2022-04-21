const state = {
  cursor_available: true, // 控制圓圈的顏色 true 是綠色 false 是紅色
  cursor_color_green: false,
  cursor_color_red: false,
  cursor_rate: 1,
  cursor_state: null, // 控制圈圈內部的顏色
  is_transparent: true,
  cursor_status: 'null'
}
const mutations = {
  onOpen (state) {
    state.isShow = true
    console.log('cursorState websocket connected!!')
  },
  setWsRes (state, msg) {
    // 控制圈圈的顏色
    // console.log('state', msg)
    state.cursor_available = msg.cursor_available
    switch (state.cursor_available.trim()) {
      case 'true':
        state.cursor_available = true
        break
      case 'false':
        state.cursor_available = false
        break
      default: return Boolean(state.cursor_available)
    }
    if (state.cursor_available) {
      state.cursor_color_green = true
      state.cursor_color_red = false
    } else {
      state.cursor_color_green = false
      state.cursor_color_red = true
    }

    // 控制圈圈內部的顏色
    state.cursor_state = msg.cursor_state
    switch (state.cursor_state) {
      case 'null' :
        state.cursor_status = msg.cursor_state
        state.is_transparent = true
        // console.log('null', state.cursor_status)
        break
      case 'drag' :
        state.cursor_status = msg.cursor_state
        state.is_transparent = true
        // console.log('drag', state.cursor_status)
        break
      case 'scroll' :
        state.cursor_status = msg.cursor_state
        state.is_transparent = true
        // console.log('scroll', state.cursor_status)
        break
      case 'click' :
        state.cursor_status = msg.cursor_state
        state.is_transparent = true
        // console.log('click', state.cursor_status)
        break
    }

    // 控制圈圈大小
    state.cursor_rate = msg.cursor_rate
    console.log('state.cursor_rate', state.cursor_rate)
  }

}
const actions = {
  onOpen ({ commit }) {
    commit('onOpen')
  },
  handWsRes ({ commit }, msg) {
    commit('setWsRes', msg)
  }
}
const getters = {
  cursor_color_green (state) {
    return state.cursor_color_green
  },
  cursor_color_red (state) {
    return state.cursor_color_red
  },
  is_transparent (state) {
    return state.is_transparent
  },
  cursor_status (state) {
    return state.cursor_status
  },
  cursor_rate (state) {
    return state.cursor_rate
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
