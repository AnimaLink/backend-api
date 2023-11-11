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
    res.status(200).send(`
        <h1>🚀 AnimaLink Backend-APIs 🚀</h1>
        <p>Welcome to the starting point of your journey through our APIs. We hope you enjoy your journey.</p>
        <p>For more information, please visit <a href="/api/docs">/api/docs</a>.</p>
    `)
  })

  app.use(deserializeToken)

  routes(app)

  app.use(errorMiddleware)
  app.use(notFoundMiddleware)

  return app
}

module.exports = createServer
