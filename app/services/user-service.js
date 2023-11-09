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
}

module.exports = UserService
