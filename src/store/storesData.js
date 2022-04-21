import axios from 'axios'

const state = {
  merchantValue: '',
  categories: [], // sideMenu分類
  types: [],
  typeValue: '',
  stores: [],
  pagination: [],
  isShow: false,
  page: 1
}

const mutations = {
  getAllShops (state, payload) {
    state.pagination = payload.slice(0, 1)
    state.stores = payload.slice(1)
    state.page = state.pagination[0].page
    console.log(state.stores)
    console.log(state.pagination)
  },
  getCategoryShop (state, payload) {
    // console.log(payload)
  },
  getCategories (state, payload) {
    state.categories = payload.region
    state.types = payload.type
    // console.log('state.categories', state.categories)
  },
  getTypeValue (state, district) {
    state.typeValue = district
    // console.log(state.typeValue)
  },
  getValue (state, category) {
    state.merchantValue = category
    // console.log('category', category)
  }
}

const actions = {
  async getAllShops ({ commit }, data) {
    // console.log('data', data)
    try {
      if (data.district && data.category) {
        const res = await axios.get(`${process.env.VUE_APP_URL}/smartcity/?type=${data.district}&region=${data.category}&offset=12&page=${data.page}`)
        // console.log('try1', res)
        commit('getAllShops', res.data)
        return res.data
      } else {
        const res = await axios.get(`${process.env.VUE_APP_URL}/smartcity/?type=${data.district}&offset=12&page=${data.page}`)
        // console.log('try2', data, res)
        commit('getAllShops', res.data)
        return res.data
      }
    } catch (error) {
      console.log('catch', error)
    }
  },
  getCategories ({ commit }) {
    return axios.get(`${process.env.VUE_APP_URL}/smartcity/items`)
      .then(res => {
        // console.log('getCategories', res)
        commit('getCategories', res.data)
        return res.data
      })
  },
  getDistrict ({ commit }, district) {
    // console.log(district)
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
  pagination (state) {
    return state.pagination
  },
  typeValue (state) {
    return state.typeValue
  },
  page (state) {
    return state.page
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
