import cartRepository from '../repositories/cartRepository'
import productRepository from '../repositories/productRepository'
import { ICart } from '../types/cartType'
import { forbidden, notAcceptable, notFound } from '../utils/throwError'

async function add(cart: ICart) {
  await cartValidation(cart)

  await cartRepository.add(cart)
}

async function findAllByCustomerId(customerId: number) {
  return await cartRepository.findAllByCustomerId(customerId)
}

async function remove(cartId: number, customerId: number) {
  const cart = await cartRepository.findById(cartId)

  if (!cart) notFound('Não encontrado')
  else if (cart.customerId !== customerId) forbidden()

  await cartRepository.remove(cartId)
}

async function cartValidation(cart: ICart) {
  const product = await productRepository.findById(cart.productId)

  if (!product) notFound('produto não encontrado!')

  if (product!.stock < cart.quantity)
    notAcceptable('O estoque desse produto não possui a quantidade solicitada!')
}

export default { add, remove, findAllByCustomerId }
