const Joi = require('joi')

const ForumCategoryValidator = {
  createForumCategory: (payload) => {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
  updateForumCategory: (payload) => {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
}

module.exports = ForumCategoryValidator
