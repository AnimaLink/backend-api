const { ValidationError, NotFoundError } = require('../exceptions')
const { StatusCodes } = require('http-status-codes')
const imgUpload = require('../services/module/img-upload-module')
const ForumService = require('../services/forum-service')
const ForumValidator = require('../validators/forum-validator')
const AiService = require('../services/ai-service')
const ForumStatus = require('../enums/ForumStatus')

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

      const aiResult = await AiService.checkAnimalStatus(req.file)

      if (aiResult.animal_status === 'extinct') {
        throw new ValidationError(aiResult.message)
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
        forum_status_id: ForumStatus.AVAILABLE,
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
  updateForum: async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ValidationError('No id provided')
      }

      const forum = await ForumService.getForumById({ id: req.params.id })
      const user = res.locals.user

      if (!forum) {
        throw new NotFoundError('Forum not found')
      }

      if (forum.userId !== user.id) {
        throw new ValidationError('You are not authorized to update this forum')
      }

      let errors = []

      const { error, value } = ForumValidator.updateForum(req.body)

      if (error) {
        errors = errors.concat(error.details.map((detail) => detail.message))
      }

      let imageUrl = forum.img_url

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

      const updatedForum = await ForumService.updateForum({
        ...value,
        img_url: imageUrl,
        id: forum.id,
        user_id: user.id,
      })

      if (!updatedForum) {
        throw new NotFoundError('Forum not found')
      }

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'update forum success',
        data: {
          forumId: forum.id,
        },
      })
    } catch (err) {
      next(err)
    }
  },
  deleteForum: async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ValidationError('No id provided')
      }

      const forum = await ForumService.getForumById({ id: req.params.id })
      const user = res.locals.user

      if (!forum) {
        throw new NotFoundError('Forum not found')
      }

      if (forum.userId !== user.id) {
        throw new ValidationError('You are not authorized to delete this forum')
      }

      if (await ForumService.deleteForum({ id: req.params.id })) {
        res.status(StatusCodes.OK).json({
          status: 'success',
          message: 'delete forum success',
          data: null,
        })
      }
    } catch (error) {
      next(error)
    }
  },
  getForumById: async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ValidationError('No id provided')
      }

      const forum = await ForumService.getForumById({ id: req.params.id })
      if (!forum) {
        throw new NotFoundError('Forum not found')
      }

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'get forum success',
        data: {
          forum,
        },
      })
    } catch (error) {
      next(error)
    }
  },
  getAllForum: async (req, res, next) => {
    try {
      if (req.query.name) {
        console.log(req.query.name)
        const listForum = await ForumService.getForumByName({
          name: req.query.name,
        })

        res.status(StatusCodes.OK).json({
          status: 'success',
          message: 'get all forum with name success',
          data: {
            listForum,
          },
        })
      } else if (req.query.page && req.query.limit) {
        const listForum = await ForumService.getAllForumsWithPaging({
          page: req.query.page,
          limit: req.query.limit,
        })

        res.status(StatusCodes.OK).json({
          status: 'success',
          message: 'get all forum with paging success',
          data: listForum,
        })
      } else {
        const listForum = await ForumService.getAllForum()

        res.status(StatusCodes.OK).json({
          status: 'success',
          message: 'get all forum success',
          data: {
            listForum,
          },
        })
      }
    } catch (err) {
      next(err)
    }
  },
}

module.exports = ForumController
