const { Router } = require('express')
const AuthMiddleware = require('../middlewares/auth-middleware')
const UserController = require('../controllers/user-controller')
const multer = require('../services/module/multer-module')

const UserRouter = Router()

UserRouter.put(
  '/',
  AuthMiddleware.requireUser,
  multer.single('attachment'),
  UserController.updateUser
)
UserRouter.get('/', AuthMiddleware.requireUser, UserController.getUserInfo)

module.exports = UserRouter
