const Joi = require('joi')

const CommentValidator = {
  createComment: (payload) => {
    const schema = Joi.object({
      comment: Joi.string().trim().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
  updateComment: (payload) => {
    const schema = Joi.object({
      comment: Joi.string().trim().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
}

module.exports = CommentValidator
