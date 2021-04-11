const express = require('express')
const router = express.Router()

const adminController = require('../controllers/api/adminController.js')
const categoryController = require('../controllers/api/categoryController.js')

router.get('/admin/restaurants', adminController.getRestaurants)
router.get('/admin/restaurants/:id', adminController.getRestaurant)

router.route('/admin/categories').get(categoryController.getCategories)
router.route('/admin/categories/:id').get(categoryController.getCategories)

module.exports = router
