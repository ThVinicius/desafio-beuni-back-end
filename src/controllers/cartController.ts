import { Request, Response } from 'express'
import cartService from '../services/cartService'
import { ICart } from './../types/cartType'

async function add(req: Request, res: Response) {
  const cart = req.body as ICart
  const customerId = res.locals.customer.id

  cart.customerId = customerId

  await cartService.add(cart)

  return res.sendStatus(201)
}

async function remove(req: Request, res: Response) {
  const cartId = Number(req.params.id)
  const customerId = res.locals.customer.id

  await cartService.remove(cartId, customerId)

  return res.sendStatus(200)
}

export default { add, remove }
