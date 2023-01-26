import prisma from '../database/prisma'
import { ICart } from '../types/cartType'

async function add(data: ICart) {
  await prisma.cart.create({ data })
}

async function findById(id: number) {
  return await prisma.cart.findUnique({ where: { id } })
}

export default { add, findById }
