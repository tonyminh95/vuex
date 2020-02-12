import Vue from 'vue'
import Vuex from 'vuex'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    carts: []
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

    addProductToCart ({state, commit}, product) {
      if (product.inventory > 0) {
        const cartItem = state.carts.find(item => item.id === product.id)

        if (!cartItem) {
          commit('pushProductToCart', product.id)
        } else {
          commit('incrementItemQuantity', cartItem)
        }

        commit('decrementProductInventory', product)
      }
    }
  },

  mutations: {
    setProducts (state, products) {
      state.products = products
    },

    pushProductToCart (state, productId) {
      state.carts.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },

    decrementProductInventory (state, product) {
      product.inventory--
    }
  }
})
