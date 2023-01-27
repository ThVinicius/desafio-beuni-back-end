import joi from 'joi'

const add = joi.object({
  productId: joi.number().greater(0).strict().required(),
  quantity: joi.number().greater(0).strict().required()
})

const remove = joi.object({
  id: joi.number().greater(0).required()
})

export default { add, remove }
