const commentService = require('../../services/commentService')

const commentController = {
  postComment: async (req, res) => {
    commentService.postComment(req, res, data => {
      return res.json(data)
    })
  },

  deleteComment: async (req, res) => {
    commentService.deleteComment(req, res, data => {
      return res.json(data)
    })
  }
}

module.exports = commentController
