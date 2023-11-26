const { ValidationError } = require('sequelize')
const ForumService = require('../services/forum-service')
const CommentValidator = require('../validators/comment-validator')
const { NotFoundError } = require('../exceptions')
const CommentService = require('../services/comment-service')
const { StatusCodes } = require('http-status-codes')

const CommentController = {
  createComment: async (req, res, next) => {
    try {
      if (!req.params.forumId) {
        throw new ValidationError('No forumId provided')
      }

      const forum = await ForumService.getForumById({ id: req.params.forumId })

      if (!forum) {
        throw new NotFoundError('Forum not found')
      }

      const { error, value } = CommentValidator.createComment(req.body)

      if (error) {
        throw new ValidationError(error.details.map((detail) => detail.message))
      }

      const user = res.locals.user

      const commentId = await CommentService.createComment({
        ...value,
        forum_id: forum.id,
        user_id: user.id,
      })

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: `create comment for forum id ${forum.id} success`,
        data: {
          commentId,
        },
      })
    } catch (error) {
      next(error)
    }
  },
  updateComment: async (req, res, next) => {
    if (!req.params.id) {
      throw new ValidationError('No id provided')
    }

    const comment = await CommentService.getCommentById({ id: req.params.id })
    const user = res.locals.user

    if (!comment) {
      throw new NotFoundError('Comment not found')
    }

    if (comment.user_id !== user.id) {
      throw new ValidationError('You are not authorized to update this comment')
    }

    const { error, value } = CommentValidator.updateComment(req.body)

    if (error) {
      throw new ValidationError(error.details.map((detail) => detail.message))
    }

    const result = await CommentService.updateComment({
      ...value,
      id: comment.id,
    })

    if (!result) {
      throw new NotFoundError('Comment not found')
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      message: 'update comment success',
      data: {
        commentId: comment.id,
      },
    })
  },
  deleteComment: async (req, res, next) => {
    try {
      if (!req.params.id) {
        throw new ValidationError('No id provided')
      }

      const comment = await CommentService.getCommentById({ id: req.params.id })
      const user = res.locals.user

      if (!comment) {
        throw new NotFoundError('Comment not found')
      }

      if (comment.user_id !== user.id) {
        throw new ValidationError(
          'You are not authorized to delete this comment'
        )
      }

      const result = await CommentService.deleteComment({ id: comment.id })

      if (!result) {
        throw new NotFoundError('Comment not found')
      }

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'delete comment success',
        data: null,
      })
    } catch (error) {
      next(error)
    }
  },
  getCommentByForumId: async (req, res, next) => {
    try {
      if (!req.params.forumId) {
        throw new ValidationError('No forumId provided')
      }

      const forum = await ForumService.getForumById({ id: req.params.forumId })

      if (!forum) {
        throw new NotFoundError('Forum not found')
      }

      const listComment = await CommentService.getAllCommentByForumId({
        forumId: forum.id,
      })

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: `get comment for forum ${forum.id} success`,
        data: {
          listComment,
        },
      })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = CommentController
