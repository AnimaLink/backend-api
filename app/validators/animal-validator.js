const Joi = require('joi')

const AnimalValidator = {
  createAnimal(payload) {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      behaviour: Joi.string().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
  updateAnimal(payload) {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      behaviour: Joi.string().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
}

module.exports = AnimalValidator
