import bcrypt from 'bcrypt'

export const customerTest = { nickname: 'test', password: 'test' }

export function customerWithEncryptedPassword() {
  const customer = customerTest

  const saltRounds: number = 10

  customer.password = bcrypt.hashSync(customer.password, saltRounds)

  return customer
}
