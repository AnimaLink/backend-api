const { StatusCodes } = require('http-status-codes')
const ClientError = require('../exceptions/client-error')

const errorMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong please try again later.',
  }

  if (err instanceof ClientError) {
    if (err.name === 'ValidationError') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: customError.message,
        data: {
          error: err.dataError,
        },
      })
    }

    return res.status(customError.statusCode).json({
      status: 'fail',
      message: customError.message,
      data: null,
    })
  }

  return res.status(customError.statusCode).json({
    status: 'error',
    message: customError.message,
    data: null,
  })
}

module.exports = errorMiddleware
