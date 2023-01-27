import { ErrorRequestHandler } from 'express'

export const prismaErrorHandling: ErrorRequestHandler = (
  error,
  _,
  res,
  next
) => {
  switch (error.code) {
    case 'P2002':
      const CONFLIT = 409

      const keyConflit = error.meta.target[0]

      const message = `Esse ${keyConflit} já esta em uso!`

      return res.status(CONFLIT).send(message)

    case 'P2025':
      const NOT_FOUND = 404

      return res.status(NOT_FOUND).send(error.meta.cause)

    default:
      next(error)
  }
}
