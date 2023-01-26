import { Request, Response } from 'express'
import cartService from '../services/cartService'
import { ICart } from './../types/cartType'

async function add(req: Request, res: Response) {
  const cart = req.body as ICart
  const customerId = res.locals.customer.id

  cart.customerId = customerId

  const cartDb = await cartService.add(cart)

  return res.status(201).send(cartDb)
}

async function findAllByCustomerId(req: Request, res: Response) {
  const customerId = res.locals.customer.id

  const carts = await cartService.findAllByCustomerId(customerId)

  return res.status(200).send(carts)
}

async function remove(req: Request, res: Response) {
  const cartId = Number(req.params.id)
  const customerId = res.locals.customer.id

  await cartService.remove(cartId, customerId)

  return res.sendStatus(200)
}

export default { add, remove, findAllByCustomerId }
