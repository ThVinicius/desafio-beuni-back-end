import prisma from '../database/prisma'
import { IOrder } from '../types/orderType'

async function add(order: IOrder[], customerId: number) {
  await prisma.$transaction([
    prisma.order.createMany({ data: order }),
    prisma.cart.deleteMany({ where: { customerId } })
  ])
}

export default { add }
