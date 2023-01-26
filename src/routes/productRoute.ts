import { Router } from 'express'
import schemaValidator from '../middlewares/schemaValidator'
import productController from '../controllers/productController'
import productSchema from '../schemas/productSchema'

const route = Router()

const isQuery = true

route.get(
  '/products',
  schemaValidator(productSchema.queryProduct, { isQuery }),
  productController.getProducts
)

export default route
