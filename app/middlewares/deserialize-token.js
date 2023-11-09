const AuthService = require('../services/auth-service')

const deserializeToken = async (req, res, next) => {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, '')

  if (!accessToken) {
    return next()
  }

  const token = await AuthService.validateAccessToken(accessToken)
  if (token.decoded) {
    res.locals.user = token.decoded
    return next()
  }

  if (token.expired) {
    return next()
  }

  return next()
}

module.exports = deserializeToken
