const express = require('express')
const router = express.Router()

const passport = require('../config/passport')
const adminController = require('../controllers/api/adminController.js')
const categoryController = require('../controllers/api/categoryController.js')
const userController = require('../controllers/api/userController.js')
const restController = require('../controllers/api/restController.js')

const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const authenticated = passport.authenticate('jwt', { session: false })

const authenticatedAdmin = (req, res, next) => {
  if (req.user) {
    if (req.user.isAdmin) {
      return next()
    }
    return res.json({ status: 'error', message: 'permission denied' })
  } else {
    return res.json({ status: 'error', message: 'permission denied' })
  }
}

router
  .route('/admin/restaurants')
  .all(authenticated, authenticatedAdmin)
  .get(adminController.getRestaurants)
  .post(upload.single('image'), adminController.postRestaurant)
router
  .route('/admin/restaurants/:id')
  .all(authenticated, authenticatedAdmin)
  .get(adminController.getRestaurant)
  .put(upload.single('image'), adminController.putRestaurant)
  .delete(adminController.deleteRestaurant)

router
  .route('/admin/categories')
  .all(authenticated, authenticatedAdmin)
  .get(categoryController.getCategories)
  .post(categoryController.postCategories)
router
  .route('/admin/categories/:id')
  .all(authenticated, authenticatedAdmin)
  .get(categoryController.getCategories)
  .put(categoryController.putCategory)
  .delete(categoryController.deleteCategory)

router.get(
  '/admin/users',
  authenticated,
  authenticatedAdmin,
  adminController.getUsers
)
router.put(
  '/admin/users/:id/toggleAdmin',
  authenticated,
  authenticatedAdmin,
  adminController.toggleAdmin
)

router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)

router.get('/restaurants', authenticated, restController.getRestaurants)

router
  .route('/favorite/:restaurantId')
  .all(authenticated)
  .post(userController.addFavorite)
  .delete(userController.removeFavorite)
router
  .route('/like/:restaurantId')
  .all(authenticated)
  .post(userController.likeRestaurant)
  .delete(userController.unlikeRestaurant)
router
  .route('/following/:userId')
  .all(authenticated)
  .post(userController.addFollowing)
  .delete(userController.removeFollowing)

router.get('/users/top', authenticated, userController.getTopUser)
router
  .route('/users/:id')
  .all(authenticated)
  .get(userController.getUser)
  .put(upload.single('image'), userController.putUser)
router.get('/users/:id/edit', authenticated, userController.editUser)

module.exports = router
