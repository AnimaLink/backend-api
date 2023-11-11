const { Router } = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./docs/openapi.json')

const DocsRouter = Router()

DocsRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = DocsRouter
