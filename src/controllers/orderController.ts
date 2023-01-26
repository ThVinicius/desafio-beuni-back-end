import { Request, Response } from 'express'
import orderService from '../services/orderService'

async function add(_: Request, res: Response) {
  const customerId = res.locals.customer.id

  await orderService.add(customerId)

  return res.sendStatus(201)
}

export default { add }
