const express = require('express')
const router = express.Router()

const adminController = require('../controllers/api/adminController.js')
const categoryController = require('../controllers/api/categoryController.js')

router.get('/admin/restaurants', adminController.getRestaurants)
router
  .route('/admin/restaurants/:id')
  .get(adminController.getRestaurant)
  .delete(adminController.deleteRestaurant)

router.route('/admin/categories').get(categoryController.getCategories)
router.route('/admin/categories/:id').get(categoryController.getCategories)

module.exports = router
