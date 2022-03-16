const state = {
  newSticker: '',
  video: {
    src: ''
  },
  image: ''
}
const mutations = {
  onOpen () {
    console.log('onOpen mutations')
  },
  setWsRes (state, payload) {
    // console.log('payload', payload)
    if (payload.id) {
      payload.content.forEach(item => {
        switch (item.type) {
          case 'newsticker' :
            state.newSticker = item.content
            break
          case 'image' :
            state.image = item.content
            break
          case 'video':
            item.content.replace('\n', '')
            state.video.src = item.content.replace('\n', '')
            break
          case 'stream' :
            item.content.replace('\n', '')
            state.video.src = item.content.replace('\n', '')
        }
      })
    } else {
      switch (payload.type) {
        case 'newsticker' :
          state.newSticker = payload.content
          break
        case 'image' :
          state.image = payload.content
          state.video.src = ''
          break
        case 'video':
          payload.content.replace('\n', '')
          state.video.src = payload.content.replace('\n', '')
          state.image = ''
          console.log('video', state.video.src)
          break
        case 'stream' :
          payload.content.replace('\n', '')
          state.video.src = payload.content.replace('\n', '')
          state.image = ''
          console.log('stream', state.video.src)
      }
    }
  }
}
const actions = {
  onOpen ({ commit }) {
    commit('onOpen')
  },
  handWsRes ({ commit }, messages) {
    commit('setWsRes', messages)
  }
}
const getters = {
  newSticker (state) {
    return state.newSticker
  },
  video (state) {
    return state.video.src
  },
  image (state) {
    return state.image
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
