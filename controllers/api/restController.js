const db = require('../../models')

const restService = require('../../services/restService')

const restController = {
  getRestaurants: async (req, res) => {
    restService.getRestaurants(req, res, data => {
      return res.json(data)
    })
  },

  getRestaurant: async (req, res) => {
    restService.getRestaurant(req, res, data => {
      return res.json(data)
    })
  },

  getFeeds: async (req, res) => {
    restService.getFeeds(req, res, data => {
      return res.json(data)
    })
  },

  getDashboard: async (req, res) => {
    restService.getDashboard(req, res, data => {
      return res.json(data)
    })
  },

  getTopRestaurant: async (req, res) => {
    restService.getTopRestaurant(req, res, data => {
      return res.json(data)
    })
  }
}

module.exports = restController
