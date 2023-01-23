import { Router } from 'express'
import schemaValidator from '../middlewares/schemaValidator'
import productController from '../controllers/productController'
import productSchema from '../schemas/productSchema'

const route = Router()

route.get(
  '/products',
  schemaValidator(productSchema.queryProduct),
  productController.getProducts
)

export default route
