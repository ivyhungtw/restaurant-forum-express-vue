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
        status: 'success',
        categories,
        category: category.toJSON()
      })
    }

    callback({ status: 'success', categories })
  },
  postCategories: async (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: 'Name can not be empty.' })
    }
    const [category, created] = await Category.findOrCreate({
      where: { name: req.body.name }
    })

    if (!created) {
      return callback({
        status: 'error',
        message: 'You can not create duplicated category name.'
      })
    }

    callback({ status: 'success', category })
  },
  putCategory: async (req, res, callback) => {
    if (!req.body.name) {
      return callback({ status: 'error', message: 'Name can not be empty.' })
    }

    const result = await Category.findOne({
      where: { name: req.body.name }
    })

    if (result) {
      return callback({
        status: 'error',
        message: 'This category name has already been used.'
      })
    }

    const category = await Category.findByPk(req.params.id)
    await category.update(req.body)
    callback({ status: 'success', category })
  },
  deleteCategory: async (req, res, callback) => {
    const category = await Category.findByPk(req.params.id)
    if (!category) {
      return callback({
        status: 'error',
        message: 'You can not delete a category that did not exist'
      })
    }
    await category.destroy()
    return callback({ status: 'success', message: '' })
    // res.redirect('/admin/categories')
  }
}

module.exports = categoryService
