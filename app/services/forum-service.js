const { Forum, ForumType, ForumCategory, ForumStatus } = require('../models')
const { Op } = require('sequelize')

const ForumService = {
  createForum: async (payload) => {
    const newForum = await Forum.create(payload)
    return newForum.id
  },
  updateForum: async (payload) => {
    const forumId = parseInt(payload.id)
    const result = await Forum.update(payload, {
      where: { id: forumId },
    })
    return result
  },
  deleteForum: async (payload) => {
    const forumId = parseInt(payload.id)
    const result = await Forum.destroy({
      where: { id: forumId },
    })
    return result
  },
  getForumById: async (payload) => {
    const forumId = parseInt(payload.id)
    const f = await Forum.findOne({
      where: { id: forumId },
      include: [
        {
          model: ForumType,
          attributes: ['id', 'name', 'img_url'],
        },
        {
          model: ForumCategory,
          attributes: ['id', 'name', 'img_url'],
        },
        {
          model: ForumStatus,
          attributes: ['id', 'name', 'img_url'],
        },
      ],
    })

    return {
      id: f.id,
      userId: f.user_id,
      name: f.name,
      price: f.price,
      description: f.description,
      imgUrl: f.img_url,
      type: {
        id: f.ForumType.id,
        name: f.ForumType.name,
        imgUrl: f.ForumType.img_url,
      },
      category: {
        id: f.ForumCategory.id,
        name: f.ForumCategory.name,
        imgUrl: f.ForumCategory.img_url,
      },
      status: {
        id: f.ForumStatus.id,
        name: f.ForumStatus.name,
        imgUrl: f.ForumStatus.img_url,
      },
      createdAt: f.createdAt,
      updatedAt: f.updatedAt,
    }
  },
  getAllForum: async () => {
    const forums = await Forum.findAll({
      include: [
        {
          model: ForumType,
          attributes: ['id', 'name', 'img_url'],
        },
        {
          model: ForumCategory,
          attributes: ['id', 'name', 'img_url'],
        },
        {
          model: ForumStatus,
          attributes: ['id', 'name', 'img_url'],
        },
      ],
    })
    return forums.map((forum) => ({
      id: forum.id,
      name: forum.name,
      imgUrl: forum.img_url,
      type: {
        id: forum.ForumType.id,
        name: forum.ForumType.name,
        imgUrl: forum.ForumType.img_url,
      },
      category: {
        id: forum.ForumCategory.id,
        name: forum.ForumCategory.name,
        imgUrl: forum.ForumCategory.img_url,
      },
      status: {
        id: forum.ForumStatus.id,
        name: forum.ForumStatus.name,
        imgUrl: forum.ForumStatus.img_url,
      },
    }))
  },
  getForumByName: async (payload) => {
    const forums = await Forum.findAll({
      include: [
        {
          model: ForumType,
          attributes: ['id', 'name', 'img_url'],
        },
        {
          model: ForumCategory,
          attributes: ['id', 'name', 'img_url'],
        },
        {
          model: ForumStatus,
          attributes: ['id', 'name', 'img_url'],
        },
      ],
      where: {
        name: {
          [Op.like]: '%' + payload.name + '%',
        },
      },
    })
    return forums.map((forum) => ({
      id: forum.id,
      name: forum.name,
      imgUrl: forum.img_url,
      type: {
        id: forum.ForumType.id,
        name: forum.ForumType.name,
        imgUrl: forum.ForumType.img_url,
      },
      category: {
        id: forum.ForumCategory.id,
        name: forum.ForumCategory.name,
        imgUrl: forum.ForumCategory.img_url,
      },
      status: {
        id: forum.ForumStatus.id,
        name: forum.ForumStatus.name,
        imgUrl: forum.ForumStatus.img_url,
      },
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
      include: [
        {
          model: ForumType,
          attributes: ['id', 'name', 'img_url'],
        },
        {
          model: ForumCategory,
          attributes: ['id', 'name', 'img_url'],
        },
        {
          model: ForumStatus,
          attributes: ['id', 'name', 'img_url'],
        },
      ],
    })

    return {
      currentPage: page,
      totalPages,
      itemsPerPage: limit,
      totalItems,
      listForum: forums.map((forum) => ({
        id: forum.id,
        name: forum.name,
        imgUrl: forum.img_url,
        type: {
          id: forum.ForumType.id,
          name: forum.ForumType.name,
          imgUrl: forum.ForumType.img_url,
        },
        category: {
          id: forum.ForumCategory.id,
          name: forum.ForumCategory.name,
          imgUrl: forum.ForumCategory.img_url,
        },
        status: {
          id: forum.ForumStatus.id,
          name: forum.ForumStatus.name,
          imgUrl: forum.ForumStatus.img_url,
        },
      })),
    }
  },
  getAllForumByUserId: async (payload) => {
    const userId = parseInt(payload.id)
    const forums = await Forum.findAll({
      include: [
        {
          model: ForumType,
          attributes: ['id', 'name', 'img_url'],
        },
        {
          model: ForumCategory,
          attributes: ['id', 'name', 'img_url'],
        },
        {
          model: ForumStatus,
          attributes: ['id', 'name', 'img_url'],
        },
      ],
      where: {
        user_id: userId,
      },
    })
    return forums.map((forum) => ({
      id: forum.id,
      name: forum.name,
      imgUrl: forum.img_url,
      type: {
        id: forum.ForumType.id,
        name: forum.ForumType.name,
        imgUrl: forum.ForumType.img_url,
      },
      category: {
        id: forum.ForumCategory.id,
        name: forum.ForumCategory.name,
        imgUrl: forum.ForumCategory.img_url,
      },
      status: {
        id: forum.ForumStatus.id,
        name: forum.ForumStatus.name,
        imgUrl: forum.ForumStatus.img_url,
      },
    }))
  },
}

module.exports = ForumService
