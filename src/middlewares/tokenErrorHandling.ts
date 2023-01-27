import { ErrorRequestHandler } from 'express'

export const tokenErrorHandling: ErrorRequestHandler = (
  error,
  _,
  res,
  next
) => {
  switch (error.name) {
    case 'JsonWebTokenError':
      return res.status(401).send('token inválido')

    default:
      break
  }

  next(error)
}
