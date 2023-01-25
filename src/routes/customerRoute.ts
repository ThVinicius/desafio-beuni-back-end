import { Router } from 'express'
import customerController from '../controllers/customerController'
import schemaValidator from '../middlewares/schemaValidator'
import customerSchema from '../schemas/customerSchema'

const customerRoute = Router()

customerRoute.post(
  '/sign-up',
  schemaValidator(customerSchema.add),
  customerController.signUp
)

export default customerRoute
