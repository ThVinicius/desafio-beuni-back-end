import { Router } from 'express'
import productRoute from './productRoute'

const route = Router()

route.use(productRoute)

export default route
