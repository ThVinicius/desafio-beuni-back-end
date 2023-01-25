import bcrypt from 'bcrypt'
import customerRepository from '../repositories/customerRepository'
import { ICustomer } from '../types/customerType'

async function add(data: ICustomer) {
  const encryptedPassword = bcryptPassword(data.password)

  data.password = encryptedPassword

  await createUser(data)
}

async function createUser(data: ICustomer) {
  return await customerRepository.add(data)
}

function bcryptPassword(password: string) {
  const saltRounds: number = 10

  return bcrypt.hashSync(password, saltRounds)
}

export default {
  add
}
