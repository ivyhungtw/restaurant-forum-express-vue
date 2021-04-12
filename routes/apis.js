const express = require('express')
const router = express.Router()

const adminController = require('../controllers/api/adminController.js')
const categoryController = require('../controllers/api/categoryController.js')

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

router
  .route('/admin/restaurants')
  .get(adminController.getRestaurants)
  .post(upload.single('image'), adminController.postRestaurant)
router
  .route('/admin/restaurants/:id')
  .get(adminController.getRestaurant)
  .put(upload.single('image'), adminController.putRestaurant)
  .delete(adminController.deleteRestaurant)

router.route('/admin/categories').get(categoryController.getCategories)
router.route('/admin/categories/:id').get(categoryController.getCategories)

module.exports = router
