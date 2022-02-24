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
  },
  getCategoryShop (state, payload) {
    console.log(payload)
  },
  getCategories (state, payload) {
    state.categories = payload.region
    state.types = payload.type
    console.log('state.categories', state.categories)
  },
  getTypeValue (state, district) {
    state.typeValue = district
  },
  controlArrowBtn (state) {
    state.isShow = !state.isShow
    console.log('state.isShow', state.isShow)
  },
  getValue (state, category) {
    state.merchantValue = category
    console.log('category', category)
  }
}

const actions = {
  getAllShops ({ commit }, page) {
    console.log(page)
    return axios.get('http://20.106.156.149:8080/smartcity/?type=%E9%AB%98%E9%9B%84%E5%B1%95%E5%8D%80&offset=10&page=1')
      .then(res => {
        commit('getAllShops', res.data)
        return res.data
      })
  },
  getCategoryShop ({ commit }, region, page) {
    return axios.get('http://20.106.156.149:8080/smartcity/?type=%E9%AB%98%E9%9B%84%E5%B1%95%E5%8D%80&region=%E7%89%A9%E8%81%AF%E7%B6%B2%E6%87%89%E7%94%A8%285G%2CAIoT%29&offset=10&page=2')
      .then(res => {
        console.log('getCategoryShop', res, region)
        commit('getCategoryShop', res.data)
        return res.data
      })
  },
  getCategories ({ commit }) {
    return axios.get('http://20.106.156.149:8080/smartcity/items')
      .then(res => {
        commit('getCategories', res.data)
        return res.data
      })
  },
  getDistrict ({ commit }, district) {
    commit('getTypeValue', district)
  },
  getValue ({ commit }, category) {
    commit('getValue', category)
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
