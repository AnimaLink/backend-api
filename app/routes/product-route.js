const { Router } = require('express')
const ProductController = require('../controllers/product-controller')

const ProductRouter = Router()

ProductRouter.get('/', ProductController.getAllProducts)
ProductRouter.post('/', ProductController.postProduct)

module.exports = ProductRouter
