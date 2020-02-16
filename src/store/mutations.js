export default {
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
