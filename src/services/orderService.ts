import dayjs from 'dayjs'
import orderRepository from '../repositories/orderRepository'
import cartRepository from '../repositories/cartRepository'
import { IOrder } from '../types/orderType'

async function add(customerId: number) {
  const cart = await cartRepository.findAllByCustomerId(customerId)

  const now = dayjs().format('DD/MM/YYYY - HH:mm')

  const order = cart.map(({ productId, quantity, totalPrice }) => {
    return {
      productId,
      customerId,
      quantity,
      totalPrice,
      orderDate: now
    }
  }) as IOrder[]

  await orderRepository.add(order, customerId)
}

async function findAllByCustomerId(customerId: number) {
  return await orderRepository.findAllByCustomerId(customerId)
}

export default { add, findAllByCustomerId }
