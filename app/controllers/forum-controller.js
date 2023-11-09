const { ValidationError } = require('../exceptions')
const { StatusCodes } = require('http-status-codes')
const imgUpload = require('../services/module/img-upload-module')
const ForumService = require('../services/forum-service')
const ForumValidator = require('../validators/forum-validator')

const ForumController = {
  createForum: async (req, res, next) => {
    try {
      if (!req.file) {
        throw new ValidationError('Please upload an image')
      }

      const { error, value } = ForumValidator.createForum(req.body)

      if (error) {
        throw new ValidationError(error.details.map((detail) => detail.message))
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
