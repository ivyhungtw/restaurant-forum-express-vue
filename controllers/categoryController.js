const db = require('../models')
// const Restaurant = db.Restaurant
// const User = db.User
const Category = db.Category

const categoryController = {
  getCategories: async (req, res) => {
    const categories = await Category.findAll({ raw: true, nest: true })
    res.render('admin/categories', { categories })
  }
}

module.exports = categoryController
