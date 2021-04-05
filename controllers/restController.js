const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const restController = {
  getRestaurants: async (req, res) => {
    const whereQuery = {}
    let categoryId = ''
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery.CategoryId = categoryId
    }

    const [categories, restaurants] = await Promise.all([
      Category.findAll({ raw: true, nest: true }),
      Restaurant.findAll({
        include: Category,
        where: whereQuery
      })
    ])

    const data = restaurants.map(restaurant => ({
      ...restaurant.dataValues,
      description: restaurant.dataValues.description.substring(0, 50),
      categoryName: restaurant.Category.name
    }))

    return res.render('restaurants', {
      restaurants: data,
      categories,
      categoryId
    })
  },
  getRestaurant: async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id, {
      include: Category
    })
    res.render('restaurant', { restaurant: restaurant.toJSON() })
  }
}

module.exports = restController
