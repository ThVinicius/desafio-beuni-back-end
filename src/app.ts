import express, { json } from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes/index'
import { errorHandling } from './middlewares/errorHandling'
import { prismaErrorHandling } from './middlewares/prismaErrorHandling'

const app = express()

app.use(cors())
app.use(json())

app.use(routes)
app.use(prismaErrorHandling)
app.use(errorHandling)

export default app
