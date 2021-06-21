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
    const restaurant = await Restaurant.findByPk(req.params.id, {
      include: [
        Category,
        { model: Comment, include: [User] },
        { model: User, as: 'FavoritedUsers' },
        { model: User, as: 'LikedUsers' }
      ]
    })
    const isFavorited = restaurant.FavoritedUsers.map(
      favUser => favUser.id
    ).includes(helpers.getUser(req).id)
    const isLiked = restaurant.LikedUsers.map(likeUser => likeUser.id).includes(
      helpers.getUser(req).id
    )

    // Count unique page views to show on dashboard
    if (!req.session.views[req.params.id]) {
      req.session.views[req.params.id] = 1

      restaurant.viewCounts = restaurant.viewCounts
        ? restaurant.viewCounts + 1
        : 1

      await restaurant.save()
    }

    res.render('restaurant', {
      restaurant: restaurant.toJSON(),
      isFavorited,
      isLiked
    })
  },
  getFeeds: async (req, res) => {
    const [restaurants, comments] = await Promise.all([
      Restaurant.findAll({
        limit: 10,
        raw: true,
        nest: true,
        order: [['createdAt', 'DESC']],
        include: [Category]
      }),
      Comment.findAll({
        limit: 10,
        raw: true,
        nest: true,
        order: [['createdAt', 'DESC']],
        include: [User, Restaurant]
      })
    ])

    res.render('feeds', { restaurants, comments })
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
