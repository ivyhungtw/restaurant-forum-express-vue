const { sequelize } = require('../models')
const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User

const helpers = require('../_helpers')

const pageLimit = 10

const restService = {
  getRestaurants: async (req, res, callback) => {
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
    const favRestaurants = helpers
      .getUser(req)
      .FavoritedRestaurants.map(favRestaurant => favRestaurant.id)
    const likeRestaurants = helpers
      .getUser(req)
      .LikedRestaurants.map(likeRestaurant => likeRestaurant.id)

    const data = result.rows.map(restaurant => ({
      ...restaurant.dataValues,
      description: restaurant.dataValues.description.substring(0, 50),
      categoryName: restaurant.Category.name,
      isFavorited: favRestaurants.includes(restaurant.id),
      isLiked: likeRestaurants.includes(restaurant.id)
    }))

    return callback({
      restaurants: data,
      categories,
      categoryId,
      page,
      totalPage,
      prev,
      next
    })
  }
}

module.exports = restService