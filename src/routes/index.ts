import { Router } from 'express'
import productRoute from './productRoute'
import customerRoute from './customerRoute'
import cartRoute from './cartRoute'
import orderRoute from './orderRoute'

const route = Router()

route.use(productRoute)
route.use(customerRoute)
route.use(cartRoute)
route.use(orderRoute)

export default route
