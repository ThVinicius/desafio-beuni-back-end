import { Router } from 'express'
import cartController from '../controllers/cartController'
import schemaValidator from '../middlewares/schemaValidator'
import tokenValidate from '../middlewares/tokenValidate'
import cartSchema from '../schemas/cartSchema'

const cartRoute = Router()

cartRoute.post(
  '/carts',
  tokenValidate,
  schemaValidator(cartSchema.add),
  cartController.add
)

const isParams = true
cartRoute.delete(
  '/carts/:id',
  tokenValidate,
  schemaValidator(cartSchema.remove, { isParams }),
  cartController.remove
)

export default cartRoute
