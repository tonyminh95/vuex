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
    },

    cartProducts (state) {
      return state.carts.map(cart => {
        const product = state.products.find(product => product.id === cart.id)

        return {
          title: product.title,
          price: product.price,
          quantity: cart.quantity
        }
      })
    },

    cartTotal: (state, getters) => getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0),

    productIsInStock () {
      return (product) => {
        return product.inventory > 0
      }
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

    addProductToCart ({state, commit, getters}, product) {
      if (getters.productIsInStock) {
        const cartItem = state.carts.find(item => item.id === product.id)

        if (!cartItem) {
          commit('pushProductToCart', product.id)
        } else {
          commit('incrementItemQuantity', cartItem)
        }

        commit('decrementProductInventory', product)
      }
    },

    checkout ({ state, commit }) {
      shop.buyProducts(
        state.carts,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
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
    },

    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },

    emptyCart (state) {
      state.carts = []
    }
  }
})
