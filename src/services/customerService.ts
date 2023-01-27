import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import customerRepository from '../repositories/customerRepository'
import { ICustomer } from '../types/customerType'
import { unauthorized } from '../utils/throwError'

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

async function handleSignIn(user: ICustomer) {
  const dbUser = await findByNickname(user.nickname)

  if (dbUser === null) unauthorized('nickname ou senha incorreta')

  validateBcrypt(user.password!, dbUser!.password!)

  return createToken(dbUser!.id)
}

function validateBcrypt(decrypted: string, encrypted: string) {
  const compare = bcrypt.compareSync(decrypted, encrypted)

  if (!compare) return unauthorized('nickname ou senha incorreta')
}

function findByNickname(nickname: string) {
  return customerRepository.findByNickname(nickname)
}

function createToken(id: number) {
  const secretKey: string = process.env.JWT_SECRET!

  const token = jwt.sign({ id }, secretKey)

  return token
}

export default {
  add,
  handleSignIn
}
