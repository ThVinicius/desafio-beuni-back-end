import prisma from '../database/prisma'
import { ICart } from '../types/cartType'

async function add(data: ICart) {
  return await prisma.cart.create({ data })
}

async function findAllByCustomerId(customerId: number) {
  return await prisma.$queryRaw`
    SELECT c.id AS "cartId", p.id AS "productId", p.name, 
      p.image, p.description, p.category, p.stock, p.brand, p.price,
	    p."hasFreeShipping", p."minimumQuantity", p.rating 
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
