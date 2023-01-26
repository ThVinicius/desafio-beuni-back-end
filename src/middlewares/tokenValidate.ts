import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import tokenSchema from '../schemas/tokenSchema'
import { Request, Response, NextFunction } from 'express'

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends JwtPayload {
    id: number
  }
}

dotenv.config()

async function tokenValidate(req: Request, res: Response, next: NextFunction) {
  const { error } = tokenSchema.validate(req.headers)

  if (error)
    return res.status(400).send(error.details.map(detail => detail.message))

  const { authorization } = req.headers

  const token = authorization!.replace('Bearer ', '')

  const secretKey: string = process.env.JWT_SECRET!

  const data = <jwt.UserIDJwtPayload>jwt.verify(token, secretKey)

  res.locals.customer = data

  next()
}

export default tokenValidate
