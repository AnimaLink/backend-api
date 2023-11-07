const { StatusCodes } = require('http-status-codes')

class ClientError extends Error {
  constructor(message, statusCode = StatusCodes.BAD_REQUEST) {
    super(message)

    this.statusCode = statusCode
    this.name = 'ClientError'
  }
}

module.exports = ClientError
