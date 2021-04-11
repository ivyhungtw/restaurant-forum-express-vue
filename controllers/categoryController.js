const db = require('../models')
const Category = db.Category

const categoryService = require('../services/categoryService')

const categoryController = {
  getCategories: (req, res) => {
    categoryService.getCategories(req, res, data => {
      return res.render('admin/categories', data)
    })
  },
  postCategories: async (req, res) => {
    if (!req.body.name) {
      req.flash('errorMsg', 'Name can not be empty.')
      return res.redirect('back')
    }
    await Category.create({ name: req.body.name })
    res.redirect('/admin/categories')
  },
  putCategory: async (req, res) => {
    if (!req.body.name) {
      req.flash('errorMsg', 'Name can not be empty.')
      return res.redirect('back')
    }

    const category = await Category.findByPk(req.params.id)
    await category.update(req.body)
    res.redirect('/admin/categories')
  },
  deleteCategory: async (req, res) => {
    const category = await Category.findByPk(req.params.id)
    await category.destroy()
    res.redirect('/admin/categories')
  }
}

module.exports = categoryController
