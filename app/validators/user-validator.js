const Joi = require('joi')

const UserValidator = {
  updateUser: (payload) => {
    const schema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      wa_number: Joi.string().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
}

module.exports = UserValidator
