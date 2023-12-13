const { User } = require('../models')

const UserService = {
  getUserByEmail: async (requestEmail) => {
    const user = await User.findOne({
      where: {
        email: requestEmail,
      },
    })

    return user
  },
  createUser: async (payload) => {
    const user = await User.create(payload)

    return user.id
  },
  getUserById: async (payload) => {
    const userId = parseInt(payload.id)
    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: { exclude: ['password'] },
    })

    return user
  },
  updateUser: async (payload) => {
    const userId = parseInt(payload.id)
    const result = await User.update(payload, {
      where: {
        id: userId,
      },
    })

    return result // 1 or 0
  },
}

module.exports = UserService
