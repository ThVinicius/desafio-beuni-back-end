import cartRepository from '../repositories/cartRepository'
import productRepository from '../repositories/productRepository'
import { ICart } from '../types/cartType'
import { notAcceptable, notFound } from '../utils/throwError'

async function add(cart: ICart) {
  await cartValidation(cart)

  await cartRepository.add(cart)
}

async function cartValidation(cart: ICart) {
  const product = await productRepository.findById(cart.productId)

  if (!product) notFound('produto não encontrado!')

  if (product!.stock < cart.quantity)
    notAcceptable('O estoque desse produto não possui a quantidade solicitada!')
}

export default { add }
