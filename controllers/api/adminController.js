const db = require('../../models')
const Restaurant = db.Restaurant
const Category = db.Category
const adminController = {
  getRestaurants: async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll({
        raw: true,
        order: [['id', 'DESC']],
        nest: true,
        include: [Category]
      })
      return res.json({ restaurants })
    } catch (err) {
      console.log(err)
    }
  }
}
module.exports = adminController
