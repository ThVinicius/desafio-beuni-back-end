import joi from 'joi'

const add = joi.object({
  productId: joi.number().greater(0).strict().required(),
  customerId: joi.number().greater(0).strict().required(),
  quantity: joi.number().greater(0).strict().required()
})

export default { add }
