import joi from 'joi'

const add = joi.object({
  nickname: joi.string().trim().max(33).required(),
  password: joi.string().trim().required(),
  confirmPassword: joi.valid(joi.ref('password')).required()
})

const signIn = joi.object({
  nickname: joi.string().trim().max(33).required(),
  password: joi.string().trim().required()
})

export default { add, signIn }
