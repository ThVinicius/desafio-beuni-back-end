import { Router } from 'express'
import productRoute from './productRoute'
import customerRoute from './customerRoute'
import cartRoute from './cartRoute'

const route = Router()

route.use(productRoute)
route.use(customerRoute)
route.use(cartRoute)

export default route
