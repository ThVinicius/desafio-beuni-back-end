import { Request, Response } from 'express'
import orderService from '../services/orderService'

async function add(_: Request, res: Response) {
  const customerId = res.locals.customer.id

  await orderService.add(customerId)

  return res.sendStatus(201)
}

async function findAllByCustomerId(_: Request, res: Response) {
  const customerId = res.locals.customer.id

  const orders = await orderService.findAllByCustomerId(customerId)

  return res.status(200).send(orders)
}

export default { add, findAllByCustomerId }
