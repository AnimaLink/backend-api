const { StatusCodes } = require('http-status-codes')

const AuthMiddleware = {
  requireUser: (req, res, next) => {
    const user = res.locals.user

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: 'fail',
        message: 'Unauthorized',
        data: null,
      })
    }

    return next()
  },
}

module.exports = AuthMiddleware
