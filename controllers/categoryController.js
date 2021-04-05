const db = require('../models')
const Category = db.Category

const categoryController = {
  getCategories: async (req, res) => {
    const categories = await Category.findAll({
      raw: true,
      nest: true,
      order: [['id', 'DESC']]
    })
    res.render('admin/categories', { categories, id: req.params.id })
  },
  postCategories: async (req, res) => {
    if (!req.body.name) {
      req.flash('errorMsg', 'Name can not be empty.')
      return res.redirect('back')
    }
    await Category.create({ name: req.body.name })
    res.redirect('/admin/categories')
  }
}

module.exports = categoryController
