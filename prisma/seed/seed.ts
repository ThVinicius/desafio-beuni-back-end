import prisma from '../../src/database/prisma'
import getProducts from './data'

async function main() {
  const productsCount = await prisma.product.count()

  if (productsCount !== 50) {
    await prisma.product.deleteMany()

    const products = await getProducts()

    await prisma.product.createMany({ data: products })
  }
}

main()
  .catch(e => {
    console.log(e)
  })
  .finally(() => {
    prisma.$disconnect()
  })
