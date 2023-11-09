const { Router } = require('express')
const AuthController = require('../controllers/auth-controller')

const AuthRouter = Router()

AuthRouter.post('/login', AuthController.login)
AuthRouter.post('/register', AuthController.register)

module.exports = AuthRouter
