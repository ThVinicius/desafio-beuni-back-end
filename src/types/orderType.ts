export interface IOrder {
  productId: number
  customerId: number
  quantity: number
  totalPrice: number
  orderDate: string
}

export interface IOrderQuery {
  orderDate: string
  totalPrice: number
  products: {
    orderId: number
    productId: number
    name: string
    image: string
    totalPrice: number
    quantity: number
  }[]
}
