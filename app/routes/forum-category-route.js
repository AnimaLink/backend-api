const { Router } = require('express')
const AuthMiddleware = require('../middlewares/auth-middleware')
const ForumCategoryController = require('../controllers/forum-category-controller')
const multer = require('../services/module/multer-module')

const ForumCategoryRouter = Router()

ForumCategoryRouter.post(
  '/',
  AuthMiddleware.requireUser,
  multer.single('attachment'),
  ForumCategoryController.createForumCategory
)
ForumCategoryRouter.put(
  '/:id',
  AuthMiddleware.requireUser,
  multer.single('attachment'),
  ForumCategoryController.updateForumCategory
)
ForumCategoryRouter.delete(
  '/:id',
  AuthMiddleware.requireUser,
  ForumCategoryController.deleteForumCategory
)
ForumCategoryRouter.get(
  '/',
  AuthMiddleware.requireUser,
  ForumCategoryController.getAllForumCategory
)

module.exports = ForumCategoryRouter
