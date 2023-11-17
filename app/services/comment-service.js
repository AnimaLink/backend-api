const { Comment } = require('../models')

const CommentService = {
  createComment: async (payload) => {
    const comment = await Comment.create(payload)
    return comment.id
  },
  updateComment: async (payload) => {
    const commentId = parseInt(payload.id)
    const result = await Comment.update(payload, {
      where: {
        id: commentId,
      },
    })
    return result
  },
  deleteComment: async (payload) => {
    const commentId = parseInt(payload.id)
    const result = await Comment.destroy({
      where: {
        id: commentId,
      },
    })
    return result
  },
  getCommentById: async (payload) => {
    const commentId = parseInt(payload.id)
    const comment = await Comment.findOne({
      where: {
        id: commentId,
      },
    })
    return comment
  },
  getAllCommentByForumId: async (payload) => {
    const forumId = parseInt(payload.forumId)
    const comments = await Comment.findAll({
      where: {
        forum_id: forumId,
      },
    })
    return comments.map((c) => ({
      comment: c.comment,
      userId: c.user_id,
    }))
  },
}

module.exports = CommentService
