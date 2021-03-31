const db = require('../models')
const Restaurant = db.Restaurant

const fs = require('fs').promises
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminController = {
  getRestaurants: async (req, res) => {
    const restaurants = await Restaurant.findAll({ raw: true })
    return res.render('admin/restaurants', { restaurants })
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
    const restaurant = await Restaurant.findByPk(req.params.id, { raw: true })
    return res.render('admin/restaurant', { restaurant })
  },
  editRestaurant: async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id, { raw: true })
    return res.render('admin/create', { restaurant })
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
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.destroy()
    res.redirect('/admin/restaurants')
  }
}

module.exports = adminController
