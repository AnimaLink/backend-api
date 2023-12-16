const Joi = require('joi')

const AuthValidator = {
  login: (payload) => {
    const schema = Joi.object({
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required().min(6),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
  register: (payload) => {
    const schema = Joi.object({
      first_name: Joi.string().trim().required(),
      last_name: Joi.string().trim().required(),
      email: Joi.string().trim().email().required(),
      password: Joi.string().trim().required().min(6),
      wa_number: Joi.string().trim().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
}

module.exports = AuthValidator
