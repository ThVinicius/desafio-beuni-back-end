import prisma from '../database/prisma'
import { IOrder, IOrderQuery } from '../types/orderType'
import { notAcceptable } from '../utils/throwError'

async function add(order: IOrder[], customerId: number) {
  try {
    // retira a quantidade do produto
    await prisma.$transaction([
      ...order.map(order =>
        prisma.product.update({
          where: { id: order.productId },
          data: { stock: { decrement: order.quantity } }
        })
      ),
      // cria o pedido
      prisma.order.createMany({ data: order }),
      // deleta o carrinho do cliente
      prisma.cart.deleteMany({ where: { customerId } })
    ])
  } catch (error) {
    // deleta do carrinho todos os produtos que tem a quantidade maior que o stock
    await prisma.$queryRaw`
      DELETE FROM carts WHERE "productId" IN 
        (SELECT c."productId" FROM carts c 
          JOIN products p ON p.id = c."productId" 
          WHERE c.quantity > p.stock);`

    notAcceptable(
      'O estoque desses produtos não possui a quantidade solicitada!'
    )
  }
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
