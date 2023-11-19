const { Router } = require('express')
const AuthMiddleware = require('../middlewares/auth-middleware')
const AnimalController = require('../controllers/animal-controller')
const multer = require('../services/module/multer-module')

const AnimalRouter = Router()

AnimalRouter.post(
  '/',
  AuthMiddleware.requireUser,
  multer.single('attachment'),
  AnimalController.createAnimal
)
AnimalRouter.put(
  '/:id',
  AuthMiddleware.requireUser,
  multer.single('attachment'),
  AnimalController.updateAnimal
)
AnimalRouter.delete(
  '/:id',
  AuthMiddleware.requireUser,
  AnimalController.deleteAnimal
)
AnimalRouter.get('/', AuthMiddleware.requireUser, AnimalController.getAllAnimal)

module.exports = AnimalRouter
