const { Router } = require('express')
const AuthMiddleware = require('../middlewares/auth-middleware')
const ForumStatusController = require('../controllers/forum-status-controller')
const multer = require('../services/module/multer-module')

const ForumStatusRouter = Router()

ForumStatusRouter.post(
  '/',
  AuthMiddleware.requireUser,
  multer.single('attachment'),
  ForumStatusController.createForumStatus
)
ForumStatusRouter.put(
  '/:id',
  AuthMiddleware.requireUser,
  multer.single('attachment'),
  ForumStatusController.updateForumStatus
)
ForumStatusRouter.delete(
  '/:id',
  AuthMiddleware.requireUser,
  ForumStatusController.deleteForumStatus
)
ForumStatusRouter.get(
  '/',
  AuthMiddleware.requireUser,
  ForumStatusController.getAllForumStatus
)

module.exports = ForumStatusRouter
