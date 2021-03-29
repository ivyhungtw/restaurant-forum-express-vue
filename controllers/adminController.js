const db = require('../models')
const Restaurant = db.Restaurant

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

    await Restaurant.create({ name, tel, address, opening_hours, description })

    req.flash('successMsg', 'Restaurant was created successfully')
    res.redirect('/admin/restaurants')
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
    if (!name || !tel || !address || !opening_hours || !description) {
      req.flash('errorMsg', 'All fields are required!')
      return res.redirect('back')
    }

    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.update({ name, tel, address, opening_hours, description })
    req.flash('successMsg', 'restaurant was updated successfully!')
    res.redirect('/admin/restaurants')
  },
  deleteRestaurant: async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    await restaurant.destroy()
    res.redirect('/admin/restaurants')
  }
}

module.exports = adminController
