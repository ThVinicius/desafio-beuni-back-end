import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'

function schemaValidator(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query, { abortEarly: false })

    if (error) {
      return res.status(400).send(error.details.map(detail => detail.message))
    }

    return next()
  }
}

export default schemaValidator
