const db = require('../models')
const Category = db.Category

const categoryService = {
  getCategories: async (req, res, callback) => {
    const categories = await Category.findAll({
      raw: true,
      nest: true,
      order: [['id', 'DESC']]
    })

    if (req.params.id) {
      const category = await Category.findByPk(req.params.id)
      return callback({
        categories,
        category: category.toJSON()
      })
    }

    callback({ categories })
  },
  postCategories: async (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: 'Name can not be empty.' })
    }
    await Category.create({ name: req.body.name })
    callback({ status: 'success', message: '' })
  },
  putCategory: async (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: 'Name can not be empty.' })
    }

    const category = await Category.findByPk(req.params.id)
    await category.update(req.body)
    callback({ status: 'success', message: '' })
  },
  deleteCategory: async (req, res, callback) => {
    const category = await Category.findByPk(req.params.id)
    await category.destroy()
    return callback({ status: 'success', message: '' })
    // res.redirect('/admin/categories')
  }
}

module.exports = categoryService
