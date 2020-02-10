import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },

  getters: {
    productsCount () {

    }
  },

  actions: {
    fetchProducts () {

    }
  },

  mutations: {
    setProducts (state, products) {
      state.products = products
    }
  }
})
