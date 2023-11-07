const ClientError = require('./client-error')

class ValidationError extends ClientError {
  constructor(dataError) {
    super('validation failed')

    this.dataError = dataError
    this.name = 'ValidationError'
  }
}

module.exports = ValidationError
