const Joi = require('joi')

const ForumValidator = {
  createForum: (payload) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.string().required(),
      description: Joi.string().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
}

module.exports = ForumValidator
