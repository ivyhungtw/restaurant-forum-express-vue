const db = require('../models')
const Comment = db.Comment

const commentService = {
  postComment: async (req, res, callback) => {
    if (req.body.text.length > 200 || req.body.text.length < 50) {
      return callback({
        status: 'error',
        message: 'Your comment does not meet the required length.',
        userInput: req.body.text
      })
    }
    await Comment.create({
      text: req.body.text,
      RestaurantId: req.body.restaurantId,
      UserId: req.user.id
    })
    return callback({ restaurantId: req.body.restaurantId })
  }
}

module.exports = commentService
