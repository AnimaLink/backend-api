const { StatusCodes } = require('http-status-codes')
const { ValidationError } = require('../exceptions')
const AuthService = require('../services/auth-service')
const UserService = require('../services/user-service')
const AuthValidator = require('../validators/auth-validator')

const AuthController = {
  login: async (req, res, next) => {
    try {
      const { error, value } = AuthValidator.login(req.body)

      if (error) {
        throw new ValidationError(error.details.map((detail) => detail.message))
      }

      const user = await UserService.getUserByEmail(value.email)

      if (!user) {
        throw new ValidationError('Email not registered')
      }

      const isMatch = await AuthService.comparePassword(
        value.password,
        user.password
      )

      if (!isMatch) {
        throw new ValidationError('Invalid Credentials')
      }

      const payload = {
        id: user.id,
        email: user.email,
      }

      const accessToken = await AuthService.generateAccessToken(payload)

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Login success',
        data: {
          accessToken,
        },
      })
    } catch (err) {
      next(err)
    }
  },
  register: async (req, res, next) => {
    try {
      const { error, value } = AuthValidator.register(req.body)

      if (error) {
        throw new ValidationError(error.details.map((detail) => detail.message))
      }

      const user = await UserService.getUserByEmail(value.email)

      if (user) {
        throw new ValidationError('Email already registered')
      }

      const hashedPassword = await AuthService.encryptPassword(value.password)

      const avatarName = [
        'rocky',
        'misty',
        'felix',
        'patches',
        'willow',
        'leo',
        'pepper',
        'buster',
        'Buster',
        'Buddy',
      ]

      const newAvatar = `https://api.dicebear.com/6.x/fun-emoji/png?seed=${
        avatarName[Math.floor(Math.random() * avatarName.length)]
      }`

      const payload = {
        ...value,
        avatar: newAvatar,
        password: hashedPassword,
      }

      const userId = await UserService.createUser(payload)

      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Register success',
        data: {
          userId,
        },
      })
    } catch (err) {
      next(err)
    }
  },
}

module.exports = AuthController
