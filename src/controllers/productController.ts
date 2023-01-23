import { Request, Response } from 'express'
import productService from '../services/productService'

async function getProducts(req: Request, res: Response) {
  const { name }: { name?: string } = req.query

  const products = await productService.getAllProducts(name)

  return res.status(200).send(products)
}

export default { getProducts }
