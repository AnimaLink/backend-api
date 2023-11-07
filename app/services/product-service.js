const { Product } = require('../models')

const ProductService = {
  getAllProducts: async () => {
    const listProduct = await Product.findAll()
    return listProduct
  },
  postDataProduct: async (payload) => {
    const newProduct = await Product.create(payload)
    return newProduct.id
  },
}

module.exports = ProductService
