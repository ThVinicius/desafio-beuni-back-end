import { Router } from 'express'
import orderController from '../controllers/orderController'
import tokenValidate from '../middlewares/tokenValidate'

const orderRoute = Router()

orderRoute.post('/orders', tokenValidate, orderController.add)

export default orderRoute
