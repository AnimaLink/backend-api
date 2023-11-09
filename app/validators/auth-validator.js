const Joi = require('joi')

const AuthValidator = {
  login: (payload) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
  register: (payload) => {
    const schema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
      wa_number: Joi.string().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
}

module.exports = AuthValidator
