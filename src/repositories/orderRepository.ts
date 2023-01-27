import prisma from '../database/prisma'
import { IOrder, IOrderQuery } from '../types/orderType'

async function add(order: IOrder[], customerId: number) {
  await prisma.$transaction([
    prisma.order.createMany({ data: order }),
    prisma.cart.deleteMany({ where: { customerId } })
  ])
}

async function findAllByCustomerId(customerId: number) {
  return await prisma.$queryRaw<IOrderQuery>`
    SELECT o."orderDate", SUM("totalPrice") AS "totalPrice", 
	    json_agg(
        json_build_object(
          'orderId', o.id, 'productId', p.id, 'name', name, 
          'image', image, 'totalPrice', "totalPrice", 
          'quantity', quantity
        )
      ) AS products 
    FROM orders o
    JOIN products p ON p.id = o."productId"
    WHERE o."customerId" = ${customerId}
    GROUP BY o."orderDate";
  `
}

export default { add, findAllByCustomerId }
