import axios from 'axios'

const state = {
  merchantValue: '',
  categories: [], // sideMenu分類
  types: [],
  typeValue: '',
  stores: [],
  isShow: false
}

const mutations = {
  getAllShops (state, payload) {
    state.stores = payload
    // console.log('getAllShops', state.stores)
  },
  getCategories (state, payload) {
    state.categories = payload.region
    state.types = payload.type
    console.log('state.categories', state.categories)
  },
  getTypeValue (state, district) {
    state.typeValue = district
    console.log(state.typeValue)
  },
  controlArrowBtn (state) {
    state.isShow = !state.isShow
    console.log('state.isShow', state.isShow)
  }
}

const actions = {
  getAllShops ({ commit }) {
    return axios.get('http://20.106.156.149:8080/smartcity/?type=%E9%AB%98%E9%9B%84%E5%B1%95%E5%8D%80&offset=10&page=1')
      .then(res => {
        // console.log(res.data)
        commit('getAllShops', res.data)
        return res.data
      })
  },
  getCategories ({ commit }) {
    return axios.get('http://20.106.156.149:8080/smartcity/items')
      .then(res => {
        // console.log(res)
        commit('getCategories', res.data)
        return res.data
      })
  },
  getDistrict ({ commit }, district) {
    commit('getTypeValue', district)
  },
  showArrowBtn ({ commit }) {
    commit('controlArrowBtn')
  }
}

const getters = {
  storesData (state) {
    return state.stores
  },
  categories (state) {
    return state.categories
  },
  merchantValue (state) {
    return state.merchantValue
  },

  typeValue (state) {
    return state.typeValue
  },
  isShow (state) {
    return state.isShow
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
