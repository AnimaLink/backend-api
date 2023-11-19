const { ForumCategory } = require('../models')

const ForumCategoryService = {
  createForumCategory: async (payload) => {
    const newForumCategory = await ForumCategory.create(payload)
    return newForumCategory.id
  },
  updateForumCategory: async (payload) => {
    const forumCategoryId = parseInt(payload.id)
    const result = await ForumCategory.update(payload, {
      where: { id: forumCategoryId },
    })
    return result
  },
  deleteForumCategory: async (payload) => {
    const forumCategoryId = parseInt(payload.id)
    const result = await ForumCategory.destroy({
      where: { id: forumCategoryId },
    })
    return result
  },
  getAllForumCategory: async () => {
    const result = await ForumCategory.findAll()
    return result.map((forumCategory) => ({
      name: forumCategory.name,
      imgUrl: forumCategory.img_url,
    }))
  },
  getForumCategoryById: async (payload) => {
    const forumCategoryId = parseInt(payload.id)
    const result = await ForumCategory.findOne({
      where: { id: forumCategoryId },
    })
    return result
  },
}

module.exports = ForumCategoryService
