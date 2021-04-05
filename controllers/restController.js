const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const restController = {
  getRestaurants: async (req, res) => {
    const restaurants = await Restaurant.findAll({
      include: [Category]
    })
    console.log(restaurants[0])
    const data = restaurants.map(restaurant => ({
      ...restaurant.dataValues,
      description: restaurant.dataValues.description.substring(0, 50),
      categoryName: restaurant.Category.name
    }))
    console.log('data', data[0])
    return res.render('restaurants', { restaurants: data })
  }
}

module.exports = restController
