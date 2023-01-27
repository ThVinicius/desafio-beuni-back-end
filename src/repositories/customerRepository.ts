import prisma from '../database/prisma'
import { ICustomer } from '../types/customerType'

async function add(data: ICustomer) {
  return await prisma.customer.create({ data })
}

async function findByNickname(nickname: string) {
  return await prisma.customer.findUnique({
    where: { nickname }
  })
}

export default { add, findByNickname }
