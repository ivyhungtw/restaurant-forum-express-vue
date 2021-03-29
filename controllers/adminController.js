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
    if (!name || !tel || !address || !opening_hours || !description) {
      req.flash('errorMsg', 'All fields are required!')
      return res.render('admin/create', {
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
  }
}

module.exports = adminController
