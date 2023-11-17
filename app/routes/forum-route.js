const { Router } = require('express')
const multer = require('../services/module/multer-module')
const ForumController = require('../controllers/forum-controller')
const AuthMiddleware = require('../middlewares/auth-middleware')

const ForumRouter = Router()

ForumRouter.post(
  '/',
  AuthMiddleware.requireUser,
  multer.single('attachment'),
  ForumController.createForum
)
ForumRouter.put(
  '/:id',
  AuthMiddleware.requireUser,
  multer.single('attachment'),
  ForumController.updateForum
)
ForumRouter.delete(
  '/:id',
  AuthMiddleware.requireUser,
  ForumController.deleteForum
)
ForumRouter.get(
  '/:id',
  AuthMiddleware.requireUser,
  ForumController.getForumById
)
ForumRouter.get('/', AuthMiddleware.requireUser, ForumController.getAllForum)

module.exports = ForumRouter
