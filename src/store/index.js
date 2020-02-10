import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },

  getters: {
    availableProducts (state) {
      return state.products.filter(product => product.inventory > 0)
    }
  },

  actions: {
    fetchProducts ({commit}) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products)

          resolve()
        })
      })
    },

    addToCart ({commit}, product) {
      if (product.inventory > 0) {
        commit('pushProductToCart', product)
      }
    }
  },

  mutations: {
    setProducts (state, products) {
      state.products = products
    }
  }
})
