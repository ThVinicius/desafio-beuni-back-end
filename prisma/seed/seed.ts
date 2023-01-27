import prisma from '../../src/database/prisma'
import { customerWithEncryptedPassword } from './customerSeed'
import getProducts from './data'

async function main() {
  const productsCount = await prisma.product.count()

  if (productsCount !== 50) {
    await prisma.product.deleteMany()

    const products = await getProducts()

    await prisma.product.createMany({ data: products })
  }

  const create = customerWithEncryptedPassword()

  await prisma.customer.upsert({
    create,
    update: {},
    where: { nickname: create.nickname }
  })
}

main()
  .catch(e => {
    console.log(e)
  })
  .finally(() => {
    prisma.$disconnect()
  })
