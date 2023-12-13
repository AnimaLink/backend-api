const {
  ValidationError,
  NotFoundError,
  InvariantError,
} = require('../exceptions')
const AnimalValidator = require('../validators/animal-validator')
const imgUpload = require('../services/module/img-upload-module')
const AnimalService = require('../services/animal-service')
const { StatusCodes } = require('http-status-codes')

const AnimalController = {
  getAllAnimal: async (req, res, next) => {
    try {
      const listAnimal = await AnimalService.getAllAnimals()
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'get all animals success',
        data: {
          listAnimal,
        },
      })
    } catch (error) {
      next(error)
    }
  },

  createAnimal: async (req, res, next) => {
    try {
      let errors = []

      if (!req.file) {
        errors.push('Please upload an image')
      } else {
        const extension = req.file.originalname.split('.').pop().toLowerCase()
        const allowedFormats = ['jpg', 'jpeg', 'png']
        if (!allowedFormats.includes(extension)) {
          errors.push(
            'Invalid file format. Please upload an image (jpg, jpeg, png)'
          )
        }
      }

      const { error, value } = AnimalValidator.createAnimal(req.body)

      if (error) {
        errors = errors.concat(error.details.map((detail) => detail.message))
      }

      if (errors.length > 0) {
        throw new ValidationError(errors)
      }

      await imgUpload.uploadToGcs(req, res, next)

      let imageUrl = ''

      if (req.file && req.file.cloudStoragePublicUrl) {
        imageUrl = req.file.cloudStoragePublicUrl
      }

      const animalId = await AnimalService.createAnimal({
        ...value,
        img_url: imageUrl,
      })

      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'create animal data success',
        data: {
          animalId,
        },
      })
    } catch (error) {
      next(error)
    }
  },

  updateAnimal: async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ValidationError('No id provided')
      }

      let errors = []

      const animal = await AnimalService.getAnimalById({ id: req.params.id })

      if (!animal) {
        throw new NotFoundError('Animal not found')
      }

      let imageUrl = animal.img_url

      if (req.file) {
        const extension = req.file.originalname.split('.').pop().toLowerCase()
        const allowedFormats = ['jpg', 'jpeg', 'png']
        if (!allowedFormats.includes(extension)) {
          errors.push(
            'Invalid file format. Please upload an image (jpg, jpeg, png)'
          )
        } else {
          await imgUpload.uploadToGcs(req, res, next)

          if (req.file && req.file.cloudStoragePublicUrl) {
            imageUrl = req.file.cloudStoragePublicUrl
          }
        }
      }

      const { error, value } = await AnimalValidator.updateAnimal(req.body)

      if (error) {
        errors = errors.concat(error.details.map((detail) => detail.message))
      }

      if (errors.length > 0) {
        throw new ValidationError(errors)
      }

      const payload = {
        ...value,
        id: animal.id,
        img_url: imageUrl,
      }

      const result = await AnimalService.updateAnimal(payload)

      if (!result) {
        throw new InvariantError('Failed to update animal')
      }

      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'update animal data success',
        data: {
          animalId: animal.id,
        },
      })
    } catch (error) {
      next(error)
    }
  },

  deleteAnimal: async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ValidationError('No id provided')
      }

      const animal = await AnimalService.getAnimalById({ id: req.params.id })

      if (!animal) {
        throw new NotFoundError('Animal not found')
      }

      const result = await AnimalService.deleteAnimal({ id: animal.id })

      if (!result) {
        throw new InvariantError('Failed to delete animal')
      }

      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'animal deleted successfully',
        data: null,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },
  getAnimalById: async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ValidationError('No id provided')
      }

      const animal = await AnimalService.getAnimalById({ id: req.params.id })

      if (!animal) {
        throw new NotFoundError('Animal not found')
      }

      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'get detail animal success',
        data: {
          animal,
        },
      })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = AnimalController
