import { Router } from 'express'
import productRoute from './productRoute'
import customerRoute from './customerRoute'

const route = Router()

route.use(productRoute)
route.use(customerRoute)

export default route
