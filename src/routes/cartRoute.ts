import { Router } from 'express'
import cartController from '../controllers/cartController'
import schemaValidator from '../middlewares/schemaValidator'
import cartSchema from '../schemas/cartSchema'

const cartRoute = Router()

cartRoute.post('/carts', schemaValidator(cartSchema.add), cartController.add)

export default cartRoute
