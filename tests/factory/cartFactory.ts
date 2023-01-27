export function cartDbFactory() {
  return { id: 1, productId: 1, customerId: 1, quantity: 50, totalPrice: 500 }
}

export function queryCart() {
  return {
    cartId: 1,
    productId: 1,
    image: 'camiseta',
    name: 'camiseta',
    quantity: 50,
    totalPrice: 5000
  }
}
