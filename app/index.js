const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const errorMiddleware = require('./middlewares/error-middleware')
const notFoundMiddleware = require('./middlewares/not-found-middleware')
const routes = require('./routes')
const deserializeToken = require('./middlewares/deserialize-token')

const createServer = () => {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(cors())
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
  })

  app.get('/', (req, res) => {
    res.status(200).send('Visit /api/docs for more information')
  })

  app.use(deserializeToken)

  routes(app)

  app.use(errorMiddleware)
  app.use(notFoundMiddleware)

  return app
}

module.exports = createServer
