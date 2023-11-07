const Joi = require('joi')

const ProductValidator = {
  createProduct: (payload) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      imgUrl: Joi.string().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
}

module.exports = ProductValidator
