const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User

const fs = require('fs').promises
const imgur = require('imgur-node-api')
const userController = require('./userController')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminController = {
  getRestaurants: async (req, res) => {
    try {
      const restaurants = await Restaurant.findAll({ raw: true })
      return res.render('admin/restaurants', { restaurants })
    } catch (err) {
      console.log(err)
    }
  },
  createRestaurant: (req, res) => {
    return res.render('admin/create')
  },
  postRestaurant: async (req, res) => {
    const { name, tel, address, opening_hours, description } = req.body
    const { file } = req
    const errors = []
    if (!name || !tel || !address || !opening_hours || !description) {
      errors.push({ message: 'All fields are required!' })
      return res.render('admin/create', {
        errors,
        name,
        tel,
        address,
        opening_hours,
        description
      })
    }

    // Files stored in /temp through multer middleware will be removed in the future,
    // so I need to keep the successfully uploaded image by uploading to imgur through API
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Restaurant.create({
          name,
          tel,
          address,
          opening_hours,
          description,
          image: file ? img.data.link : null
        }).then(restaurant => {
          req.flash('successMsg', 'Restaurant was created successfully')
          return res.redirect('/admin/restaurants')
        })
      })
    } else {
      return Restaurant.create({
        name,
        tel,
        address,
        opening_hours,
        description,
        image: null
      }).then(restaurant => {
        req.flash('successMsg', 'Restaurant was created successfully')
        return res.redirect('/admin/restaurants')
      })
    }
  },
  getRestaurant: async (req, res) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id, { raw: true })
      return res.render('admin/restaurant', { restaurant })
    } catch (err) {
      console.log(err)
    }
  },
  editRestaurant: async (req, res) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id, { raw: true })
      return res.render('admin/create', { restaurant })
    } catch (err) {
      console.log(err)
    }
  },
  putRestaurant: async (req, res) => {
    const { name, tel, address, opening_hours, description } = req.body
    const { file } = req

    if (!name || !tel || !address || !opening_hours || !description) {
      req.flash('errorMsg', 'All fields are required!')
      return res.redirect('back')
    }

    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, (err, img) => {
        return Restaurant.findByPk(req.params.id).then(restaurant => {
          restaurant
            .update({
              name,
              tel,
              address,
              opening_hours,
              description,
              image: file ? img.data.link : restaurant.image
            })
            .then(restaurant => {
              req.flash('successMsg', 'Restaurant was updated successfully')
              res.redirect('/admin/restaurants')
            })
        })
      })
    } else {
      return Restaurant.findByPk(req.params.id).then(restaurant => {
        restaurant
          .update({
            name,
            tel,
            address,
            opening_hours,
            description,
            image: restaurant.image
          })
          .then(restaurant => {
            req.flash('successMsg', 'Restaurant was updated successfully')
            res.redirect('/admin/restaurants')
          })
      })
    }
  },
  deleteRestaurant: async (req, res) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id)
      await restaurant.destroy()
      res.redirect('/admin/restaurants')
    } catch (err) {
      console.log(err)
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({ raw: true })
      res.render('admin/users', { users })
    } catch (err) {
      console.log(err)
    }
  },
  toggleAdmin: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id)
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
