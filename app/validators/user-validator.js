const Joi = require('joi')

const UserValidator = {
  updateUser: (payload) => {
    const schema = Joi.object({
      first_name: Joi.string().trim().required(),
      last_name: Joi.string().trim().required(),
      wa_number: Joi.string().trim().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
}

module.exports = UserValidator
