const Joi = require('joi')

const ForumStatusValidator = {
  createForumStatus: (payload) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
  updateForumStatus: (payload) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
}

module.exports = ForumStatusValidator
