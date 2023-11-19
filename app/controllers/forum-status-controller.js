const ForumStatusValidator = require('../validators/forum-status-validator')
const imgUpload = require('../services/module/img-upload-module')
const { ValidationError, NotFoundError } = require('../exceptions')
const ForumStatusService = require('../services/forum-status-service')
const { StatusCodes } = require('http-status-codes')

const ForumStatusController = {
  createForumStatus: async (req, res, next) => {
    try {
      let errors = []
      let imgUrl = ''

      const { error, value } = ForumStatusValidator.createForumStatus(req.body)

      if (error) {
        errors = errors.concat(error.details.map((detail) => detail.message))
      }

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
            imgUrl = req.file.cloudStoragePublicUrl
          }
        }
      }

      if (errors.length > 0) {
        throw new ValidationError(errors)
      }

      const payload = {
        ...value,
        img_url: imgUrl,
      }

      const forumStatusId = await ForumStatusService.createForumStatus(payload)

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'create forum status success',
        data: {
          forumStatusId,
        },
      })
    } catch (error) {
      next(error)
    }
  },
  updateForumStatus: async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ValidationError('No id provided')
      }

      const forumStatus = await ForumStatusService.getForumStatusById({
        id: req.params.id,
      })

      if (!forumStatus) {
        throw new NotFoundError('Forum status not found')
      }

      let errors = []

      const { error, value } = ForumStatusValidator.updateForumStatus(req.body)

      if (error) {
        errors = errors.concat(error.details.map((detail) => detail.message))
      }

      let imgUrl = forumStatus.img_url

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
            imgUrl = req.file.cloudStoragePublicUrl
          }
        }
      }

      if (errors.length > 0) {
        throw new ValidationError(errors)
      }

      const payload = {
        ...value,
        img_url: imgUrl,
        id: forumStatus.id,
      }

      const result = await ForumStatusService.updateForumStatus(payload)

      if (!result) {
        throw new NotFoundError('Forum status not found')
      }

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'update forum status success',
        data: {
          forumStatusId: forumStatus.id,
        },
      })
    } catch (error) {
      next(error)
    }
  },
  deleteForumStatus: async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ValidationError('No id provided')
      }

      const forumStatus = await ForumStatusService.getForumStatusById({
        id: req.params.id,
      })

      if (!forumStatus) {
        throw new NotFoundError('Forum status not found')
      }

      const result = await ForumStatusService.deleteForumStatus({
        id: forumStatus.id,
      })

      if (!result) {
        throw new NotFoundError('Forum status not found')
      }

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'delete forum status success',
        data: null,
      })
    } catch (error) {
      next(error)
    }
  },
  getAllForumStatus: async (req, res, next) => {
    try {
      const listForumStatus = await ForumStatusService.getAllForumStatus()

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'get all forum status success',
        data: {
          listForumStatus,
        },
      })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = ForumStatusController
