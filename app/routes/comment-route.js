const { Router } = require('express')
const AuthMiddleware = require('../middlewares/auth-middleware')
const CommentController = require('../controllers/comment-controller')

const CommentRouter = Router()

CommentRouter.post(
  '/:forumId',
  AuthMiddleware.requireUser,
  CommentController.createComment
)

CommentRouter.get(
  '/:forumId',
  AuthMiddleware.requireUser,
  CommentController.getCommentByForumId
)

CommentRouter.put(
  '/:id',
  AuthMiddleware.requireUser,
  CommentController.updateComment
)

CommentRouter.delete(
  '/:id',
  AuthMiddleware.requireUser,
  CommentController.deleteComment
)

module.exports = CommentRouter
