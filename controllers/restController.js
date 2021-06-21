const { sequelize } = require('../models')
const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User

const restService = require('../services/restService')

const helpers = require('../_helpers')

const pageLimit = 10

const restController = {
  getRestaurants: async (req, res) => {
    restService.getRestaurants(req, res, data => {
      return res.render('restaurants', data)
    })
  },

  getRestaurant: async (req, res) => {
    restService.getRestaurant(req, res, data => {
      return res.render('restaurant', data)
    })
  },

  getFeeds: async (req, res) => {
    restService.getFeeds(req, res, data => {
      return res.render('feeds', data)
    })
  },

  getDashboard: async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id, {
      include: [Category, { model: Comment, include: [User] }]
    })
    res.render('dashboard', { restaurant: restaurant.toJSON() })
  },
  getTopRestaurant: async (req, res) => {
    let restaurants = await Restaurant.findAll({
      include: { model: User, as: 'FavoritedUsers' },
      attributes: [
        'id',
        'description',
        'image',
        'name',
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM Favorites WHERE Favorites.RestaurantId = Restaurant.id GROUP BY Favorites.RestaurantId)'
          ),
          'favCount'
        ]
      ],
      order: [[sequelize.literal('favCount'), 'DESC']],
      limit: 10
    })

    // Clean up restaurants data
    const favRestaurants = req.user.FavoritedRestaurants.map(
      favRestaurant => favRestaurant.id
    )

    restaurants = restaurants.map(restaurant => ({
      ...restaurant.dataValues,
      description: restaurant.description.substring(0, 50),
      favCount: restaurant.FavoritedUsers.length,
      isFavorited: favRestaurants.includes(restaurant.id)
    }))

    res.render('topRestaurant', { restaurants })
  }
}

module.exports = restController
