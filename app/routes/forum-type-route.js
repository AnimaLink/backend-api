const { Router } = require('express')
const AuthMiddleware = require('../middlewares/auth-middleware')
const multer = require('../services/module/multer-module')
const ForumTypeController = require('../controllers/forum-type-controller')

const ForumTypeRouter = Router()

ForumTypeRouter.post(
  '/',
  AuthMiddleware.requireUser,
  multer.single('attachment'),
  ForumTypeController.createForumType
)
ForumTypeRouter.put(
  '/:id',
  AuthMiddleware.requireUser,
  multer.single('attachment'),
  ForumTypeController.updateForumType
)
ForumTypeRouter.delete(
  '/:id',
  AuthMiddleware.requireUser,
  ForumTypeController.deleteForumType
)
ForumTypeRouter.get(
  '/',
  AuthMiddleware.requireUser,
  ForumTypeController.getAllForumType
)

module.exports = ForumTypeRouter
