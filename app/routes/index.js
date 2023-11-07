const ProductRouter = require('./product-route')

const _routes = [['/api/products', ProductRouter]]

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

module.exports = routes
