const Joi = require('joi')

const ForumTypeValidator = {
  createForumType: (payload) => {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
  updateForumType: (payload) => {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
}

module.exports = ForumTypeValidator
