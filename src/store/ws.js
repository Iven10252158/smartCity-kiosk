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
            // console.log('newsticker', state.newSticker, item.listID)
            break
          case 'image' :
            state.image = item.content
            // console.log('image', state.image)
            break
          case 'video':
            state.video.src = `https://www.youtube.com/embed/${item.content}?wmode=opaque&autohide=1&autoplay=1&mute=1&loop=1&playlist=${item.content}`
            break
        }
      })
    } else {
      switch (payload.type) {
        case 'newsticker' :
          state.newSticker = payload.content
          console.log('else newsticker', state.newSticker)
          break
        case 'image' :
          state.image = payload.content
          break
        case 'video':
          state.video.src = `https://www.youtube.com/embed/${payload.content}?wmode=opaque&autohide=1&autoplay=1&mute=1&loop=1&playlist=${payload.content}`
          break
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
