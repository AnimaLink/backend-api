const { Forum } = require('../models')
const { Op } = require('sequelize')

const ForumService = {
  createForum: async (payload) => {
    const newForum = await Forum.create(payload)
    return newForum.id
  },
  updateForum: async (payload) => {
    const forumId = parseInt(payload.id)
    const forum = await Forum.update(payload, {
      where: { id: forumId },
    })
    return forum
  },
  deleteForum: async (payload) => {
    const forumId = parseInt(payload.id)
    const forum = await Forum.destroy({
      where: { id: forumId },
    })
    return forum
  },
  getForumById: async (payload) => {
    const forumId = parseInt(payload.id)
    const forum = await Forum.findOne({
      where: { id: forumId },
    })
    return forum
  },
  getAllForum: async () => {
    const forums = await Forum.findAll()
    return forums.map((forum) => ({
      name: forum.name,
      imgUr: forum.img_url,
    }))
  },
  getForumByName: async (payload) => {
    const forums = await Forum.findAll({
      where: {
        name: {
          [Op.like]: '%' + payload.name + '%',
        },
      },
    })
    return forums.map((forum) => ({
      name: forum.name,
      imgUrl: forum.img_url,
    }))
  },
  getAllForumsWithPaging: async (payload) => {
    const limit = parseInt(payload.limit)
    const page = parseInt(payload.page)
    const offset = (page - 1) * limit

    const totalItems = await Forum.count()
    const totalPages = Math.ceil(totalItems / limit)

    const forums = await Forum.findAll({
      limit,
      offset,
    })

    return {
      currentPage: page,
      totalPages,
      itemsPerPage: limit,
      totalItems,
      listForum: forums.map((forum) => ({
        name: forum.name,
        imgUrl: forum.img_url,
      })),
    }
  },
}

module.exports = ForumService
