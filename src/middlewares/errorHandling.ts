import { ErrorRequestHandler } from 'express'

export const errorHandling: ErrorRequestHandler = (error, req, res, next) => {
  switch (error.code) {
    case 'Bad request':
      return res.status(400).send(error.message)

    case 'Unauthorized':
      return res.status(401).send(error.message)

    case 'Not Found':
      return res.status(404).send(error.message)

    case 'Conflit':
      return res.status(409).send(error.message)

    default:
      console.log(error)
      return res.status(500).send(error)
  }
}
