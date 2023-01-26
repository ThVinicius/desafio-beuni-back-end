import { Router } from 'express'
import schemaValidator from '../middlewares/schemaValidator'
import productController from '../controllers/productController'
import productSchema from '../schemas/productSchema'
import tokenValidate from '../middlewares/tokenValidate'

const route = Router()

const isQuery = true

route.get(
  '/products',
  tokenValidate,
  schemaValidator(productSchema.queryProduct, { isQuery }),
  productController.getProducts
)

export default route
