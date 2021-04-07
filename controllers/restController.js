const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User

const pageLimit = 10

const restController = {
  getRestaurants: async (req, res) => {
    let offset = 0
    const whereQuery = {}
    let categoryId = ''

    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }

    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId)
      whereQuery.CategoryId = categoryId
    }

    const [categories, result] = await Promise.all([
      Category.findAll({ raw: true, nest: true }),
      Restaurant.findAndCountAll({
        include: Category,
        where: whereQuery,
        offset: offset,
        limit: pageLimit
      })
    ])

    // data for pagination
    const page = Number(req.query.page) || 1
    const pages = Math.ceil(result.count / pageLimit)
    const totalPage = Array.from({ length: pages }).map((_, index) => index + 1)
    const prev = page - 1 < 1 ? 1 : page - 1
    const next = page + 1 > pages ? pages : page + 1

    // clean up restaurant data
    const data = result.rows.map(restaurant => ({
      ...restaurant.dataValues,
      description: restaurant.dataValues.description.substring(0, 50),
      categoryName: restaurant.Category.name
    }))

    return res.render('restaurants', {
      restaurants: data,
      categories,
      categoryId,
      page,
      totalPage,
      prev,
      next
    })
  },
  getRestaurant: async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id, {
      include: [Category, { model: Comment, include: [User] }]
    })
    // Count unique page views to show on dashboard
    if (!req.session.views[req.params.id]) {
      req.session.views[req.params.id] = 1

      restaurant.viewCounts = restaurant.viewCounts
        ? restaurant.viewCounts + 1
        : 1

      console.log('restaurant.viewCounts', restaurant.viewCounts)
      console.log('req.session.views', req.session.views)

      await restaurant.save()
    }

    res.render('restaurant', { restaurant: restaurant.toJSON() })
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
  }
}

module.exports = restController
