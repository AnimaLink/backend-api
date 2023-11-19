const ForumCategoryValidator = require('../validators/forum-category-validator')
const imgUpload = require('../services/module/img-upload-module')
const { ValidationError, NotFoundError } = require('../exceptions')
const ForumCategoryService = require('../services/forum-category-service')
const { StatusCodes } = require('http-status-codes')

const ForumCategoryController = {
  createForumCategory: async (req, res, next) => {
    try {
      const { error, value } = ForumCategoryValidator.createForumCategory(
        req.body
      )

      let errors = []

      if (error) {
        errors = errors.concat(error.details.map((detail) => detail.message))
      }

      let imageUrl = ''

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

      const payload = {
        ...value,
        img_url: imageUrl,
      }

      const forumCategoryId = await ForumCategoryService.createForumCategory(
        payload
      )

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'create forum category success',
        data: {
          forumCategoryId,
        },
      })
    } catch (error) {
      next(error)
    }
  },
  updateForumCategory: async (req, res, next) => {
    if (!req.params.id) {
      throw new ValidationError('No id provided')
    }

    const forumCategory = await ForumCategoryService.getForumCategoryById({
      id: req.params.id,
    })

    if (!forumCategory) {
      throw new NotFoundError('Forum category not found')
    }

    let errors = []

    const { error, value } = ForumCategoryValidator.updateForumCategory(
      req.body
    )

    if (error) {
      errors = errors.concat(error.details.map((detail) => detail.message))
    }

    let imgUrl = forumCategory.img_url

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
      id: forumCategory.id,
      img_url: imgUrl,
    }

    const result = await ForumCategoryService.updateForumCategory(payload)

    if (!result) {
      throw new NotFoundError('Forum category not found')
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'update forum category success',
      data: {
        forumCategoryId: forumCategory.id,
      },
    })
  },
  deleteForumCategory: async (req, res, next) => {
    if (!req.params.id) {
      throw new ValidationError('No id provided')
    }

    const forumCategory = await ForumCategoryService.getForumCategoryById({
      id: req.params.id,
    })

    if (!forumCategory) {
      throw new NotFoundError('Forum category not found')
    }

    const result = await ForumCategoryService.deleteForumCategory({
      id: forumCategory.id,
    })

    if (!result) {
      throw new NotFoundError('Forum category not found')
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'delete forum category success',
      data: null,
    })
  },
  getAllForumCategory: async (req, res, next) => {
    const listForumCategory = await ForumCategoryService.getAllForumCategory()

    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'get all forum category success',
      data: {
        listForumCategory,
      },
    })
  },
}

module.exports = ForumCategoryController
