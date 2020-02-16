export default {
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
}
