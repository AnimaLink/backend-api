const { ValidationError } = require('../exceptions')
const { StatusCodes } = require('http-status-codes')
const imgUpload = require('../services/module/img-upload-module')
const ForumService = require('../services/forum-service')
const ForumValidator = require('../validators/forum-validator')

const ForumController = {
  createForum: async (req, res, next) => {
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

      const { error, value } = ForumValidator.createForum(req.body)

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

      const user = res.locals.user

      const payload = {
        ...value,
        img_url: imageUrl,
        user_id: user.id,
      }

      const forumId = await ForumService.createForum(payload)
      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'create forum success',
        data: {
          forumId,
        },
      })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = ForumController
