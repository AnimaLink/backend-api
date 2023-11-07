const ClientError = require('./client-error')
const { StatusCodes } = require('http-status-codes')

class NotFoundError extends ClientError {
  constructor(message) {
    super(message, StatusCodes.NOT_FOUND)
    this.name = 'NotFoundError'
  }
}

module.exports = NotFoundError
