require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const AuthService = {
  encryptPassword: async (payload) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(payload, salt)
    return hashedPassword
  },
  comparePassword: async (payload, hashedPassword) => {
    const isMatch = await bcrypt.compare(payload, hashedPassword)
    return isMatch
  },
  generateAccessToken: async (payload) => {
    const secret = process.env.JWT_SECRET || 'animalink-capstone'
    const accessToken = await jwt.sign(payload, secret)
    return accessToken
  },
  validateAccessToken: async (token) => {
    try {
      const secret = process.env.JWT_SECRET || 'animalink-capstone'
      const decoded = await jwt.verify(token, secret)
      return {
        valid: true,
        expired: false,
        decoded,
      }
    } catch (err) {
      return {
        valid: false,
        expired: err.message === 'jwt is expired or not eligible to use',
        decoded: null,
      }
    }
  },
}

module.exports = AuthService
