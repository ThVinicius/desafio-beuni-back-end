import prisma from '../database/prisma'

async function getAllProducts(queryName?: string) {
  return await prisma.product.findMany({
    where: { name: { contains: queryName, mode: 'insensitive' } }
  })
}

async function findById(id: number) {
  return await prisma.product.findUnique({ where: { id } })
}

export default { getAllProducts, findById }
