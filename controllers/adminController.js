const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category

const adminService = require('../services/adminService')

const helpers = require('../_helpers')

const adminController = {
  getRestaurants: (req, res) => {
    adminService.getRestaurants(req, res, data => {
      return res.render('admin/restaurants', data)
    })
  },
  createRestaurant: async (req, res) => {
    const categories = await Category.findAll({ raw: true, nest: true })
    return res.render('admin/create', { categories })
  },
  postRestaurant: (req, res) => {
    adminService.postRestaurant(req, res, data => {
      if (data['status'] === 'error') {
        req.flash('errors', data['errors'])
        return res.redirect('/admin/restaurants/create')
      }
      req.flash('successMsg', data['errors'])
      return res.redirect('/admin/restaurants')
    })
  },
  getRestaurant: (req, res) => {
    adminService.getRestaurant(req, res, data => {
      return res.render('admin/restaurant', data)
    })
  },
  editRestaurant: async (req, res) => {
    try {
      const [categories, restaurant] = await Promise.all([
        Category.findAll({ raw: true, nest: true }),
        Restaurant.findByPk(req.params.id, { raw: true })
      ])

      return res.render('admin/create', { restaurant, categories })
    } catch (err) {
      console.log(err)
    }
  },
  putRestaurant: (req, res) => {
    adminService.putRestaurant(req, res, data => {
      if (data['status'] === 'error') {
        req.flash('errors', data['errors'])
        return res.redirect('/admin/restaurants/create')
      }
      req.flash('successMsg', data['errors'])
      return res.redirect('/admin/restaurants')
    })
  },
  deleteRestaurant: (req, res) => {
    adminService.deleteRestaurant(req, res, data => {
      if (data['status'] === 'success') {
        return res.redirect('/admin/restaurants')
      }
    })
  },
  getUsers: (req, res) => {
    adminService.getUsers(req, res, data => {
      return res.render('admin/users', data)
    })
  },
  toggleAdmin: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id)
      const adminId = helpers.getUser(req).id

      // Prevent admins from setting themselves as user
      // if (adminId === user.id) {
      //   return res.redirect('/admin/users')
      // }

      await user.update({ ...user, isAdmin: user.isAdmin ? 0 : 1 })
      req.flash(
        'successMsg',
        `User ${user.name} was updated to ${
          user.isAdmin ? 'admin' : 'user'
        } successfully`
      )

      res.redirect('/admin/users')
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = adminController
