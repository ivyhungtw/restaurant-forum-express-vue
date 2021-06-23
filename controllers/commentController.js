const db = require('../models')
const Comment = db.Comment

const commentService = require('../services/commentService')

const commentController = {
  postComment: async (req, res) => {
    commentService.postComment(req, res, data => {
      if (data['status'] === 'error') {
        req.flash('errorMsg', data['message'])
        req.flash('userInput', data['userInput'])
        return res.redirect('back')
      }
      res.redirect(`/restaurants/${data['restaurantId']}`)
    })
  },

  deleteComment: async (req, res) => {
    const comment = await Comment.findByPk(req.params.id)
    await comment.destroy()
    res.redirect(`/restaurants/${comment.RestaurantId}`)
  }
}

module.exports = commentController
