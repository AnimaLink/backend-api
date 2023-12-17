const Joi = require('joi')

const ForumValidator = {
  createForum: (payload) => {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
      price: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      forum_type_id: Joi.number().required(),
      forum_category_id: Joi.number().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
  updateForum: (payload) => {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
      price: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      forum_type_id: Joi.number().required(),
      forum_status_id: Joi.number().required(),
      forum_category_id: Joi.number().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
}

module.exports = ForumValidator
