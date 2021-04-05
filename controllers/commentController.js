const db = require('../models')
const Comment = db.Comment

const commentController = {
  postComment: async (req, res) => {
    await Comment.create({
      text: req.body.text,
      RestaurantId: req.body.restaurantId,
      UserId: req.user.id
    })
    res.redirect(`/restaurants/${req.body.restaurantId}`)
  }
}

module.exports = commentController
