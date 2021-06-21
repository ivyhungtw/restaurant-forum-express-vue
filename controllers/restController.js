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
    restService.getDashboard(req, res, data => {
      return res.render('dashboard', data)
    })
  },

  getTopRestaurant: async (req, res) => {
    restService.getTopRestaurant(req, res, data => {
      return res.render('topRestaurant', data)
    })
  }
}

module.exports = restController
