const { StatusCodes } = require('http-status-codes')

const notFoundMiddleware = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: 'error',
    message: "Route doesn't exist",
  })
}

module.exports = notFoundMiddleware
