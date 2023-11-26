const { ForumType } = require('../models')

const ForumTypeService = {
  createForumType: async (payload) => {
    const forumType = await ForumType.create(payload)
    return forumType.id
  },
  getForumTypeById: async (payload) => {
    const forumTypeId = parseInt(payload.id)
    const forumType = await ForumType.findOne({
      where: { id: forumTypeId },
    })
    return forumType
  },
  updateForumType: async (payload) => {
    const forumTypeId = parseInt(payload.id)
    const result = await ForumType.update(payload, {
      where: { id: forumTypeId },
    })
    return result
  },
  deleteForumType: async (payload) => {
    const forumTypeId = parseInt(payload.id)
    const result = await ForumType.destroy({
      where: { id: forumTypeId },
    })
    return result
  },
  getAllForumType: async () => {
    const listForumType = await ForumType.findAll()
    return listForumType.map((type) => ({
      id: type.id,
      name: type.name,
      imgUrl: type.img_url,
    }))
  },
}

module.exports = ForumTypeService
