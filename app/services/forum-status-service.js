const { ForumStatus } = require('../models')

const ForumStatusService = {
  createForumStatus: async (payload) => {
    const forumStatus = await ForumStatus.create(payload)
    return forumStatus.id
  },
  getForumStatusById: async (payload) => {
    const forumStatusId = parseInt(payload.id)
    const forumStatus = await ForumStatus.findOne({
      where: { id: forumStatusId },
    })
    return forumStatus
  },
  updateForumStatus: async (payload) => {
    const forumStatusId = parseInt(payload.id)
    const result = await ForumStatus.update(payload, {
      where: { id: forumStatusId },
    })
    return result
  },
  getAllForumStatus: async () => {
    const listForumStatus = await ForumStatus.findAll()
    return listForumStatus.map((status) => ({
      id: status.id,
      name: status.name,
      imgUrl: status.img_url,
    }))
  },
}

module.exports = ForumStatusService
