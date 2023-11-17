const Joi = require('joi')

const CommentValidator = {
  createComment: (payload) => {
    const schema = Joi.object({
      comment: Joi.string().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
  updateComment: (payload) => {
    const schema = Joi.object({
      comment: Joi.string().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
}

module.exports = CommentValidator
