import { Request, Response } from 'express'
import cartService from '../services/cartService'

async function add(req: Request, res: Response) {
  const cart = req.body

  await cartService.add(cart)

  return res.sendStatus(201)
}

export default { add }
