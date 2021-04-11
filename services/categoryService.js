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
  }
}

module.exports = categoryService
