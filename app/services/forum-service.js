const { Forum } = require('../models')

const ForumService = {
  createForum: async (payload) => {
    const newForum = await Forum.create(payload)
    return newForum.id
  },
}

module.exports = ForumService
