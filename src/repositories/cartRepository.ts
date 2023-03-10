import prisma from '../database/prisma'
import { ICart, ICartQuery } from '../types/cartType'

async function add(data: ICart) {
  return await prisma.cart.create({ data })
}

async function findAllByCustomerId(customerId: number) {
  return await prisma.$queryRaw<ICartQuery[]>`
    SELECT c.id AS "cartId", p.id AS "productId", p.name, 
      p.image, c.quantity, c."totalPrice" 
    FROM carts c
    JOIN products p ON p.id = c."productId"
    WHERE "customerId" = ${customerId};`
}

async function findById(id: number) {
  return await prisma.cart.findUnique({ where: { id } })
}

async function remove(id: number) {
  await prisma.cart.delete({ where: { id } })
}

export default { add, findById, remove, findAllByCustomerId }
