export interface ICart {
  productId: number
  customerId: number
  quantity: number
  totalPrice: number
}

export interface ICartQuery {
  cartId: number
  productId: number
  image: string
  name: string
  quantity: number
  totalPrice: number
}
