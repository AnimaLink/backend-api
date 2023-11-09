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

module.exports = ForumRouter
