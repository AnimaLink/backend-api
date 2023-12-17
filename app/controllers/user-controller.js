const { StatusCodes } = require('http-status-codes')
const { NotFoundError, ValidationError } = require('../exceptions')
const UserService = require('../services/user-service')
const imgUpload = require('../services/module/img-upload-module')
const UserValidator = require('../validators/user-validator')

const UserController = {
  getUserInfo: async (req, res, next) => {
    try {
      const user = res.locals.user

      const userData = await UserService.getUserById({ id: user.id })

      if (!userData) {
        throw new NotFoundError('User not found')
      }

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'get user login info success',
        data: {
          userData,
        },
      })
    } catch (err) {
      next(err)
    }
  },
  updateUser: async (req, res, next) => {
    try {
      let errors = []
      const user = res.locals.user

      const userData = await UserService.getUserById({ id: user.id })

      if (!userData) {
        throw new NotFoundError('User not found')
      }

      const { error, value } = UserValidator.updateUser(req.body)

      if (error) {
        errors = errors.concat(error.details.map((detail) => detail.message))
      }

      let imageUrl = userData.avatar

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

      if (errors.length > 0) {
        throw new ValidationError(errors)
      }

      const updatedUser = await UserService.updateUser({
        id: userData.id,
        ...value,
        avatar: imageUrl,
      })

      if (!updatedUser) {
        throw new NotFoundError('User not found')
      }

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'update user success',
        data: {
          userId: userData.id,
        },
      })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = UserController
