const { sequelize } = require('../../models')
const db = require('../../models')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User

const restService = require('../../services/restService')

const helpers = require('../../_helpers')

const pageLimit = 10

const restController = {
  getRestaurants: async (req, res) => {
    restService.getRestaurants(req, res, data => {
      return res.json(data)
    })
  }
}

module.exports = restController
