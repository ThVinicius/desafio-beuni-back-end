import joi from 'joi'

const queryProduct = joi.object({
  name: joi.string().trim()
})

export default { queryProduct }
