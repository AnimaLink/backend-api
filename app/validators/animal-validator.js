const Joi = require('joi')

const AnimalValidator = {
  createAnimal(payload) {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      behaviour: Joi.string().trim().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
  updateAnimal(payload) {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      behaviour: Joi.string().trim().required(),
    }).options({ abortEarly: false })

    return schema.validate(payload)
  },
}

module.exports = AnimalValidator
