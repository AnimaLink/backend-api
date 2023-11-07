const ProductService = require('../services/product-service')
const { StatusCodes } = require('http-status-codes')
const ProductValidator = require('../validators/product-validator')
const { ValidationError } = require('../exceptions')

const ProductController = {
  getAllProducts: async (req, res, next) => {
    try {
      const listProduct = await ProductService.getAllProducts()
      return res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'get data product success',
        data: listProduct,
      })
    } catch (err) {
      next(err)
    }
  },
  postProduct: async (req, res, next) => {
    try {
      const { error, value } = ProductValidator.createProduct(req.body)

      if (error) {
        throw new ValidationError(error.details.map((detail) => detail.message))
      }

      const productId = await ProductService.postDataProduct(value)
      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'post data product success',
        data: {
          productId,
        },
      })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = ProductController
