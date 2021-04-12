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
  }
}

module.exports = categoryService
