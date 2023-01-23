import prisma from '../database/prisma'

async function getAllProducts(queryName?: string) {
  return await prisma.product.findMany({
    where: { name: { contains: queryName, mode: 'insensitive' } }
  })
}

export default { getAllProducts }
