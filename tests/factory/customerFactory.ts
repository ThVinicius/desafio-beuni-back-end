import bcrypt from 'bcrypt'

export function customerWithPasswordEncrypt() {
  const customer = { id: 1, nickname: 'test', password: '123' }
  const saltRounds: number = 10

  customer.password = bcrypt.hashSync(customer.password, saltRounds)

  return customer
}

export function customerWithId() {
  return { id: 1, nickname: 'teste', password: '123' }
}
