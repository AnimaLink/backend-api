const { StatusCodes } = require('http-status-codes')
const { ValidationError, NotFoundError } = require('../exceptions')
const ForumTypeService = require('../services/forum-type-service')
const imgUpload = require('../services/module/img-upload-module')
const ForumTypeValidator = require('../validators/forum-type-validator')

const ForumTypeController = {
  createForumType: async (req, res, next) => {
    try {
      let errors = []
      let imgUrl = ''

      const { error, value } = ForumTypeValidator.createForumType(req.body)

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

      const forumTypeId = await ForumTypeService.createForumType(payload)

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'create forum type success',
        data: {
          forumTypeId,
        },
      })
    } catch (error) {
      next(error)
    }
  },
  updateForumType: async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ValidationError('No id provided')
      }

      const forumType = await ForumTypeService.getForumTypeById({
        id: req.params.id,
      })

      if (!forumType) {
        throw new NotFoundError('Forum type not found')
      }

      let errors = []

      const { error, value } = ForumTypeValidator.updateForumType(req.body)

      if (error) {
        errors = errors.concat(error.details.map((detail) => detail.message))
      }

      let imgUrl = forumType.img_url

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
        id: forumType.id,
      }

      const result = await ForumTypeService.updateForumType(payload)

      if (!result) {
        throw new NotFoundError('Forum type not found')
      }

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'update forum type success',
        data: {
          forumTypeId: forumType.id,
        },
      })
    } catch (error) {
      next(error)
    }
  },
  deleteForumType: async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ValidationError('No id provided')
      }

      const forumType = await ForumTypeService.getForumTypeById({
        id: req.params.id,
      })

      if (!forumType) {
        throw new NotFoundError('Forum type not found')
      }

      const result = await ForumTypeService.deleteForumType({
        id: forumType.id,
      })

      if (!result) {
        throw new NotFoundError('Forum type not found')
      }

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'delete forum type success',
        data: null,
      })
    } catch (error) {
      next(error)
    }
  },
  getAllForumType: async (req, res, next) => {
    try {
      const listForumType = await ForumTypeService.getAllForumType()

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'get all forum type success',
        data: {
          listForumType,
        },
      })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = ForumTypeController
